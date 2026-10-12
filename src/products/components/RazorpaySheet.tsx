import { useEffect, useState } from 'react';
import { formatPrice } from '../data/products';

// UI stand-in for the Razorpay Checkout window (UPI, Cards, Netbanking, Wallets). No real payment happens here.
// BACKEND: server creates a Razorpay order (amount, receipt) -> this sheet is replaced by the real Razorpay Checkout
//          (key + order_id) -> the server verifies the signature and confirms the order through the webhook.
type Tab = 'UPI' | 'Cards' | 'Netbanking' | 'Wallets';
const TABS: Tab[] = ['UPI', 'Cards', 'Netbanking', 'Wallets'];
const BANKS = ['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra Bank'];
const WALLETS = ['Paytm', 'PhonePe', 'Amazon Pay', 'Mobikwik'];

export default function RazorpaySheet({ amount, onClose, onSuccess }: { amount: number; onClose: () => void; onSuccess: (method: string, paymentId: string) => void }) {
  const [tab, setTab] = useState<Tab>('UPI');
  const [v, setV] = useState({ upi: '', num: '', exp: '', cvv: '', holder: '', bank: '', wallet: '' });
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const set = (k: keyof typeof v, x: string) => { setErr(''); setV(p => ({ ...p, [k]: x })); };
  useEffect(() => { const k = (e: KeyboardEvent) => e.key === 'Escape' && !busy && onClose(); window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k); }, [busy, onClose]);

  const pay = () => {
    let e = '';
    if (tab === 'UPI' && !/^[\w.\-]{2,}@[a-z]{2,}$/i.test(v.upi)) e = 'Enter a valid UPI ID, e.g. name@okbank';
    if (tab === 'Cards') {
      if (v.num.replace(/\s/g, '').length !== 16) e = 'Enter a 16-digit card number';
      else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(v.exp)) e = 'Expiry must be MM/YY';
      else if (!/^\d{3}$/.test(v.cvv)) e = 'Enter the 3-digit CVV';
      else if (v.holder.trim().length < 2) e = 'Enter the name on card';
    }
    if (tab === 'Netbanking' && !v.bank) e = 'Select your bank';
    if (tab === 'Wallets' && !v.wallet) e = 'Select a wallet';
    setErr(e);
    if (e) return;
    setBusy(true);
    setTimeout(() => onSuccess(tab, 'pay_' + Math.random().toString(36).slice(2, 12).toUpperCase()), 1800);
  };

  return (
    <div role="dialog" aria-modal="true" aria-label="Razorpay" onMouseDown={e => e.target === e.currentTarget && !busy && onClose()}
      className="fixed inset-0 z-[70] grid place-items-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white text-stone-800 shadow-2xl">
        <div className="flex items-center justify-between bg-[#0b2a4a] px-5 py-4 text-white">
          <div><p className="text-xs uppercase tracking-widest opacity-70">Razorpay · Test mode</p><p className="font-medium">Revathi Herbal Beauty Care</p></div>
          <p className="text-xl font-medium">{formatPrice(amount)}</p>
        </div>
        <div className="flex border-b border-stone-200 text-sm">
          {TABS.map(t => <button key={t} type="button" disabled={busy} onClick={() => { setTab(t); setErr(''); }} aria-pressed={tab === t}
            className={`flex-1 py-3 transition ${tab === t ? 'border-b-2 border-[#0b2a4a] font-medium text-[#0b2a4a]' : 'text-stone-500'}`}>{t}</button>)}
        </div>
        <div className="grid min-h-[170px] gap-3 p-5 content-start">
          {tab === 'UPI' && <input className="field" placeholder="yourname@okbank" aria-label="UPI ID" value={v.upi} onChange={e => set('upi', e.target.value)} />}
          {tab === 'Cards' && (<>
            <input className="field" placeholder="Card number" inputMode="numeric" maxLength={19} aria-label="Card number" value={v.num} onChange={e => set('num', e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim())} />
            <div className="grid grid-cols-2 gap-3">
              <input className="field" placeholder="MM/YY" maxLength={5} aria-label="Expiry" value={v.exp} onChange={e => set('exp', e.target.value.replace(/^(\d{2})(\d)/, '$1/$2'))} />
              <input className="field" placeholder="CVV" type="password" maxLength={3} aria-label="CVV" value={v.cvv} onChange={e => set('cvv', e.target.value.replace(/\D/g, ''))} />
            </div>
            <input className="field" placeholder="Name on card" aria-label="Name on card" value={v.holder} onChange={e => set('holder', e.target.value)} />
          </>)}
          {tab === 'Netbanking' && <select className="field" aria-label="Bank" value={v.bank} onChange={e => set('bank', e.target.value)}><option value="">Select your bank</option>{BANKS.map(b => <option key={b}>{b}</option>)}</select>}
          {tab === 'Wallets' && <div className="grid grid-cols-2 gap-2">{WALLETS.map(w => <button key={w} type="button" onClick={() => set('wallet', w)} aria-pressed={v.wallet === w} className={`rounded-xl border py-3 text-sm ${v.wallet === w ? 'border-[#0b2a4a] bg-[#0b2a4a]/5' : 'border-stone-300'}`}>{w}</button>)}</div>}
          {err && <p className="text-sm text-rose-700" role="alert">{err}</p>}
        </div>
        <div className="border-t border-stone-100 p-5">
          <button type="button" onClick={pay} disabled={busy} className="w-full rounded-lg bg-[#0b2a4a] py-3 font-medium text-white disabled:opacity-60">{busy ? 'Processing…' : `Pay ${formatPrice(amount)}`}</button>
          <button type="button" onClick={onClose} disabled={busy} className="mt-2 w-full text-sm text-stone-500 underline">Cancel</button>
          <p className="mt-3 text-center text-[11px] text-stone-400">Demo checkout: no real money moves.</p>
        </div>
      </div>
    </div>
  );
}
