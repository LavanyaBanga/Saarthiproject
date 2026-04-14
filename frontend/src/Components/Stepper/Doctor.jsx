import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { Check, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const colors = {
  bg: "#776982",
  card: "#C7B9D6",
  text: "#4B4155",
  highlight: "#9B6EB4",
  lightCard: "#F8F5FB",
  border: "#A597D4",
};


function OptionBox({ id, title, selected, onClick }) {
  const ref = useRef(null);

  useEffect(() => {
    gsap.killTweensOf(ref.current);

    if (selected) {
      gsap.to(ref.current, {
        duration: 0.35,
        scale: 1.03,
        boxShadow: `0 12px 30px ${colors.highlight}40`,
        background: colors.highlight,
        color: "#fff",
        borderColor: "transparent",
        ease: "power2.out",
      });
    } else {
      gsap.to(ref.current, {
        duration: 0.35,
        scale: 1,
        boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
        background: colors.lightCard,
        color: colors.text,
        borderColor: colors.border,
        ease: "power2.out",
      });
    }
  }, [selected]);

  const handleMouseEnter = () => {
    if (!selected) {
      gsap.to(ref.current, { scale: 1.02, duration: 0.18, ease: "power2.out" });
    }
  };

  const handleMouseLeave = () => {
    if (!selected) {
      gsap.to(ref.current, { scale: 1, duration: 0.18, ease: "power2.out" });
    }
  };

  return (
    <button
      ref={ref}
      onClick={() => onClick(id)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-full text-left rounded-xl border px-6 py-5 cursor-pointer transition-all select-none"
      type="button"
      aria-pressed={selected ? "true" : "false"}
      style={{
        background: selected ? colors.highlight : colors.lightCard,
        color: selected ? "#fff" : colors.text,
        borderColor: selected ? "transparent" : colors.border,
      }}
    >
      <div className="flex items-center gap-4">
        <div
          className="w-12 h-12 flex items-center justify-center rounded-full shrink-0 border"
          style={{
            borderColor: selected ? colors.lightCard : colors.border,
            background: selected ? colors.lightCard : "transparent",
          }}
        >
          <span style={{ fontSize: 18, color: selected ? colors.text : colors.highlight }}>
            {title?.[0]?.toUpperCase()}
          </span>
        </div>
        <div className="grow">
          <div
            className="font-semibold text-lg leading-tight"
            style={{ color: selected ? "#fff" : colors.text }}
          >
            {title}
          </div>
        </div>

        <div className="w-8 h-8 flex items-center justify-center">
          {selected ? (
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center"
              style={{ backgroundColor: colors.lightCard }}
            >
              <Check size={14} style={{ color: colors.highlight }} />
            </div>
          ) : (
            <div
              className="w-6 h-6 rounded-full border"
              style={{ borderColor: colors.border }}
            />
          )}
        </div>
      </div>
    </button>
  );
}


export default function DoctorStepperForm() {
  const steps = [
    {
      key: "fullName",
      title: "Doctor's Name",
      subtitle: "Enter the full name of the doctor.",
      type: "input",
      fields: [{ key: "fullName", label: "Full Name", placeholder: "Dr. Jane Doe" }],
    },
    {
      key: "gender",
      title: "Gender",
      subtitle: "Select the gender of the doctor.",
      type: "options",
      multi: false,
      options: [
        { id: "male", title: "Male" },
        { id: "female", title: "Female" },
        { id: "other", title: "Other" },
      ],
    },
    {
      key: "qualification",
      title: "Qualification",
      subtitle: "Enter the doctor's qualifications.",
      type: "input",
      fields: [{ key: "qualification", label: "Qualification", placeholder: "M.D., Ph.D." }],
    },
    {
      key: "experience",
      title: "Experience",
      subtitle: "Years of experience in the field.",
      type: "input",
      fields: [{ key: "experience", label: "Years of Experience", placeholder: "e.g., 10" }],
    },
    {
      key: "fees",
      title: "Consultation Fees",
      subtitle: "Enter the standard consultation fee.",
      type: "input",
      fields: [{ key: "fees", label: "Fees", placeholder: "e.g., $100", inputType: "number" }],
    },
  ];

  const [formData, setFormData] = useState({
    fullName: "",
    gender: null,
    qualification: "",
    experience: "",
    fees: "",
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [fieldError, setFieldError] = useState("");

  
  const isStepValid = () => {
    const step = steps[currentStep];
    if (!step) return false;

    const value = formData[step.key];

    if (step.type === "options") {
      return !!value;
    } else {
      if (!value || value.length === 0) return false;
      if ((step.key === "fees" || step.key === "experience") &&
        (isNaN(Number(value)) || Number(value) < 0)) {
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    const step = steps[currentStep];
    const value = formData[step.key];

    if (!isStepValid()) {
      setFieldError(step.type === "options" ? "Please select an option." : "This field cannot be empty.");
      return;
    }

    setFieldError(""); // clear error
    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      console.log("Form Submitted", formData);
    }
  };

  const handleOptionToggle = (stepKey, optionId) => {
    setFormData((prev) => ({ ...prev, [stepKey]: optionId }));
  };

  const handleFieldChange = (key, value) => {
    setFormData((p) => ({ ...p, [key]: value }));
  };

  const prev = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  const isCompleted = (index) => {
    const step = steps[index];
    if (!step) return false;

    const value = formData[step.key];
    if (step.type === "options") {
      return !!value;
    }
    return value !== undefined && value !== null && value !== "";
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colors.bg }}>
      <div
        className="w-full max-w-4xl rounded-3xl shadow-2xl p-8"
        style={{ backgroundColor: colors.card, border: `1px solid ${colors.border}` }}
      >
      
        <div className="flex items-center justify-between mb-8 gap-4">
          {steps.map((s, idx) => {
            const completed = isCompleted(idx);
            const active = idx === currentStep;
            return (
              <div key={s.key} className="flex-1 flex flex-col items-center relative px-2">
              
                {idx < steps.length - 1 && (
                  <div
                    className={`absolute top-4 left-1/2 right-[-50%] h-[3px] transform -translate-x-1/2`}
                    style={{ width: "100%", backgroundColor: idx < currentStep ? colors.highlight : colors.border }}
                  />
                )}

                <div
                  className={`w-10 h-10 rounded-full z-10 flex items-center justify-center transition-all`}
                  style={{
                    backgroundColor: completed
                      ? "green"
                      : active
                        ? colors.highlight
                        : colors.lightCard,
                    color: completed ? "white" : active ? "white" : colors.text,
                  }}
                >
                  {completed ? <Check size={16} /> : idx + 1}
                </div>
                <div className="mt-2 text-sm text-center" style={{ color: colors.text }}>
                  {s.title}
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="border rounded-2xl p-8"
          style={{ backgroundColor: colors.lightCard, border: `1px solid ${colors.border}` }}
        >
         
          <div className="mb-6">
            <div className="text-sm" style={{ color: colors.text }}>
              Step {currentStep + 1}/{steps.length}
            </div>
            <h2
              className="text-2xl md:text-3xl font-bold mt-2"
              style={{ color: colors.text }}
            >
              {steps[currentStep].title}
            </h2>
            <p className="mt-2" style={{ color: colors.text }}>
              {steps[currentStep].subtitle}
            </p>
          </div>

        
          <div className="min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={steps[currentStep].key}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35 }}
                className="w-full"
              >
               
                {steps[currentStep].type === "input" && (
                  <div className="space-y-4 max-w-2xl">
                    {steps[currentStep].fields.map((f) => (
                      <div key={f.key}>
                        <label className="block mb-2" style={{ color: colors.text }}>
                          {f.label}
                        </label>
                        <input
                          type={f.inputType || "text"}
                          value={formData[f.key] || ""}
                          onChange={(e) => handleFieldChange(f.key, e.target.value)}
                          placeholder={f.placeholder}
                          className="w-full px-4 py-3 rounded-xl outline-none border"
                          style={{
                            backgroundColor: colors.card,
                            color: colors.text,
                            borderColor: colors.border,
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}

               
                {steps[currentStep].type === "options" && (
                  <div className="grid gap-4 md:grid-cols-2 mt-2">
                    {steps[currentStep].options.map((opt) => {
                      const stepKey = steps[currentStep].key;
                      const selected = formData[stepKey] === opt.id;
                      return (
                        <OptionBox
                          key={opt.id}
                          id={opt.id}
                          title={opt.title}
                          selected={selected}
                          onClick={(id) => handleOptionToggle(stepKey, id)}
                        />
                      );
                    })}
                  </div>
                )}
                {fieldError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-sm text-red-500 mt-2"
                  >
                    <AlertTriangle size={16} /> {fieldError}
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          
          <div className="flex items-center justify-between mt-8">
            <Button
              onClick={prev}
              disabled={currentStep === 0}
              className={`px-6 py-3 rounded-xl font-medium transition ${currentStep === 0
                ? "cursor-not-allowed"
                : "hover:bg-opacity-80"
                }`}
              style={{
                backgroundColor: colors.highlight,
                color: "white",
                opacity: currentStep === 0 ? 0.5 : 1,
              }}
            >
              Back
            </Button>

            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-sm font-semibold" style={{ color: colors.text }}>
                  Progress
                </div>
                <div className="text-sm font-semibold" style={{ color: colors.highlight }}>
                  {Math.round(((currentStep + 1) / steps.length) * 100)}%
                </div>
              </div>

              <Button
                onClick={handleNext}
                disabled={!isStepValid()}
                className={`px-8 py-3 rounded-xl font-semibold transition ${!isStepValid()
                  ? "cursor-not-allowed"
                  : "hover:scale-[1.02]"
                  }`}
                style={{
                  backgroundColor: colors.highlight,
                  color: "white",
                  opacity: !isStepValid() ? 0.5 : 1,
                }}
              >
                {currentStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
