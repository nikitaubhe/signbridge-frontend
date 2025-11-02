import React, { useState } from 'react';
import { textToSign } from '../services/api';

const TextToSign = ({ showToast }) => {
  const [inputText, setInputText] = useState('');
  const [signAnimation, setSignAnimation] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    if (!inputText.trim()) {
      showToast('⚠️ Please enter some text');
      return;
    }
    
    setLoading(true);
    try {
      const result = await textToSign(inputText);
      setSignAnimation(result);
      showToast('✅ Converted to sign language!');
    } catch (error) {
      console.error('Conversion failed:', error);
      showToast('❌ Conversion failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-to-sign-container">
      <div className="section-label">✏️ Enter Text</div>
      
      <div className="text-input-area">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type text to convert to sign language..."
          className="text-input"
          rows="5"
        />
        
        <button
          onClick={handleConvert}
          disabled={loading || !inputText.trim()}
          className="convert-btn"
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              Converting...
            </>
          ) : (
            <>
              <span className="btn-icon">⚡</span>
              Convert to Sign Language
            </>
          )}
        </button>
        
        {signAnimation && (
          <div className="animation-result">
            <div className="section-label">🎭 Sign Animation</div>
            <div className="avatar-box">
              <div className="avatar-placeholder">🤸</div>
              <p className="avatar-text">{signAnimation.message || 'Animation will appear here'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextToSign;
