import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { mountLanguageModal } from '../shared/LanguageModal'
import { mountLogin } from '../shared/LoginModal';
import './index.css';

mountLanguageModal()
mountLogin();
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
