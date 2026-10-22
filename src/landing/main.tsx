import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Landing from './Landing'
import { mountLanguageModal } from '../shared/LanguageModal'
import { mountLogin } from '../shared/LoginModal'
import { mountButtonSparks } from '../shared/ButtonSparks'
import './globals.css'
import './refresh.css'
import './velvet.css'
import './luxe.css'
import './site-nav.css'
import './lang-fit.css'
import './hero-banner.css'
import './professional.css'
import './navbar-neat.css'
import '../shared/light-theme.css'
import '../shared/navbar-final.css'
import './landing-premium.css'
import '../shared/spotlight'
import '../shared/blendWhite'

mountLanguageModal()
mountLogin()
mountButtonSparks()
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Landing />
  </StrictMode>,
)
