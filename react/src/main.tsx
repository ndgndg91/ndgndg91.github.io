import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

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
