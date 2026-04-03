import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PaperAirplaneIcon, PlusCircleIcon, PencilSquareIcon, MagnifyingGlassIcon, UserCircleIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { SparklesIcon } from '@heroicons/react/24/solid';

const dummyHistory = [
  { id: 1, title: "Mindfulness Session (Today)", lastUpdated: "Today" },
  { id: 2, title: "Anxiety Coping Strategies", lastUpdated: "Yesterday" },
  { id: 3, title: "Review of Gratitude Journal", lastUpdated: "2 days ago" },
  { id: 4, title: "Sleep Hygiene Tips", lastUpdated: "3 days ago" },
];

const Sidebar = () => {
  return (
    <div className="hidden md:flex flex-col w-80 bg-white text-gray-800 p-4 h-full border-r border-gray-200 overflow-y-auto">

      <div className="flex items-center justify-between p-2 mb-4">
        <h2 className="text-2xl font-bold">Chat History</h2>
        <button className="p-1 rounded-full hover:bg-gray-100">
          <PencilSquareIcon className="h-6 w-6" />
        </button>
      </div>

      <button className="flex items-center space-x-2 w-full p-3 rounded-lg bg-black text-white font-semibold hover:bg-gray-800 mb-4">
        <PlusCircleIcon className="h-5 w-5" />
        <span>New Chat</span>
      </button>

      <div className="flex-1 space-y-2">
        {dummyHistory.map(chat => (
          <motion.button
            key={chat.id}
            className="w-full text-left p-3 rounded-lg hover:bg-gray-100"
          >
            <div className="flex items-center space-x-2 mb-1">
              <SparklesIcon className="h-4 w-4 text-purple-500" />
              <h3 className="text-sm font-medium truncate">{chat.title}</h3>
            </div>
            <p className="text-xs text-gray-500 ml-6">{chat.lastUpdated}</p>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", sender: 'bot' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const callGeminiApi = async (prompt) => {
    setIsLoading(true);

    setTimeout(() => {
      setMessages(prev => [...prev, { text: "This is a demo response.", sender: 'bot' }]);
      setIsLoading(false);
    }, 1000);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prev => [...prev, { text: input, sender: 'user' }]);
    setInput('');
    await callGeminiApi(input);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-white text-gray-800">

      {/* Navbar */}
      <nav className="flex items-center justify-between bg-white border-b p-4 shadow-sm">
        <div className="flex items-center space-x-2">
          <SparklesIcon className="h-7 w-7 text-purple-500" />
          <h1 className="text-xl font-bold">Saarthi</h1>
        </div>
        <div className="flex items-center space-x-4">
          <MagnifyingGlassIcon className="h-6 w-6 text-gray-600" />
          <UserCircleIcon className="h-6 w-6 text-gray-600" />
          <Bars3Icon className="h-6 w-6 text-gray-600 md:hidden" />
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">

        <Sidebar />

        {/* Chat Area */}
        <div className="flex flex-col flex-1 bg-white">

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">

            <AnimatePresence>
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`p-3 rounded-2xl max-w-[75%] shadow-sm 
                      ${msg.sender === 'user'
                        ? 'bg-black text-white rounded-tr-none'
                        : 'bg-gray-100 text-gray-800 rounded-tl-none border'
                      }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <div className="text-gray-500 italic">Typing...</div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t bg-white">
            <div className="flex items-center space-x-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-3 rounded-full border focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <button
                type="submit"
                className="p-3 bg-black text-white rounded-full hover:bg-gray-800"
              >
                <PaperAirplaneIcon className="h-5 w-5 rotate-90" />
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Chatbot;