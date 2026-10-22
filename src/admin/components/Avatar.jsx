import { initials, swatch } from '../data/mockData.js';

export default function Avatar({ name, size = 40, index = 0 }) {
  const [bg, fg] = swatch(index);
  return (
    <span className="avatar" style={{ width: size, height: size, background: bg, color: '#4a1c8f', fontSize: size * 0.38, boxShadow: `inset 0 0 0 1.5px ${fg}55` }}>
      {initials(name)}
    </span>
  );
}
