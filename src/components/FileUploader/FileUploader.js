import React from 'react';
import { useDropzone } from 'react-dropzone';
import useFileUpload from './useFileUpload';
import styles from './FileUploader.module.css';

export default function FileUploader() {
  const { files, progress, errors, onDrop, upload, removeFile } = useFileUpload();
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className={styles.container}>
      <div {...getRootProps()} className={`${styles.dropzone} ${isDragActive ? styles.active : ''}`}>
        <input {...getInputProps()} />
        <p>Drag & drop files here, or click to select</p>
      </div>

      {errors.length > 0 && (
        <div className={styles.error}>
          {errors.map((err, i) => <p key={i}>{err}</p>)}
        </div>
      )}

      {files.length > 0 && (
        <div className={styles.files}>
          {files.map(fileItem => (
            <div key={fileItem.id} className={styles.fileItem}>
              <div className={styles.fileInfo}>
                <span>{fileItem.file.name}</span>
                <span>{Math.round(fileItem.file.size / 1024)} KB</span>
              </div>
              {progress[fileItem.id] ? (
                <progress value={progress[fileItem.id]} max="100" />
              ) : null}
              <button onClick={() => removeFile(fileItem.id)}>Remove</button>
            </div>
          ))}
          <button onClick={upload} className={styles.uploadButton}>
            Upload {files.length} Files
          </button>
        </div>
      )}
    </div>
  );
}