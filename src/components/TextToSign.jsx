import '../avatar-renderer';
import React, { useState, useEffect } from 'react';

const TextToSign = ({ showToast }) => {
  const [text, setText] = useState('');

  // 🔥 Initialize Avatar
  useEffect(() => {
    if (window.AvatarRenderer) {
      window.AvatarRenderer.init();
    }
  }, []);

  // 🔥 Play Animation (supports full phrase)
  const handlePlay = async () => {
    if (!text) {
      showToast("⚠️ Please enter text");
      return;
    }

    if (!window.AvatarRenderer) {
      showToast("⚠️ Avatar not loaded");
      return;
    }

    // Try full phrase first
    window.AvatarRenderer.playAnimation(text.toLowerCase());
    showToast(`Playing: ${text}`);
  };

  const suggestions = [
    "hello",
    "hi",
    "good evening",
    "how are u",
    "i am fine",
    "i need water",
    "thank you",
    "i am sorry",
    'i am sorry',
    'i dont know',
    'lets go for lunch',
    'nice to meet you',
    'take care',
    'shall i help you',
    'welcome',
    'what time is it',
    'where is your home',
    'how are you'

  ];

  return (
    <div className="text-to-sign-container">

      {/* 🎭 AVATAR */}
      <div className="avatar-container">
        <div id="avatar-canvas-container"></div>

        <span id="avatar-status" className="avatar-status">
          🟢 Avatar Ready
        </span>
      </div>

      {/* ✏️ INPUT + BUTTON */}
      <div className="input-row">
        <input
          type="text"
          placeholder="Type a word or phrase (e.g., Hello, Thank You)..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="text-input"
        />

        <button className="play-btn" onClick={handlePlay}>
          <span class="icon">▶</span>
          <span class="text">Play Sign</span>
        </button>
      </div>

      {/* 💡 AVAILABLE SIGNS */}
      <div className="suggestions-container">
        <p className="suggestions-title">AVAILABLE SIGNS</p>

        <div className="suggestions">
          {suggestions.map((word, index) => (
            <button key={index} onClick={() => setText(word)}>
              {word}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};

export default TextToSign;