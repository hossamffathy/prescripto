import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function ChatbotPage() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: '👋 Hi! I’m Prescripto Assistant, how can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const chatId = useSelector((state) => state.user?._id);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newUserMsg = { sender: 'user', text: input };
    setMessages((prev) => [...prev, newUserMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/v1/gemini-chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatId, message: input }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error from assistant');

      const botReply = { sender: 'bot', text: data.message.content };
      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: '⚠️ Oops! Something went wrong.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] bg-gradient-to-br from-indigo-50 to-white flex flex-col">
      {/* Header */}
      
 <header className="text-4xl p-4 w-full text-center  m-auto font-bold mb-6 shadow-md text-blue-700">
         Prescripto <span className='text-gray-900'>Assistant</span>
      </header>
      {/* Chat Messages */}
      <div className="flex-1 max-h-[700px] overflow-y-scroll p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-sm px-4 py-2 rounded-2xl shadow ${
                msg.sender === 'user'
                  ? 'bg-indigo-500 text-white rounded-br-none'
                  : 'bg-white text-gray-800 border rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-gray-400 text-sm italic animate-pulse">
            Assistant is typing...
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={sendMessage}
        className="p-4 border-t bg-white flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-300 text-sm"
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full transition-all"
        >
          ➤
        </button>
      </form>
    </div>
  );
}
