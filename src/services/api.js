// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:8080/api';

// export const translateSign = async (imageData) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/translate`, {
//       image: imageData
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Translation error:', error);
//     throw error;
//   }
// };

// export const textToSign = async (text) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/text-to-sign`, {
//       text: text
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Text to sign error:', error);
//     throw error;
//   }
// };

// export const getHistory = async () => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/history`);
//     return response.data;
//   } catch (error) {
//     console.error('History fetch error:', error);
//     throw error;
//   }
// };



const FLASK_URL = "https://signbridge-backend-1.onrender.com";



export const fetchPrediction = async (frameData) => {
  try {
    const response = await fetch(`${FLASK_URL}/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        frame: frameData   // ✅ IMPORTANT FIX
      })
    });

    if (!response.ok) {
      console.error(`Prediction API Error: ${response.status}`, await response.text());
      return null; // return null instead of throwing, Camera.jsx handles it
    }

    return await response.json();

  } catch (e) {
    console.error('Prediction call failed', e);
    return null;
  }
};

export const resetPrediction = async () => {
  try {
    await fetch(`${FLASK_URL}/reset`, { method: 'POST' });
  } catch (e) {
    console.error('Reset call failed', e);
  }
};