import { useCallback, useEffect, useState } from 'react';
import { useStore } from './store.jsx';
import { NAV, canAccess } from './nav.js';
import Sidebar from './components/Sidebar.jsx';
import Topbar from './components/Topbar.jsx';
import Toasts from './components/Toasts.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Products from './pages/Products.jsx';
import Orders from './pages/Orders.jsx';
import Appointments from './pages/Appointments.jsx';
import Customers from './pages/Customers.jsx';
import Inventory from './pages/Inventory.jsx';
import Reports from './pages/Reports.jsx';
import Staff from './pages/Staff.jsx';
import ServicesPricing from './pages/ServicesPricing.jsx';
import Reviews from './pages/Reviews.jsx';
import Offers from './pages/Offers.jsx';
import SmsOutbox from './pages/SmsOutbox.jsx';
import POS from './pages/POS.jsx';
import AuditLog from './pages/AuditLog.jsx';
import AccessDenied from './pages/AccessDenied.jsx';
import { useT } from './i18n.js';

const readHash = () => {
  const id = window.location.hash.replace(/^#\/?/, '');
  return NAV.some((n) => n.id === id) ? id : 'dashboard';
};

export default function App() {
  const { user, logout, notify } = useStore();
  const { t } = useT();
  const [page, setPage] = useState(readHash);
  const [menuOpen, setMenuOpen] = useState(false);
  const [intent, setIntent] = useState(null);

  useEffect(() => {
    const onHash = () => setPage(readHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const navigate = useCallback((id, nextIntent = null) => {
    setIntent(nextIntent);
    window.location.hash = `/${id}`;
    setPage(id);
    setMenuOpen(false);
    window.scrollTo({ top: 0 });
  }, []);
  const clearIntent = useCallback(() => setIntent(null), []);

  const doLogout = () => {
    logout();
    window.location.hash = '';
    notify('You have been signed out.', 'info');
  };

  if (!user) {
    return (
      <>
        <Login onSuccess={() => navigate('dashboard')} />
        <Toasts />
      </>
    );
  }

  const allowed = canAccess(user.role, page);
  const props = { user, onNavigate: navigate, intent, onIntentHandled: clearIntent };
  const pages = {
    dashboard: <Dashboard {...props} />,
    pos: <POS {...props} />,
    products: <Products {...props} />,
    orders: <Orders {...props} />,
    appointments: <Appointments {...props} />,
    customers: <Customers {...props} />,
    inventory: <Inventory {...props} />,
    reports: <Reports {...props} />,
    staff: <Staff {...props} />,
    services: <ServicesPricing {...props} />,
    offers: <Offers {...props} />,
    reviews: <Reviews {...props} />,
    sms: <SmsOutbox {...props} />,
    audit: <AuditLog {...props} />
  };

  return (
    <div className="shell">
      <Sidebar user={user} page={page} onNavigate={navigate} onLogout={doLogout} open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className="main">
        <Topbar user={user} page={allowed ? page : 'denied'} onNavigate={navigate} onMenu={() => setMenuOpen(true)} onLogout={doLogout} />
        <main className="content">
          {allowed ? pages[page] : <AccessDenied onBack={() => navigate('dashboard')} />}
          <footer className="app-foot">{t('Revathi Herbal Beauty Care admin demo by D-Sites Infosolutions. Frontend demonstration with sample data only.')}</footer>
        </main>
      </div>
      <Toasts />
    </div>
  );
}
