/* App state and navigation helpers */
const S = {
  stack:['home'],
  search:{ open:false, q:'' },
  filters:{ purpose:null, size:null, min:10, max:20 },
  compareSel:null,
  carId:null,
  booking:{ date:DATES[0].iso, from:9, to:10 },
  trips:[],
  past:[{ id:'T-1931', carId:'sedan', date:'2026-11-14', dateText:'Sat, Nov 14', from:13, to:15, status:'completed' }],
  tripTab:'upcoming',
  banner:null,
  edit:null,
  report:null,
  reportDone:null,
  chat:[{ me:false, text:'Hi! I’m Sam from CarShare support. How can I help with your trip today?' }],
  faqOpen:-1,
  modal:null,
  toast:null,
};
let tripCounter = 2047, reportCounter = 2048;

/* =================== HELPERS =================== */
const cur = () => S.stack[S.stack.length - 1];
function go(screen){ S.stack.push(screen); S.search.open = false; render(true); }
function back(){ if (S.stack.length > 1) S.stack.pop(); render(true); }
function tab(root){ S.stack = [root]; S.banner = null; render(true); }
function toast(msg){ S.toast = msg; render(); clearTimeout(toast.t); toast.t = setTimeout(() => { S.toast = null; render(); }, 2600); }
function conflict(carId, date, from, to, ignoreTrip){
  const car = CAR(carId);
  const b = car.booked.find(b => b.date === date && from < b.to && to > b.from);
  if (b) return `This ${car.name} is already booked ${fmtH(b.from)}–${fmtH(b.to)} on ${dateLabel(date)}. Pick another time.`;
  const t = S.trips.find(t => t.id !== ignoreTrip && t.date === date && from < t.to && to > t.from);
  if (t) return `You already have a trip at that time (${CAR(t.carId).name}, ${fmtH(t.from)}–${fmtH(t.to)}).`;
  return null;
}
function compareList(){
  const f = S.filters;
  const inPrice = CARS.filter(c => c.price >= f.min && c.price <= f.max);
  const matches = inPrice.filter(c => !f.size || c.size === f.size);
  const alts = inPrice.filter(c => !matches.includes(c));
  const list = matches.slice(0, 2).map(c => ({ car:c, match:true }));
  for (const c of alts) { if (list.length >= 2) break; list.push({ car:c, match:false }); }
  return { list, matchCount:matches.length };
}
const filterSummary = () => {
  const f = S.filters, parts = [];
  if (f.purpose) parts.push(f.purpose);
  if (f.size) parts.push(f.size);
  parts.push(`$${f.min}–$${f.max}/hr`);
  return parts.join(' · ');
};
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
