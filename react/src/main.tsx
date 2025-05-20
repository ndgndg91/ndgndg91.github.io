import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import toast from 'react-hot-toast';

// window 타입 확장
declare global {
  interface Window {
    copyCode: (btn: HTMLButtonElement) => void;
  }
}

// 전역 copyCode 함수 등록
if (typeof window !== 'undefined') {
  window.copyCode = function(btn: HTMLButtonElement) {
    const code = btn.parentElement?.querySelector('code');
    if (!code) return;
    navigator.clipboard.writeText(code.innerText).then(() => {
      toast.success('Copied to clipboard!');
    }).catch(() => {
      toast.error('Failed to copy');
    });
  };
}

// Create a root component that wraps the App with BrowserRouter
const Root = () => (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Render the app
const root = createRoot(document.getElementById('root')!);
root.render(<Root />);

export default Root;
