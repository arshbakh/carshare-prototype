/* Steps 4–5 of 5: booking time and review */
SCREENS.time = function () {
  const c = CAR(S.carId), b = S.booking, hrs = b.to - b.from;
  const err = conflict(c.id, b.date, b.from, b.to);
  return {
    header: header({ title:'Booking time', step:'Step 4 of 5 · Set pickup and return', progress:4 }),
    body: `
      <div class="summary-chip"><span class="sw" style="background:${c.color}"></span>${c.name} · ${c.lot} · $${c.price}/hr</div>
      <div class="field"><label for="bDate">Date</label>
        <select id="bDate" data-c="bDate">${DATES.map(d => `<option value="${d.iso}" ${d.iso === b.date ? 'selected' : ''}>${d.label}, 2026</option>`).join('')}</select></div>
      <div class="two">
        <div class="field"><label for="bFrom">Pickup</label><select id="bFrom" data-c="bFrom">${range(7,21).map(h => `<option value="${h}" ${h === b.from ? 'selected' : ''}>${fmtH(h)}</option>`).join('')}</select></div>
        <div class="field"><label for="bTo">Return</label><select id="bTo" data-c="bTo">${range(b.from + 1, 22).map(h => `<option value="${h}" ${h === b.to ? 'selected' : ''}>${fmtH(h)}</option>`).join('')}</select></div>
      </div>
      ${err ? `<div class="feedback err">✗ <span>${err}</span></div>` : `<div class="feedback ok">✓ <span>Available for your full time slot.</span></div>`}
      <div class="card" style="margin-top:12px"><div class="rows">
        <div class="row"><span>Duration</span><span>${hrs} hour${hrs > 1 ? 's' : ''}</span></div>
        <div class="row"><span>Rate</span><span>$${c.price} × ${hrs} h</span></div>
        <div class="row total"><span>Estimated cost</span><span>$${c.price * hrs}</span></div>
      </div></div>
      <p class="note">Return must be after pickup. You can check all the details before confirming.</p>`,
    cta: `<button class="btn" data-a="go" data-v="review" ${err ? 'disabled' : ''}>Continue →</button>`,
  };
};

SCREENS.review = function () {
  const c = CAR(S.carId), b = S.booking, hrs = b.to - b.from;
  return {
    header: header({ title:'Review booking', step:'Step 5 of 5 · Check before you confirm', progress:5 }),
    body: `
      <div class="feedback warn" style="margin-top:0">⚠ <span><b>Not booked yet.</b> Please review the details.</span></div>
      <div class="card" style="margin-top:12px">
        <div class="trip-head"><h3>${c.name}</h3><button class="linkbtn" data-a="back">Edit</button></div>
        <div class="rows">
          <div class="row"><span>Pickup location</span><span>${c.lot}, ${c.spot}</span></div>
          <div class="row"><span>Date</span><span>${dateLabel(b.date)}, 2026</span></div>
          <div class="row"><span>Pickup</span><span>${fmtH(b.from)}</span></div>
          <div class="row"><span>Return</span><span>${fmtH(b.to)}</span></div>
          <div class="row"><span>Duration</span><span>${hrs} hour${hrs > 1 ? 's' : ''}</span></div>
          <div class="row"><span>Rate</span><span>$${c.price}/hr</span></div>
          <div class="row"><span>Payment</span><span>${PAY}</span></div>
          <div class="row total"><span>Total</span><span>$${c.price * hrs}</span></div>
        </div>
      </div>
      <div class="card" style="margin-top:12px;background:var(--bg)">
        <b style="font-size:14px">Cancellation policy</b>
        <div class="sub" style="margin-top:4px;line-height:1.45">Free cancellation up to 2 hours before pickup. After that, the first hour is charged. You can change your time from My Trips.</div>
      </div>
      <p class="note">“Confirm reservation” creates your booking. Use Back or Edit to change the details first.</p>`,
    cta: `<button class="btn" data-a="confirm">Confirm reservation</button>`,
  };
};
