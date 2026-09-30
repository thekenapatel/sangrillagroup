import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, User, Bot, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { properties, sangrillaKnowledgeBase } from '../../data/properties';
import '../../styles/chatbot.css';

interface Message {
  id: string;
  type: 'ai' | 'user';
  content: string;
  buttons?: string[];
  image?: string;
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [leadState, setLeadState] = useState<'none' | 'naming' | 'phoning' | 'done'>('none');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize chat
  useEffect(() => {
    if (messages.length === 0) {
      const urlParams = new URLSearchParams(window.location.search);
      const channel = urlParams.get('channel');
      
      const welcomeMsg: Message = {
        id: '1',
        type: 'ai',
        content: channel === 'whatsapp' 
          ? "Namaste! 👋 (WhatsApp Assistant) Welcome to Sangrilla Group. Aspire to Grow with us!\n\nHow can I help you find your dream home today?"
          : "Namaste! 👋 Welcome to Sangrilla Group. Aspire to Grow with us!\n\nHow can I help you find your dream home today?",
        buttons: ['2 BHK Apartments', '3 BHK / Villas', 'View All Projects', 'Book Site Visit', 'Pricing & RERA Details'],
        timestamp: new Date(),
      };
      setMessages([welcomeMsg]);
      
      // Auto-open if WhatsApp
      if (channel === 'whatsapp') {
        setIsOpen(true);
      }
    }
  }, [messages.length]);

  // Auto scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // Handle special buttons
    if (text === 'Chat on WhatsApp' || text === 'Talk to Human') {
      window.open(`https://wa.me/919537702727?text=Namaste Sangrilla Group, I'm interested in your projects.`, '_blank');
      return;
    }

    if (text === 'Call Support') {
      window.location.href = 'tel:+919987322645';
      return;
    }

