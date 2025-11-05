import React from 'react'
import { useEffect } from 'react';
import '@n8n/chat/style.css';
import './chatbot.css';
import { createChat } from '@n8n/chat';


const ChatBot = () => {
  useEffect(() => {
    createChat({
      webhookUrl: process.env.REACT_APP_N8N_WEBHOOK_URL,

      // Optional webhook config
      webhookConfig: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },

      // Target DOM element selector (optional)
      target: '#n8n-chat',

      // UI and behavior options
      mode: 'window', // can also be 'embedded'
      chatInputKey: 'chatInput',
      chatSessionKey: 'sessionId',
      loadPreviousSession: true, // loads last conversation
    //   showWelcomeScreen: true,   // shows welcome before chat starts
      defaultLanguage: 'en',

      // Personalization
      initialMessages: [
        'Hi there! 👋',
        "I'm 🌾AgriTech, How can I help you today?",
      ],

      // Language pack / UI labels
      i18n: {
        en: {
          title: 'Hi there! 👋',
          subtitle: "🌾AgriTech — I'm here 24/7!",
          footer: '@udayraj',
          getStarted: 'New Conversation',
          inputPlaceholder: 'Type your message...',
        },
      },

      // Additional data you can pass to backend
      metadata: {
        source: 'webapp',
        version: '1.0.0',
      },

      enableStreaming: false, // Set true for token-by-token streaming
      showWelcomeScreen: false,   // shows welcome before chat starts
    });
  }, []);

  return (
    <div>
      {/* Optional placeholder if using embedded mode */}
      <div id="n8n-chat"></div>
    </div>
  );
}

export default ChatBot