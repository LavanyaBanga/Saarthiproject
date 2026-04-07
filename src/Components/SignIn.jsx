import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { User, Lock, Mail } from "lucide-react";
import gsap from "gsap";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Sign In state
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  
  // Sign Up state
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

 
  const shellRef = useRef(null);
  const leftWrap = useRef(null);
  const rightWrap = useRef(null);

  
  const leftForm = useRef(null);
  const rightForm = useRef(null);


  const leftImg = useRef(null);
  const rightImg = useRef(null);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: signInEmail, password: signInPassword }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Sign In successful!");
        setSignInEmail("");
        setSignInPassword("");
      } else if (data.error) {
        setError(data.error);
      } else {
        setError("Sign in failed");
      }
    } catch (err) {
      setError("Connection error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: signUpName, email: signUpEmail, password: signUpPassword }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.message || response.ok) {
        alert("Account created! Please sign in.");
        setSignUpName("");
        setSignUpEmail("");
        setSignUpPassword("");
        setIsSignUp(false);
      } else if (data.error) {
        setError(data.error);
      } else {
        setError("Sign up failed");
      }
    } catch (err) {
      setError("Connection error: " + err.message);
    } finally {
      setLoading(false);
    }
  };


  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
    
      gsap.set(leftWrap.current, { width: "65%" });
      gsap.set(rightWrap.current, { width: "35%" });

     
      gsap.set(leftForm.current, { x: 0, autoAlpha: 1, pointerEvents: "auto" });
      gsap.set(rightForm.current, { x: 40, autoAlpha: 0, pointerEvents: "none" });

      
      gsap.set(leftImg.current, { autoAlpha: 0 }); 
      gsap.set(rightImg.current, { autoAlpha: 1 }); 
    }, shellRef);
    return () => ctx.revert();
  }, []);


  useEffect(() => {
    const tl = gsap.timeline({ defaults: { duration: 0.7, ease: "power3.inOut" } });

    if (isSignUp) {
     
      tl.to(leftForm.current, { x: -40, autoAlpha: 0, pointerEvents: "none" }, 0)
        .to(rightForm.current, { x: 0, autoAlpha: 1, pointerEvents: "auto" }, 0.15)
        .to(leftWrap.current, { width: "35%" }, 0)
        .to(rightWrap.current, { width: "65%" }, 0)
        .to(leftImg.current, { autoAlpha: 1 }, 0) 
        .to(rightImg.current, { autoAlpha: 0 }, 0); 
   
      tl.to(rightForm.current, { x: 40, autoAlpha: 0, pointerEvents: "none" }, 0)
        .to(leftForm.current, { x: 0, autoAlpha: 1, pointerEvents: "auto" }, 0.15)
        .to(leftWrap.current, { width: "65%" }, 0)
        .to(rightWrap.current, { width: "35%" }, 0)
        .to(leftImg.current, { autoAlpha: 0 }, 0) 
        .to(rightImg.current, { autoAlpha: 1 }, 0); 
    }
  }, [isSignUp]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#725B95] to-[#5E4A80] p-6">
      <div
        ref={shellRef}
        className="relative w-full max-w-6xl h-[620px] rounded-3xl overflow-hidden shadow-[0_30px_100px_-20px_rgba(0,0,0,0.2)] bg-[#F8F8F8] border border-gray-200"
      >
        <div className="absolute inset-0 flex">
       
          <section
            ref={leftWrap}
            className="relative h-full overflow-hidden flex items-stretch"
          >
         
            <img
              ref={leftImg}
              alt="left visual"
              className="absolute inset-0 w-full h-full object-cover"
              src="https://blog.1password.com/posts/2019/mental-health-week/header.png"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#E6CCEC]/50 to-[#E6CCEC]/30 pointer-events-none" />

           
            <div
              ref={leftForm}
              className="relative z-10 w-full flex flex-col justify-center px-12 py-10 backdrop-blur-sm"
            >
              <h1 className="text-4xl font-bold text-[#5E4A80] mb-4">Sign In</h1>
              <p className="text-[#A89BB5] mb-10">Welcome back, login to continue!</p>

              <form onSubmit={handleSignIn} className="space-y-6 max-w-md">
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div>
                  <label className="block text-[#A89BB5] mb-2">Email</label>
                  <div className="flex items-center bg-white/90 border border-[#DCD0EB] rounded-xl px-4 py-3">
                    <Mail className="text-[#A89BB5] mr-3" />
                    <input
                      type="email"
                      placeholder="Enter email"
                      value={signInEmail}
                      onChange={(e) => setSignInEmail(e.target.value)}
                      className="bg-transparent outline-none text-[#5E4A80] w-full placeholder-[#A89BB5]"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[#A89BB5] mb-2">Password</label>
                  <div className="flex items-center bg-white/90 border border-[#DCD0EB] rounded-xl px-4 py-3">
                    <Lock className="text-[#A89BB5] mr-3" />
                    <input
                      type="password"
                      placeholder="Enter password"
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      className="bg-transparent outline-none text-[#5E4A80] w-full placeholder-[#A89BB5]"
                      required
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-4 mt-2 bg-gradient-to-r from-[#725B95] to-[#5E4A80] hover:from-[#5E4A80] hover:to-[#725B95] rounded-xl text-white font-semibold text-lg shadow-lg transition-transform hover:scale-[1.02] disabled:opacity-50"
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>

                <p className="text-[#A89BB5] text-sm">
                  New here?{" "}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(true)}
                    className="text-[#725B95] hover:text-[#5E4A80] underline underline-offset-4"
                  >
                    Create an account
                  </button>
                </p>
              </form>
            </div>
          </section>

         
          <section
            ref={rightWrap}
            className="relative h-full overflow-hidden flex items-stretch ml-auto"
          >

            <img
              ref={rightImg}
              alt="right visual"
              className="absolute inset-0 w-full h-full object-cover"
              src="https://img.freepik.com/premium-photo/wondrous-minimalistic-illustration-portrait-woman-with-purple-flowers-concept-mental-health-care_454018-1357.jpg"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#E6CCEC]/50 to-[#725B95]/60 pointer-events-none" />

           
            <div
              ref={rightForm}
              className="relative z-10 w-full flex flex-col justify-center items-start px-12 py-10 backdrop-blur-sm"
            >
              <h2 className="text-4xl font-bold text-[#5E4A80] mb-4">Create Account</h2>
              <p className="text-[#A89BB5] mb-10">Join us and start your journey!</p>

              <form onSubmit={handleSignUp} className="space-y-6 w-full max-w-md">
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div className="flex items-center bg-white/90 border border-[#DCD0EB] rounded-xl px-4 py-3">
                  <User className="text-[#A89BB5] mr-3" />
                  <input
                    type="text"
                    placeholder="Username"
                    value={signUpName}
                    onChange={(e) => setSignUpName(e.target.value)}
                    className="bg-transparent outline-none text-[#5E4A80] w-full placeholder-[#A89BB5]"
                    required
                  />
                </div>
                <div className="flex items-center bg-white/90 border border-[#DCD0EB] rounded-xl px-4 py-3">
                  <Mail className="text-[#A89BB5] mr-3" />
                  <input
                    type="email"
                    placeholder="Email"
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    className="bg-transparent outline-none text-[#5E4A80] w-full placeholder-[#A89BB5]"
                    required
                  />
                </div>
                <div className="flex items-center bg-white/90 border border-[#DCD0EB] rounded-xl px-4 py-3">
                  <Lock className="text-[#A89BB5] mr-3" />
                  <input
                    type="password"
                    placeholder="Password"
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    className="bg-transparent outline-none text-[#5E4A80] w-full placeholder-[#A89BB5]"
                    required
                  />
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 mt-2 bg-gradient-to-r from-[#725B95] to-[#A89BB5] hover:from-[#5E4A80] hover:to-[#725B95] rounded-xl text-white font-semibold text-lg shadow-lg transition-transform hover:scale-[1.02] disabled:opacity-50"
                >
                  {loading ? "Creating Account..." : "Sign Up"}
                </button>

                <button
                  type="button"
                  onClick={() => setIsSignUp(false)}
                  className="text-[#A89BB5] mt-4 underline underline-offset-4 hover:text-[#5E4A80]"
                >
                  Back to Sign In
                </button>
              </form>
            </div>
          </section>
        </div>

        
        <div className="absolute inset-0 ring-1 ring-[#DCD0EB] rounded-3xl pointer-events-none" />
      </div>
    </div>
  );
}

