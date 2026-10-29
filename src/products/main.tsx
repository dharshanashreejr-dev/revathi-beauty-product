import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { mountLanguageModal } from '../shared/LanguageModal'
import { mountLogin } from '../shared/LoginModal'
import { mountButtonSparks } from '../shared/ButtonSparks';
import './index.css';
import '../shared/light-theme.css';
import '../shared/navbar-final.css'
import './products-premium.css'
import '../shared/rv-logo.css'

import '../shared/spotlight'
import '../shared/blendWhite';

mountLanguageModal()
mountLogin();
mountButtonSparks();
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
