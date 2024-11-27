import React, { useState, useRef, useEffect } from 'react';
import './HomePage.css';

const HomePage = () => {
  useEffect(() => {
    document.title = 'HomePage';
  }, []);

  const [messages, setMessages] = useState([
    { type: 'incoming', text: 'Hi there 👋 How can I help you today?' },
  ]);
  const [userMessage, setUserMessage] = useState('');
  const chatboxRef = useRef(null);
  const chatInputRef = useRef(null);
  const initialHeight = useRef(0);
  const speechRecognitionRef = useRef(null);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (chatInputRef.current) {
      initialHeight.current = chatInputRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTo(0, chatboxRef.current.scrollHeight);
    }
  }, [messages]);

  const handleChat = () => {
    if (!userMessage.trim()) return;

    const outgoingMessage = { type: 'outgoing', text: userMessage };
    setMessages((prevMessages) => [...prevMessages, outgoingMessage]);
    setUserMessage('');

    setTimeout(() => {
      const incomingMessage = { type: 'incoming', text: 'Thinking...' };
      setMessages((prevMessages) => [...prevMessages, incomingMessage]);
      generateResponse(userMessage);
    }, 600);
  };

  const generateResponse = async (message) => {
    try {
      const response = await fetch('http://localhost:5000/index', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      console.log('Response data:', data);

      const botMessage = data.botResponse || 'No response received.';

      // Typing effect
      let index = 0;
      const typingInterval = setInterval(() => {
        setMessages((prevMessages) => {
          const newMessages = [...prevMessages];
          newMessages[newMessages.length - 1].text = botMessage.slice(0, index + 1);
          return newMessages;
        });
        index++;
        if (index === botMessage.length) {
          clearInterval(typingInterval);
        }
      }, 100); // Typing speed (ms)
    } catch (error) {
      console.error('Error:', error);
      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1),
        { type: 'incoming', text: 'Oops! Something went wrong. Please try again.' },
      ]);
    }
  };

  const handleInputResize = () => {
    if (chatInputRef.current) {
      chatInputRef.current.style.height = `${initialHeight.current}px`;
      chatInputRef.current.style.height = `${chatInputRef.current.scrollHeight}px`;
    }
  };

  const toggleSpeechRecognition = () => {
    if (!speechRecognitionRef.current) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

      if (!SpeechRecognition) {
        console.error('Speech recognition is not supported in this browser.');
        return;
      }

      speechRecognitionRef.current = new SpeechRecognition();
      speechRecognitionRef.current.lang = 'en-US';
      speechRecognitionRef.current.maxResults = 10;
      speechRecognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setUserMessage(transcript);
        handleChat();
      };
      speechRecognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event);
      };
    }

    if (isListening) {
      speechRecognitionRef.current.stop();
      setIsListening(false);
    } else {
      speechRecognitionRef.current.start();
      setIsListening(true);
    }
  };

  return (
    <div className="chatbot">
      <header>
        <h2>Chatbot</h2>
      </header>
      <ul className="chatbox" ref={chatboxRef}>
        {messages.map((msg, index) => (
          <li key={index} className={`chat ${msg.type}`}>
            {msg.type === 'incoming' && (
              <span className="material-icons">smart_toy</span>
            )}
            <p>{msg.text}</p>
          </li>
        ))}
      </ul>
      <div className="chat-input">
        <textarea
          ref={chatInputRef}
          placeholder="Enter a message..."
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onInput={handleInputResize}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleChat();
            }
          }}
        />
        <button onClick={handleChat}>Send</button>
        <button onClick={toggleSpeechRecognition}>
          {isListening ? '🛑 Stop Recording' : '🎤 Start Recording'}
        </button>
      </div>
    </div>
  );
};

export default HomePage;