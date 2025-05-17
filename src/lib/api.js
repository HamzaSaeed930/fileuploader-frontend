import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const uploadFile = (file, onUploadProgress) => {
  const formData = new FormData();
  formData.append('file', file);
  
  return api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress,
  });
};

export const getFiles = () => api.get('/files');