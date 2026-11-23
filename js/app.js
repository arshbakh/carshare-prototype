/* Actions, event handling and rendering */
const A = {
  go:v => { if (v === cur()) return; go(v); },
  back:() => back(),
  tab:v => { S.tripTab = 'upcoming'; tab(v); },
  pin:v => { S.carId = v; S.search = { open:false, q:'' }; go('details'); },
  purpose:v => { S.filters.purpose = v; S.filters.size = PURPOSES.find(p => p.id === v).size; S.compareSel = null; render(); },
  size:v => { S.filters.size = v; S.compareSel = null; render(); },
  clearFilters:() => { S.filters = { purpose:null, size:null, min:10, max:20 }; S.compareSel = null; render(); },
  selectCar:v => { S.compareSel = v; render(); },
  viewDetails:() => { S.carId = S.compareSel; go('details'); },
  reserve:() => go('time'),
  confirm:() => {
    const b = S.booking, id = 'T-' + (tripCounter++);
    S.trips.unshift({ id, carId:S.carId, date:b.date, from:b.from, to:b.to, status:'confirmed' });
    S.stack = ['trips']; S.tripTab = 'upcoming';
    S.banner = 'Reservation confirmed. You’re all set!';
    S.filters = { purpose:null, size:null, min:10, max:20 }; S.compareSel = null;
    render(true);
  },
  tripTab:v => { S.tripTab = v; render(); },
  changeTime:v => { const t = S.trips.find(x => x.id === v); S.edit = { tripId:v, date:t.date, from:t.from, to:t.to }; S.banner = null; go('change'); },
  reviewChange:() => { S.modal = { type:'change' }; render(); },
  saveChange:() => {
    const t = S.trips.find(x => x.id === S.edit.tripId);
    Object.assign(t, { date:S.edit.date, from:S.edit.from, to:S.edit.to, status:'updated' });
    S.modal = null; S.stack = ['trips']; S.tripTab = 'upcoming';
    S.banner = `Trip updated: ${dateLabel(t.date)}, ${fmtH(t.from)}–${fmtH(t.to)}.`;
    render(true);
  },
  cancelTrip:v => { S.modal = { type:'cancel', tripId:v }; render(); },
  doCancel:() => {
    const i = S.trips.findIndex(x => x.id === S.modal.tripId), t = S.trips[i], c = CAR(t.carId);
    S.trips.splice(i, 1); t.status = 'cancelled'; S.past.unshift(t);
    S.modal = null; S.banner = `Reservation cancelled. $${c.price * (t.to - t.from)} refund to ${PAY} in 3–5 days.`;
    render();
  },
  report:v => { S.report = { tripId:v || (S.trips[0] ? S.trips[0].id : null), issue:null, details:'', photo:false }; go('report'); },
  rTrip:v => { S.report.tripId = v; render(); },
  rIssue:v => { S.report.issue = v; render(); },
  rPhoto:() => { S.report.photo = !S.report.photo; render(); },
  submitReport:() => {
    const r = S.report, t = S.trips.find(x => x.id === r.tripId);
    S.reportDone = { no:reportCounter++, issue:r.issue, trip:t ? `${CAR(t.carId).name}, ${dateLabel(t.date)}` : '' };
    S.stack[S.stack.length - 1] = 'reportDone'; render(true);
  },
  call:() => { S.modal = { type:'call' }; render(); },
  dial:() => { S.modal = null; toast('Calling 1-800-555-0199… (simulated in prototype)'); },
  faq:v => { S.faqOpen = S.faqOpen === +v ? -1 : +v; render(); },
  closeModal:() => { S.modal = null; render(); },
  overlay:(v, el, e) => { if (e.target === el) { S.modal = null; render(); } },
};

document.addEventListener('click', e => {
  const el = e.target.closest('[data-a]');
  if (!el || el.disabled) return;
  if (el.dataset.a !== 'overlay') e.stopPropagation();
  A[el.dataset.a](el.dataset.v, el, e);
});
document.addEventListener('mousedown', e => {
  if (S.search.open && !e.target.closest('.search') && !e.target.closest('[data-a]')) { S.search.open = false; render(); }
});

