/* Inline SVG icons, car illustrations and the campus map */
const I = {
  back:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',
  search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
  map:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M9 4L3 6.5v13L9 17l6 2.5 6-2.5V4l-6 2.5L9 4z"/><path d="M9 4v13M15 6.5v13"/></svg>',
  trips:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="3" y="5" width="18" height="15" rx="2.5"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
  help:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M9.5 9.3a2.6 2.6 0 015 .9c0 1.7-2.5 2.2-2.5 3.8"/><circle cx="12" cy="17.3" r=".6" fill="currentColor"/></svg>',
  pin:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0119 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
  walk:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="13" cy="4.5" r="1.8"/><path d="M10 21l2-6 3 3v3M9 11l3-3 3 3 3 1M12 8l-1 5"/></svg>',
  alert:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 3l9.5 17h-19L12 3z" stroke-linejoin="round"/><path d="M12 10v4"/><circle cx="12" cy="17" r=".6" fill="currentColor"/></svg>',
  chat:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M4 5h16v11H9l-5 4V5z"/></svg>',
  phone:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M5 3h4l2 5-2.5 1.5a11 11 0 006 6L16 13l5 2v4a2 2 0 01-2 2A16 16 0 013 5a2 2 0 012-2z"/></svg>',
  book:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M4 4h6a2 2 0 012 2v14a2 2 0 00-2-2H4V4zM20 4h-6a2 2 0 00-2 2v14a2 2 0 012-2h6V4z"/></svg>',
  check:'<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  camera:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M4 7h3l2-2.5h6L17 7h3v12H4V7z"/><circle cx="12" cy="13" r="3.5"/></svg>',
};

function carSVG(car){
  const c = car.color, wheel = (x) => `<circle cx="${x}" cy="108" r="17" fill="#1d2422"/><circle cx="${x}" cy="108" r="7" fill="#c9d1ce"/>`;
  let body;
  if (car.id === 'sedan') body = `<path d="M18 104 L18 82 Q20 70 40 68 L78 64 L108 42 Q114 38 124 38 L196 38 Q206 38 214 46 L236 66 L268 70 Q284 73 284 88 L284 104 Z" fill="${c}"/>
      <path d="M90 64 L114 45 L156 45 L156 64 Z M164 45 L198 45 L222 64 L164 64 Z" fill="#dbe8f3"/>`;
  else if (car.id === 'suv') body = `<path d="M16 104 L16 74 Q18 62 36 60 L64 58 L84 28 Q88 22 98 22 L222 22 Q232 22 238 30 L258 58 L270 60 Q286 63 286 80 L286 104 Z" fill="${c}"/>
      <path d="M74 58 L92 29 L146 29 L146 58 Z M154 29 L212 29 L212 58 L154 58 Z M220 29 L232 29 L250 58 L220 58 Z" fill="#dbe8f3"/>`;
  else body = `<path d="M14 104 L14 34 Q14 16 32 16 L232 16 Q244 16 252 26 L276 58 Q288 62 288 78 L288 104 Z" fill="${c}"/>
      <path d="M230 24 L248 24 L270 58 L230 58 Z" fill="#dbe8f3"/><rect x="30" y="40" width="180" height="4" rx="2" fill="rgba(255,255,255,.35)"/>`;
  return `<svg viewBox="0 0 300 130" role="img" aria-label="${car.name} illustration"><ellipse cx="150" cy="124" rx="130" ry="5" fill="rgba(0,0,0,.08)"/>${body}${wheel(76)}${wheel(228)}</svg>`;
}

function mapSVG(){
  return `<svg class="base" viewBox="0 0 354 330" preserveAspectRatio="none" aria-hidden="true">
    <rect width="354" height="330" fill="#e9efe9"/>
    <rect x="0" y="232" width="150" height="98" fill="#d3e6d2"/>
    <text x="22" y="292" font-size="10" fill="#5f7d5e" font-weight="600">Commons</text>
    <path d="M0 186 H354" stroke="#ffffff" stroke-width="22"/>
    <path d="M168 0 V330" stroke="#ffffff" stroke-width="16"/>
    <path d="M300 186 V330" stroke="#ffffff" stroke-width="12"/>
    <path d="M0 186 H354" stroke="#e2e8e4" stroke-width="1" stroke-dasharray="8 8"/>
    <text x="196" y="182" font-size="10" fill="#7a8783" font-weight="700" letter-spacing="1">UNIVERSITY AVE</text>
    <rect x="24" y="30" width="112" height="78" rx="6" fill="#d9dfdc"/>
    <text x="58" y="100" font-size="11" fill="#55625e" font-weight="700">Library</text>
    <rect x="22" y="122" width="58" height="46" rx="5" fill="#dfe4e1"/>
    <rect x="92" y="122" width="58" height="46" rx="5" fill="#dfe4e1"/>
    <rect x="190" y="22" width="150" height="104" rx="6" fill="#dde3ef"/>
    <g stroke="#c4cddc" stroke-width="2">${range(0,6).map(i => `<line x1="${200 + i*20}" y1="30" x2="${200 + i*20}" y2="58"/>`).join('')}</g>
    <text x="300" y="118" font-size="11" fill="#4f5e7a" font-weight="700">Lot A</text>
    <rect x="186" y="208" width="104" height="104" rx="6" fill="#dde3ef"/>
    <g stroke="#c4cddc" stroke-width="2">${range(0,4).map(i => `<line x1="${196 + i*20}" y1="216" x2="${196 + i*20}" y2="244"/>`).join('')}</g>
    <text x="208" y="302" font-size="11" fill="#4f5e7a" font-weight="700">Stong Lot</text>
    <rect x="312" y="206" width="38" height="110" rx="5" fill="#dfe4e1"/>
  </svg>`;
}
