import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { translateSign } from '../services/api';

const Camera = ({ onTranslation, showToast }) => {
  const webcamRef = useRef(null);
  const [isCapturing, setIsCapturing] = useState(false);

  const captureAndTranslate = async () => {
    if (webcamRef.current) {
      setIsCapturing(true);
      const imageSrc = webcamRef.current.getScreenshot();
      
      try {
        const result = await translateSign(imageSrc);
        onTranslation(result);
        showToast('✅ Translation successful!');
      } catch (error) {
        console.error('Translation failed:', error);
        onTranslation({ error: 'Translation failed. Please try again.' });
        showToast('❌ Translation failed');
      } finally {
        setIsCapturing(false);
      }
    }
  };

  return (
    <div className="camera-container">
      <div className="section-label">🎥 Camera Feed</div>
      <div className="video-wrapper">
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width="100%"
          height="auto"
          className="video-stream"
        />
      </div>
      
      <button
        onClick={captureAndTranslate}
        disabled={isCapturing}
        className="capture-btn"
      >
        {isCapturing ? (
          <>
            <span className="spinner"></span>
            Translating...
          </>
        ) : (
          <>
            <span className="btn-icon">📸</span>
            Capture & Translate
          </>
        )}
      </button>
    </div>
  );
};

export default Camera;
