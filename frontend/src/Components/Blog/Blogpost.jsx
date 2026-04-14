import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  User,
  Bell,
  Settings,
  Bookmark,
  Plus,
  Heart,
  MessageCircle,
  Share2,
  Zap,
} from "lucide-react";

function formatCount(n) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n;
}

/* ---------------- BLOG POST ---------------- */
function BlogPost({ post, onLike }) {
  return (
    <motion.article initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Card className="bg-white border shadow-sm hover:shadow-lg">
        <CardHeader className="flex justify-between px-6 py-4">
          <div className="flex gap-3">
            <Avatar>
              <AvatarImage src={post.avatar} />
              <AvatarFallback>{post.author[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{post.author}</h3>
              <Badge className="bg-black text-white text-xs">
                {post.community}
              </Badge>
              <p className="text-xs text-gray-500">{post.time}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-6 pb-6">
          <p className="text-gray-700">{post.content}</p>

          <div className="flex justify-between mt-4 text-sm text-gray-500">
            <div className="flex gap-4">
              <button
                onClick={onLike}
                className="flex gap-1 hover:text-black"
              >
                <Heart className="h-4 w-4" />
                {formatCount(post.likes)}
              </button>

              <button className="flex gap-1 hover:text-black">
                <MessageCircle className="h-4 w-4" />
                {post.comments}
              </button>

              <button className="flex gap-1 hover:text-black">
                <Share2 className="h-4 w-4" /> Share
              </button>
            </div>

            <span>{post.views} views</span>
          </div>
        </CardContent>
      </Card>
    </motion.article>
  );
}

/* ---------------- SIDEBAR ---------------- */
function Sidebar({ expanded }) {
  const items = [
    { icon: Home, label: "Home" },
    { icon: User, label: "Profile" },
    { icon: Bell, label: "Notifications" },
    { icon: Bookmark, label: "Saved" },
    { icon: Settings, label: "Settings" },
  ];

  return (
    <motion.aside
      animate={{ width: expanded ? 220 : 72 }}
      className="h-screen bg-white border-r flex flex-col"
    >
      <div className="p-3 space-y-2">
        {items.map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 w-full"
          >
            <Icon className="h-5 w-5" />
            {expanded && <span>{label}</span>}
          </button>
        ))}
      </div>

      <div className="mt-auto p-3">
        <Button className="w-full bg-black text-white">
          {expanded ? "Upgrade" : <Plus />}
        </Button>
      </div>
    </motion.aside>
  );
}

/* ---------------- POST COMPOSER ---------------- */
function PostComposer({ addPost }) {
  const [text, setText] = useState("");

  const handlePost = () => {
    if (!text.trim()) return;

    addPost({
      author: "You",
      avatar: "https://placehold.co/40",
      content: text,
      community: "Wellness",
      time: "now",
      likes: 0,
      comments: 0,
      views: 0,
    });

    setText("");
  };

  return (
    <Card className="bg-white border shadow-sm">
      <CardContent className="p-6">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share something..."
        />
        <Button
          onClick={handlePost}
          className="mt-3 bg-black text-white"
        >
          Post
        </Button>
      </CardContent>
    </Card>
  );
}

/* ---------------- RIGHT PANEL ---------------- */
function RightRail({ communities }) {
  return (
    <aside className="hidden lg:flex flex-col gap-6 w-80 mt-20">
      <Card className="bg-white border shadow-sm">
        <CardHeader>
          <CardTitle>Communities</CardTitle>
        </CardHeader>
        <CardContent>
          {communities.map((c) => (
            <div key={c.id} className="flex justify-between py-2">
              <span>{c.name}</span>
              <Button size="sm">Join</Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-white border shadow-sm">
        <CardHeader>
          <CardTitle>Trending</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 text-sm text-gray-500">
            <Zap /> Appointment tips
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}

/* ---------------- MAIN PAGE ---------------- */
export default function BlogPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [posts, setPosts] = useState([
    {
      author: "Alex",
      avatar: "https://placehold.co/40",
      content: "Take care of your mental health 💜",
      community: "Wellness",
      time: "2h",
      likes: 120,
      comments: 10,
      views: 1000,
    },
  ]);

  const addPost = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  const handleLike = (index) => {
    const updated = [...posts];
    updated[index].likes += 1;
    setPosts(updated);
  };

  const communities = [
    { id: 1, name: "Wellness" },
    { id: 2, name: "Self Care" },
  ];

  return (
    <div className="flex min-h-screen bg-white">
      <div
        onMouseEnter={() => setSidebarOpen(true)}
        onMouseLeave={() => setSidebarOpen(false)}
      >
        <Sidebar expanded={sidebarOpen} />
      </div>

      <div className="flex flex-1 p-8 gap-8">
        {/* Navbar */}
        <nav className="fixed top-0 left-0 right-0 bg-white border-b shadow-sm px-6 py-3 flex justify-between">
          <h1 className="font-bold text-lg">Mental Health Hub</h1>
          <Button variant="ghost">Home</Button>
        </nav>

        <main className="mx-auto max-w-2xl w-full mt-16 space-y-6">
          <PostComposer addPost={addPost} />

          <ScrollArea className="h-[500px] space-y-4">
            <AnimatePresence>
              {posts.map((post, i) => (
                <BlogPost
                  key={i}
                  post={post}
                  onLike={() => handleLike(i)}
                />
              ))}
            </AnimatePresence>
          </ScrollArea>
        </main>

        <RightRail communities={communities} />
      </div>
    </div>
  );
}