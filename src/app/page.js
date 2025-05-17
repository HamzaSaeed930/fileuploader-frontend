// src/app/page.js
import dynamic from 'next/dynamic';
import Head from 'next/head';

const FileUploader = dynamic(
  () => import('@/components/FileUploader/FileUploader'),
  { ssr: false }
);

export default function Home() {
  return (
    <div>
      <Head>
        <title>File Uploader</title>
      </Head>
      <main>
        <h1>File Uploader</h1>
        <FileUploader />
      </main>
    </div>
  );
}