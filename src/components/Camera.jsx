// import React, { useRef, useState } from 'react';
// import Webcam from 'react-webcam';
// import { translateSign } from '../services/api';

// const Camera = ({ onTranslation, showToast }) => {
//   const webcamRef = useRef(null);
//   const [isCapturing, setIsCapturing] = useState(false);

//   const captureAndTranslate = async () => {
//     if (webcamRef.current) {
//       setIsCapturing(true);
//       const imageSrc = webcamRef.current.getScreenshot();

//       try {
//         const result = await translateSign(imageSrc);
//         onTranslation(result);
//         showToast('✅ Translation successful!');
//       } catch (error) {
//         console.error('Translation failed:', error);
//         onTranslation({ error: 'Translation failed. Please try again.' });
//         showToast('❌ Translation failed');
//       } finally {
//         setIsCapturing(false);
//       }
//     }
//   };

//   return (
//     <div className="camera-container">
//       <div className="section-label">🎥 Camera Feed</div>
//       <div className="video-wrapper">
//         <Webcam
//           ref={webcamRef}
//           screenshotFormat="image/jpeg"
//           width="100%"
//           height="auto"
//           className="video-stream"
//         />
//       </div>

//       <button
//         onClick={captureAndTranslate}
//         disabled={isCapturing}
//         className="capture-btn"
//       >
//         {isCapturing ? (
//           <>
//             <span className="spinner"></span>
//             Translating...
//           </>
//         ) : (
//           <>
//             <span className="btn-icon">📸</span>
//             Capture & Translate
//           </>
//         )}
//       </button>
//     </div>
//   );
// };

// export default Camera;




import React, { useRef, useEffect, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { translateSign } from '../services/api';

const Camera = ({ onTranslation, showToast }) => {
  const webcamRef = useRef(null);
  const isProcessingRef = useRef(false); // ✅ prevent multiple requests
  const [isStreaming, setIsStreaming] = useState(true);

  // ✅ Send frame safely (NO OVERLOAD)
  const sendFrameToBackend = useCallback(async (imageSrc) => {
    // 🚨 Prevent multiple parallel requests
    if (isProcessingRef.current) return;

    isProcessingRef.current = true;

    try {
      const result = await translateSign(imageSrc);

      if (
        result.success &&
        !result.requiresMoreFrames &&
        result.predictedSign
      ) {
        onTranslation(result);
      }

    } catch (error) {
      console.error('Error sending frame:', error);
      showToast('❌ Backend error');
    }

    isProcessingRef.current = false; // ✅ release lock
  }, [onTranslation, showToast]);

  // ✅ Controlled continuous capture (SAFE)
  useEffect(() => {
    let interval;

    if (isStreaming) {
      interval = setInterval(() => {
        if (webcamRef.current && !isProcessingRef.current) {
          const imageSrc = webcamRef.current.getScreenshot();

          if (imageSrc) {
            sendFrameToBackend(imageSrc);
          }
        }
      }, 1500); // 🔥 IMPORTANT: 1.5 sec delay (prevents backend crash)
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isStreaming, sendFrameToBackend]);

  // ✅ Reset model (FIXED URL)
  const resetModel = async () => {
    try {
      await fetch('https://signbridge-backend-1.onrender.com/reset', {
        method: 'POST',
      });
      showToast('🔄 Reset successful');
    } catch (error) {
      console.error('Reset failed:', error);
      showToast('❌ Reset failed');
    }
  };

  return (
    <div className="camera-container">
      <div className="section-label">🎥 Camera Feed</div>

      <div className="video-wrapper">
        <span className="system-status">🟢 System Ready</span>

        {isStreaming ? (
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width="100%"
            height="auto"
            className="video-stream"
          />
        ) : (
          <div className="camera-stopped">⏸ Camera Stopped</div>
        )}
      </div>

      <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
        <button
          onClick={() => setIsStreaming(!isStreaming)}
          className="capture-btn"
        >
          {isStreaming ? '⏸ Stop' : '▶️ Start'}
        </button>

        <button
          onClick={resetModel}
          className="capture-btn"
        >
          🔄 Reset
        </button>
      </div>
    </div>
  );
};

export default Camera;