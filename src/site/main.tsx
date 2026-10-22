import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { mountLanguageModal } from '../shared/LanguageModal'
import { mountLogin } from '../shared/LoginModal'
import { mountButtonSparks } from '../shared/ButtonSparks'
import './index.css'
import '../shared/light-theme.css'
import '../shared/spotlight'
import '../shared/blendWhite'

mountLanguageModal()
mountLogin()
mountButtonSparks()
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