document.addEventListener('change', e => {
  const k = e.target.dataset.c; if (!k) return;
  const v = e.target.value;
  if (k === 'bDate') S.booking.date = v;
  if (k === 'bFrom') { S.booking.from = +v; if (S.booking.to <= S.booking.from) S.booking.to = S.booking.from + 1; }
  if (k === 'bTo') S.booking.to = +v;
  if (k === 'eDate') S.edit.date = v;
  if (k === 'eFrom') { const dur = S.edit.to - S.edit.from; S.edit.from = +v; S.edit.to = Math.min(22, S.edit.from + dur); }
  if (k === 'eTo') S.edit.to = +v;
  render();
});

document.addEventListener('input', e => {
  const id = e.target.id;
  if (id === 'minR' || id === 'maxR') {
    let mn = +document.getElementById('minR').value, mx = +document.getElementById('maxR').value;
    if (mn > mx - 1) { if (id === 'minR') mn = mx - 1; else mx = mn + 1; }
    document.getElementById('minR').value = mn; document.getElementById('maxR').value = mx;
    S.filters.min = mn; S.filters.max = mx; S.compareSel = null;
    paintRange();
  }
  if (id === 'searchInput') { S.search.q = e.target.value; S.search.open = true; renderKeepFocus('searchInput'); }
  if (id === 'rDetails') S.report.details = e.target.value;
});
document.addEventListener('focusin', e => {
  if (e.target.id === 'searchInput' && !S.search.open) { S.search.open = true; renderKeepFocus('searchInput'); }
});
document.addEventListener('submit', e => {
  if (e.target.dataset.f !== 'chat') return;
  e.preventDefault();
  const inp = document.getElementById('chatInput'), text = inp.value.trim();
  if (!text) return;
  S.chat.push({ me:true, text });
  S.chat.push({ me:false, text:'Sam is typing…', typing:true });
  render(); document.getElementById('chatInput').focus();
  setTimeout(() => {
    S.chat = S.chat.filter(m => !m.typing);
    S.chat.push({ me:false, text:'Thanks for the details! I’ve added a note to your trip. Is there anything else I can help with?' });
    if (cur() === 'chat') { render(); document.getElementById('chatInput').focus(); }
  }, 1300);
});

function paintRange(){
  const f = S.filters, lo = 5, hi = 30;
  const fill = document.getElementById('priceFill'); if (!fill) return;
  const a = (f.min - lo) / (hi - lo), b = (f.max - lo) / (hi - lo);
  fill.style.left = `calc(10px + ${a} * (100% - 20px))`;
  fill.style.width = `calc(${b - a} * (100% - 20px))`;
  document.getElementById('priceLabel').textContent = `$${f.min}–$${f.max}`;
  const fb = document.getElementById('filterFeedback');
  if (f.size) fb.innerHTML = `✓ <span><b>Selected:</b> ${filterSummary()}. You can change these before reserving.</span>`;
}

/* =================== RENDER =================== */
const $ = id => document.getElementById(id);
function render(scrollTop){
  const s = SCREENS[cur()]();
  $('hdr').innerHTML = s.header;
  $('body').innerHTML = s.body;
  $('cta').innerHTML = s.cta || '';
  $('cta').style.display = s.cta ? '' : 'none';
  const root = S.stack[0];
  $('nav').innerHTML = [['home','Home',I.map],['trips','My Trips',I.trips],['help','Help',I.help]]
    .map(([id, label, ico]) => `<button class="${root === id ? 'active' : ''}" data-a="tab" data-v="${id}" aria-current="${root === id ? 'page' : 'false'}">${ico}${label}</button>`).join('');
  $('layer').innerHTML = modalHTML() + (S.toast ? `<div class="toast" role="status">${S.toast}</div>` : '');
  if (scrollTop) $('body').scrollTop = 0;
  if (cur() === 'filters') paintRange();
  if (cur() === 'chat') $('body').scrollTop = $('body').scrollHeight;
}
function renderKeepFocus(id){
  const el = $(id), pos = el ? el.selectionStart : null;
  render();
  const n = $(id); if (n) { n.focus(); if (pos != null) n.setSelectionRange(pos, pos); }
}

/* Start the app on the Home map */
render();
