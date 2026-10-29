import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Services from './pages/Services'
import Booking from './pages/Booking'
import Success from './pages/Success'
import About from './pages/About'
import Track from './pages/Track'
import { SITE } from '../site-links'
import Reviews from './pages/Reviews'
import { useI18n } from './i18n-site'
import SiteFooter from '../shared/SiteFooter'

// The old demo "Manager" screen had its own sample data. Managers now use the real admin panel.
function ToAdmin() { useEffect(() => { window.location.replace(SITE.admin) }, []); return null }

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' }), 80)
    else window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

// Every page below is served from the same single-page app, so moving between
// Services, About, Tracking and Manager is instant. The landing page (/),
// Products (/products/) and the Admin panel (/admin/) are separate pages;
// <Link> in ./SmartLink sends visitors there with a normal page load.
export default function App() {
  const { pathname } = useLocation()
  const { t } = useI18n()
  const title = pathname.startsWith('/booking') ? 'Book an appointment' : pathname.startsWith('/about') ? 'About' : pathname.startsWith('/track') || pathname.startsWith('/account') ? 'Track my orders & appointments' : pathname.startsWith('/manager') ? 'Manager' : pathname.startsWith('/success') ? 'Booking confirmed' : 'Services'
  useEffect(() => { document.title = `${t(title)} — Revathi Herbal Beauty Care` })
  return (
    <>
      <ScrollManager />
      <Header />
      <Routes>
        <Route path="/services" element={<Services />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/success" element={<Success />} />
        <Route path="/about" element={<About />} />
        <Route path="/track" element={<Track />} />
        <Route path="/account" element={<Navigate to="/track" replace />} />
        <Route path="/manager" element={<ToAdmin />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="*" element={<Navigate to="/services" replace />} />
      </Routes>
      <SiteFooter />
    </>
  )
}
