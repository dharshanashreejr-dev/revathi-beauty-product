import { useLocation } from 'react-router-dom'
import SiteHeader from '../../shared/SiteHeader'
import { Link } from '../SmartLink'

// Same navbar as every other page of the website (see src/shared/SiteHeader.tsx).
export default function Header() {
  const { pathname } = useLocation()
  const current = pathname.startsWith('/services') || pathname.startsWith('/booking') || pathname.startsWith('/success') ? 'Services'
    : pathname.startsWith('/about') ? 'About'
    : pathname.startsWith('/track') || pathname.startsWith('/account') ? 'Tracking' : undefined
  return <SiteHeader Link={Link as never} current={current} solid />
}
