import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Landing from './Landing'
import './globals.css'
import './refresh.css'
import './velvet.css'
import './luxe.css'
import './site-nav.css'
import './lang-fit.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Landing />
  </StrictMode>,
)
