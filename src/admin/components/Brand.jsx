import { useT } from '../i18n.js';

export default function Brand({ light = false, size = 'md' }) {
  const { t } = useT();
  return (
    <div className={`brand brand-${size} ${light ? 'brand-light' : ''}`}>
      <svg viewBox="0 0 64 64" width="38" height="38" aria-hidden="true">
        <rect width="64" height="64" rx="16" fill={light ? '#e6ebd7' : '#2d3524'} />
        <path d="M32 14c6 6 9 11 9 16a9 9 0 0 1-18 0c0-5 3-10 9-16z" fill="#dde4c8" />
        <path d="M32 50c-8-3-14-9-14-16 6 0 11 2 14 6 3-4 8-6 14-6 0 7-6 13-14 16z" fill="#b2b9a7" />
      </svg>
      <div>
        <strong>Revathi Herbal Beauty Care</strong>
        <span>{t('Beauty Salon admin')}</span>
      </div>
    </div>
  );
}
