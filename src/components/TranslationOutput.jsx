import React from 'react';

const TranslationOutput = ({ translation, showToast }) => {
  const speakText = () => {
    if (translation.text) {
      const utterance = new SpeechSynthesisUtterance(translation.text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
      showToast('🔊 Speaking...');
    }
  };

  return (
    <div className="translation-container">
      <div className="section-label">💬 Translation</div>
      
      <div className="translation-box">
        {translation.error ? (
          <div className="error-state">
            <span className="error-icon">⚠️</span>
            <p className="error-text">{translation.error}</p>
          </div>
        ) : translation.text ? (
          <div className="result-state">
            <div className="translation-text">{translation.text}</div>
            
            {translation.confidence && (
              <div className="confidence-wrapper">
                <span className="confidence-badge">
                  Confidence: {(translation.confidence * 100).toFixed(1)}%
                </span>
              </div>
            )}
            
            <button onClick={speakText} className="speak-btn">
              <span className="btn-icon">🔊</span>
              Speak Text
            </button>
          </div>
        ) : (
          <div className="empty-state">
            <span className="empty-icon">👉</span>
            <p className="empty-text">Capture a sign to see translation</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TranslationOutput;
