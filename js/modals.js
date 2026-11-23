/* Bottom-sheet dialogs: confirm time change, confirm cancel, call support */
function modalHTML(){
  const m = S.modal; if (!m) return '';
  let inner = '';
  if (m.type === 'change') {
    const t = S.trips.find(x => x.id === S.edit.tripId), c = CAR(t.carId), e = S.edit;
    inner = `<h2>Save this change?</h2><p>Your ${c.name} trip will move to the new time.</p>
      <div class="compare-times"><div>Before<b>${dateLabel(t.date)}</b>${fmtH(t.from)}–${fmtH(t.to)}</div><span>→</span>
        <div class="new">After<b>${dateLabel(e.date)}</b>${fmtH(e.from)}–${fmtH(e.to)}</div></div>
      <p>New total: <b>$${c.price * (e.to - e.from)}</b></p>
      <div class="actions"><button class="btn" data-a="saveChange">Save change</button><button class="btn secondary" data-a="closeModal">Keep current time</button></div>`;
  } else if (m.type === 'cancel') {
    const t = S.trips.find(x => x.id === m.tripId), c = CAR(t.carId), total = c.price * (t.to - t.from);
    inner = `<h2>Cancel this reservation?</h2>
      <p>${c.name} · ${dateLabel(t.date)} · ${fmtH(t.from)}–${fmtH(t.to)}</p>
      <div class="feedback ok" style="margin:0 0 14px">✓ <span>You’ll get a <b>full refund of $${total}</b> to ${PAY}. Free cancellation until 2 hours before pickup.</span></div>
      <div class="actions"><button class="btn danger" data-a="doCancel">Cancel reservation</button><button class="btn secondary" data-a="closeModal">Keep my trip</button></div>`;
  } else if (m.type === 'call') {
    inner = `<h2>Call support 24/7</h2><p>Talk to a person about your trip, the car, or an emergency.</p>
      <div class="card" style="text-align:center;font-size:22px;font-weight:750;margin-bottom:14px">1-800-555-0199</div>
      <div class="actions"><button class="btn" data-a="dial">${I.phone} Call now</button><button class="btn secondary" data-a="closeModal">Not now</button></div>`;
  }
  return `<div class="overlay" data-a="overlay"><div class="sheet" role="dialog" aria-modal="true"><div class="grab"></div>${inner}</div></div>`;
}
