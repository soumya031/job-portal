import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CategoryCarousel from './CategoryCarousel'
import HeroSection from './HeroSection'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import Navbar from './shared/Navbar'

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();

  // Chatbot state
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [showOptions, setShowOptions] = useState(false); // For showing poll options

  // Redirect recruiter users
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, [user, navigate]);

  // Handle chatbot messages
  const handleSendMessage = async () => {
    if (userInput.trim()) {
      const userMessage = { sender: 'user', text: userInput };

      // Set the user's message first
      setMessages(prevMessages => [...prevMessages, userMessage]);

      // Custom chatbot responses
      let aiMessage = {};
      if (userInput.toLowerCase() === 'hi') {
        aiMessage = { sender: 'bot', text: 'Hello, what is your name?' };
      } else if (messages.length > 0 && messages[messages.length - 1].text === 'Hello, what is your name?') {
        aiMessage = { sender: 'bot', text: 'How can I help you?' };
        setShowOptions(true); // Show options after greeting
      } else {
        aiMessage = { sender: 'bot', text: `You said: ${userInput}` };
      }

      // Append AI message after user's message
      setMessages(prevMessages => [...prevMessages, aiMessage]);

      setUserInput(''); // Clear the input field after sending
    }
  };

  // Handle option selection
  const handleOptionClick = (option) => {
    let aiMessage = {};
    if (option === 'others') {
      aiMessage = { sender: 'bot', text: 'Please contact with this number 1234567890' };
    } else {
      aiMessage = { sender: 'bot', text: `You selected: ${option}` };
    }

    setMessages(prevMessages => [...prevMessages, aiMessage]);
    setShowOptions(false);
  };

  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <Footer />

      {/* Chatbot Button */}
      <div className="fixed bottom-5 right-5">
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? 'Close Chat' : 'Chat with Us'}
        </button>
      </div>

      {/* Chatbot UI */}
      {isOpen && (
        <div className="fixed bottom-20 right-5 w-80 h-96 bg-white shadow-lg border border-gray-200 rounded-lg flex flex-col">
          <div className="flex-1 p-4 overflow-y-auto">
            {/* Display chat messages */}
            {messages.map((msg, index) => (
              <div key={index} className={`mb-4 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block px-4 py-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Poll Options */}
            {showOptions && (
              <div className="mt-4">
                <p className="font-semibold">How can I help you?</p>
                <div className="mt-2 space-y-2">
                  <button 
                    className="w-full bg-gray-200 text-black px-4 py-2 rounded-lg"
                    onClick={() => handleOptionClick('Career Guidance')}
                  >
                    Career Guidance
                  </button>
                  <button 
                    className="w-full bg-gray-200 text-black px-4 py-2 rounded-lg"
                    onClick={() => handleOptionClick('Finding Jobs')}
                  >
                    Finding Jobs
                  </button>
                  <button 
                    className="w-full bg-gray-200 text-black px-4 py-2 rounded-lg"
                    onClick={() => handleOptionClick('Finding Internships')}
                  >
                    Finding Internships
                  </button>
                  <button 
                    className="w-full bg-gray-200 text-black px-4 py-2 rounded-lg"
                    onClick={() => handleOptionClick('others')}
                  >
                    Others
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Input and send message button */}
          <div className="p-3 border-t border-gray-200 flex">
            <input 
              type="text" 
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Type your message..." 
              value={userInput} 
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button 
              className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
