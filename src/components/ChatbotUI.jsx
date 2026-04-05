import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send } from 'lucide-react';

const ChatbotUI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Greetings Earthling! I have access to classified intelligence databases. Ask me anything.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestedQuestions = [
    "What is the Nimitz encounter?",
    "Where do sightings happen?",
    "Show me classic UFO shapes",
    "Explain Project Blue Book"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    // Auto-engage user logic (opens oracle after 15 seconds)
    const engagementTimer = setTimeout(() => setIsOpen(true), 15000);
    return () => clearTimeout(engagementTimer);
  }, []);

  const handleSend = (textInput = input) => {
    if (!textInput.trim()) return;
    const currentInput = textInput.trim();
    setMessages(prev => [...prev, { sender: 'user', text: currentInput }]);
    setInput('');
    setIsTyping(true);

    // Complex mock AI logic processing
    let responseText = `I've analyzed your query about "\${currentInput}". Our records currently show insufficient structured data, but patterns suggest an atmospheric anomaly.`;

    const lowerInput = currentInput.toLowerCase();
    if (lowerInput.includes('nimitz')) {
      responseText = "The Nimitz encounter occurred in 2004 when US Navy pilots observed a 'Tic-Tac' shaped object demonstrating flight capabilities impossible with current human technology, defying known physics without visible propulsion.";
    } else if (lowerInput.includes('most') || lowerInput.includes('where') || lowerInput.includes('happen')) {
      responseText = "Sightings are heavily concentrated near military installations, nuclear facilities, and large bodies of water. Some theories suggest a connection between UAPs and nuclear energy.";
    } else if (lowerInput.includes('shape')) {
      responseText = "Historically, 'Disk' and 'Cigar' were prominent. Since the 1990s, 'Black Triangles' have surged in reporting volume, often described as silent, massive crafts.";
    } else if (lowerInput.includes('project blue book') || lowerInput.includes('blue book')) {
      responseText = "Project Blue Book was a systematic study of unidentified flying objects conducted by the United States Air Force from March 1952 to December 1969. It concluded, officially, that UFOs posed no national security threat.";
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'bot', text: responseText }]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1500);
  };

  return (
    <>
      <motion.button
        id="chat-trigger"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 rounded-full bg-neon-blue text-black shadow-[0_0_15px_rgba(0,243,255,0.6)] z-50 hover:shadow-[0_0_25px_rgba(0,243,255,0.8)] cursor-pointer"
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            className="fixed bottom-24 right-4 md:right-6 w-[90vw] md:w-96 max-h-[85vh] glass rounded-2xl overflow-hidden z-50 flex flex-col border border-neon-blue/30 shadow-[0_0_30px_rgba(0,0,0,0.8)]"
          >
            <div className="bg-space-dark/90 p-4 border-b border-white/10 flex justify-between items-center shrink-0">
              <h3 className="neon-text-blue font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse"></span>
                UFO AI
              </h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 bg-[radial-gradient(ellipse_at_top_right,_rgba(30,41,59,0.5)_0%,_#000000_100%)] h-[350px]">
              {messages.map((msg, idx) => (
                <motion.div
                  initial={{ opacity: 0, x: msg.sender === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={idx}
                  className={`max-w-[85%] rounded-lg p-3 text-sm leading-relaxed \${msg.sender === 'user' ? 'bg-neon-blue/20 text-blue-50 self-end rounded-tr-none border border-neon-blue/30 shadow-sm' : 'bg-white/10 text-gray-200 self-start rounded-tl-none border border-white/10 shadow-[inset_0_2px_10px_rgba(255,255,255,0.05)]'}`}
                >
                  {msg.text}
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="bg-white/5 text-gray-400 self-start rounded-lg rounded-tl-none p-3 border border-white/5 flex gap-1.5 items-center backdrop-blur-md"
                >
                  <motion.span animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                  <motion.span animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                  <motion.span animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                </motion.div>
              )}
              <div ref={messagesEndRef} className="shrink-0" />
            </div>

            {/* Suggested Questions Ribbon */}
            <div className="px-3 py-2 flex gap-2 overflow-x-auto border-t border-white/5 shrink-0 bg-black/40 hide-scroll">
              {suggestedQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(q)}
                  className="whitespace-nowrap px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-medium text-gray-300 transition-colors cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>

            <div className="p-3 border-t border-white/10 bg-space-dark/95 flex items-center gap-2 shrink-0">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
                placeholder="Transmit inquiry..."
                className="flex-1 bg-black/60 text-white rounded-full px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-neon-blue border border-white/10"
              />
              <button
                onClick={() => handleSend(input)}
                disabled={!input.trim()}
                className="p-2.5 rounded-full bg-neon-blue text-black hover:bg-cyan-400 disabled:opacity-50 transition-all cursor-pointer flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotUI;