    const userMsg: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    processResponse(text);
  };

  const processResponse = (query: string) => {
    setIsTyping(true);
    
    // Simulate thinking
    setTimeout(() => {
      let response: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: '',
        timestamp: new Date(),
      };

      const q = query.toLowerCase();

      // Lead capture flow
      if (leadState === 'naming') {
        response.content = `Namaste ${query}! 🙏 Thank you. And your phone number please? So I can send you the brochure and details on WhatsApp.`;
        setLeadState('phoning');
        setMessages(prev => [...prev, response]);
        setIsTyping(false);
        return;
      }
      
      if (leadState === 'phoning') {
        response.content = "Perfect! I've received your details. One of our senior executives will connect with you shortly. Aspire to Grow! 🚀";
        response.buttons = ['View More Projects', 'Talk to Human', 'Main Menu'];
        setLeadState('done');
        setMessages(prev => [...prev, response]);
        setIsTyping(false);
        // Here you would normally send data to a backend
        console.log("LEAD CAPTURED:", { query }); 
        return;
      }

      if (q.includes('meadows')) {
        response.content = "Sangrilla Meadows is our flagship ongoing project currently under active development! 🌿\n\nDesigned for modern, peaceful lifestyle living with world-class community amenities. Full specifications and layouts will be unveiled soon.\n\nWould you like to register your interest or speak with our sales executive?";
        response.buttons = ['Enquire Now', 'Book Site Visit', 'Talk to Human', 'Main Menu'];
      } else if (q.includes('2 bhk')) {
        const p = properties.find(item => item.id === 'anantaa-homes');
        response.content = `Namaste! Anantaa Homes in Ahmedabad is perfect for you. it's RERA-approved with luxurious 2 & 3 BHK options starting at ₹80 Lakh. 🏠\n\n[IMAGE: ${p?.images[0]}]\n[IMAGE: ${p?.images[1]}]\nWould you like the floor plan or a site visit?`;
        response.buttons = ['Anantaa Floor Plan', 'Book Site Visit', 'Pricing Details', 'Main Menu'];
      } else if (q.includes('3 bhk') || q.includes('villas')) {
        const p = properties.find(item => item.id === 'supan-residency');
        response.content = `For 3 BHK and Villas, Supan Residency is our top recommendation. Elegant designs and a premium gated community await you. ✨\n\n[IMAGE: ${p?.images[0]}]\n[IMAGE: ${p?.images[1]}]\nWant to see the brochure or book a visit?`;
        response.buttons = ['Supan Brochure', 'Book Site Visit', 'Location Map', 'Main Menu'];
      } else if (q.includes('all projects')) {
        response.content = "We have something for everyone! \n\nActive: Sangrilla Meadows (Flagship Under Construction), Anantaa Homes & Supan Residency.\nCompleted: Sangrilla Heights, City Centre, Villas, Arcade & more.\n\nWhich project interests you?";
        response.buttons = ['Sangrilla Meadows', 'Anantaa Homes', 'Supan Residency', 'Completed Projects', 'Main Menu'];
      } else if (q.includes('visit') || q.includes('share details')) {
        response.content = "I would be happy to arrange that! May I have your full name please? (We respect your privacy)";
        setLeadState('naming');
      } else if (q.includes('human') || q.includes('whatsapp')) {
        response.content = "Sure! You can chat directly with our executive on WhatsApp here.";
        response.buttons = ['Chat on WhatsApp', 'Call Support', 'Main Menu'];
        // Special button handled in click logic or just as a link
      } else if (q.includes('pricing') || q.includes('rera')) {
        response.content = "Our projects offer pure luxury with strong appreciation potential. Starting from ₹80L, all are RERA-approved. 📊\n\nWhich project's pricing would you like?";
        response.buttons = ['Anantaa Pricing', 'Supan Pricing', 'RERA Details', 'Main Menu'];
      } else {
        response.content = "Namaste! 🙏 Welcome to Sangrilla Group. How can I help you find your dream home today?";
        response.buttons = ['2 BHK Apartments', '3 BHK / Villas', 'View All Projects', 'Book Site Visit', 'Pricing & RERA Details'];
      }

      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 1200);
  };

  const renderContent = (content: string) => {
    // Basic image parser
    const imageRegex = /\[IMAGE: (.*?)\]/g;
    const parts = content.split(imageRegex);
    const images = content.match(imageRegex)?.map(m => m.replace('[IMAGE: ', '').replace(']', '')) || [];
    
    return (
      <div className="bubble-content">
        {parts.map((part, i) => {
          if (images.includes(part)) {
            return <img key={i} src={part} alt="Property" className="chat-image" />;
          }
          return <p key={i} style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{part}</p>;
        })}
      </div>
    );
  };

  return (
    <div className="sangrilla-ai-container">
      {/* Floating Trigger */}
      <div className="chat-trigger" onClick={toggleChat}>
        {isOpen ? <X /> : <MessageCircle />}
      </div>

      {/* Chat Window */}
      <div className={`chat-window ${isOpen ? 'open' : ''}`}>
        <div className="chat-header">
          <div className="header-info">
            <div className="ai-avatar">S</div>
            <div className="header-text">
              <h3>Sangrilla Assistant</h3>
              <p><span className="online-dot"></span> Online - Ask anything</p>
            </div>
          </div>
          <div className="close-btn" onClick={toggleChat}>
            <X size={20} />
          </div>
        </div>

        <div className="message-list" ref={scrollRef}>
          <AnimatePresence>
          {messages.map((msg) => (
            <motion.div 
              key={msg.id} 
              className={`message-item ${msg.type}`}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bubble">
                {renderContent(msg.content)}
              </div>
              {msg.buttons && (
                <div className="quick-replies">
                  {msg.buttons.map((btn, idx) => (
                    <motion.button 
                      key={idx} 
                      className="reply-btn"
                      onClick={() => handleSend(btn)}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + idx * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {btn}
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
          </AnimatePresence>
          {isTyping && (
            <motion.div 
              className="message-item ai"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="typing">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </motion.div>
          )}
        </div>

        <div className="chat-footer">
          <div className="chat-input-wrapper">
            <input 
              type="text" 
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend(inputValue)}
            />
            <button className="send-btn" onClick={() => handleSend(inputValue)} disabled={!inputValue.trim()}>
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
