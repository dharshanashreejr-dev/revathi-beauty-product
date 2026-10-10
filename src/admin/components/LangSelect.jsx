import { Languages } from 'lucide-react';
import { LANGS } from '../../shared/i18n';
import { useT } from '../i18n.js';

// Language switch for the admin panel (same language as the rest of the website).
export default function LangSelect() {
  const { lang, setLang, t } = useT();
  return (
    <label className="lang-select" title={t('Language')}>
      <Languages size={16} aria-hidden="true" />
      <select value={lang} onChange={(e) => setLang(e.target.value)} aria-label={t('Language')}>
        {LANGS.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}
      </select>
    </label>
  );
}
