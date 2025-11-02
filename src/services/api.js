import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export const translateSign = async (imageData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/translate`, {
      image: imageData
    });
    return response.data;
  } catch (error) {
    console.error('Translation error:', error);
    throw error;
  }
};

export const textToSign = async (text) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/text-to-sign`, {
      text: text
    });
    return response.data;
  } catch (error) {
    console.error('Text to sign error:', error);
    throw error;
  }
};

export const getHistory = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/history`);
    return response.data;
  } catch (error) {
    console.error('History fetch error:', error);
    throw error;
  }
};
