import { swatch } from '../data/mockData.js';

// Self-contained product illustration, so there are never any broken image links.
export default function ProductThumb({ product, size = 48, index = 0 }) {
  const [bg, fg] = swatch(index);
  const cat = product.category;
  const body = (() => {
    if (cat === 'Perfume') return <><rect x="22" y="26" width="20" height="26" rx="5" fill={fg} /><rect x="27" y="16" width="10" height="10" rx="2" fill="#1f3a2e" /></>;
    if (cat === 'Serum') return <><rect x="25" y="28" width="14" height="24" rx="4" fill={fg} /><rect x="29" y="16" width="6" height="12" rx="2" fill="#1f3a2e" /><rect x="26" y="12" width="12" height="5" rx="2" fill="#1f3a2e" /></>;
    if (cat === 'Moisturiser') return <><rect x="16" y="34" width="32" height="18" rx="5" fill={fg} /><rect x="18" y="26" width="28" height="9" rx="3" fill="#1f3a2e" /></>;
    if (cat === 'Hair Care') return <><rect x="20" y="22" width="24" height="30" rx="6" fill={fg} /><rect x="24" y="14" width="16" height="9" rx="2" fill="#1f3a2e" /></>;
    if (cat === 'Skincare Kit') return <><rect x="12" y="32" width="40" height="20" rx="4" fill={fg} /><rect x="18" y="22" width="9" height="12" rx="2" fill="#1f3a2e" /><rect x="31" y="26" width="14" height="8" rx="2" fill="#1f3a2e" /></>;
    return <><rect x="18" y="30" width="28" height="22" rx="8" fill={fg} /><rect x="20" y="24" width="24" height="8" rx="3" fill="#1f3a2e" /></>;
  })();
  return (
    <svg className="product-thumb" width={size} height={size} viewBox="0 0 64 64" role="img" aria-label={product.name}>
      <rect width="64" height="64" rx="14" fill={bg} />
      {body}
    </svg>
  );
}
