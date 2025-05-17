import { useState, useCallback } from 'react';
import { uploadFile } from '../../lib/api';

export default function useFileUpload() {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState({});
  const [errors, setErrors] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(prevFiles => [
      ...prevFiles,
      ...acceptedFiles.map(file => ({
        file,
        id: Math.random().toString(36).substr(2, 9),
        preview: URL.createObjectURL(file),
      }))
    ]);
  }, []);

  const upload = useCallback(async () => {
    const uploadPromises = files.map(fileItem => 
      uploadFile(fileItem.file, progressEvent => {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setProgress(prev => ({ ...prev, [fileItem.id]: percent }));
      })
    );

    try {
      await Promise.all(uploadPromises);
      setFiles([]);
      setProgress({});
    } catch (error) {
      setErrors(['Upload failed. Please try again.']);
    }
  }, [files]);

  const removeFile = useCallback(id => {
    setFiles(prev => prev.filter(file => file.id !== id));
    setProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[id];
      return newProgress;
    });
  }, []);

  return { files, progress, errors, onDrop, upload, removeFile };
}