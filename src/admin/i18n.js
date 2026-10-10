import { useLang } from '../shared/i18n';
import { DICT } from './i18n-dict.js';

// Admin translations. The ENGLISH TEXT IS THE KEY, so unknown text simply stays English.
//   const { t } = useT();   t('Save changes')   t('Welcome back, {name}.', { name })
// Add new text to i18n-dict.js as ['English', 'ta', 'hi', 'ml', 'te'].

const ORDER = ['ta', 'hi', 'ml', 'te'];
const MAP = new Map(DICT.map(([en, ...rest]) => [en, Object.fromEntries(ORDER.map((l, i) => [l, rest[i]]))]));

export function translate(text, lang, vars) {
  let out = lang === 'en' ? text : MAP.get(text)?.[lang] || text;
  if (vars) for (const k of Object.keys(vars)) out = out.split(`{${k}}`).join(String(vars[k]));
  return out;
}

export function useT() {
  const [lang, setLang] = useLang();
  return { lang, setLang, t: (text, vars) => translate(text, lang, vars) };
}
