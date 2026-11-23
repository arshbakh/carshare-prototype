/* Help tab and FAQs */
SCREENS.help = function () {
  const next = S.trips[0];
  return {
    header: header({ title:'Help', step:'Support is always one tap away', back:S.stack.length > 1 }),
    body: `
      <div style="font-size:16px;font-weight:700">How can we help?</div>
      <div class="sub" style="margin:2px 0 12px">Choose an option. Your trip stays saved.</div>
      <div class="list">
        <button class="list-item urgent" data-a="report" data-v="${next ? next.id : ''}"><span class="ico">${I.alert}</span><span><b>Report a problem</b><small>Vehicle damage, pickup or trip issue</small></span><span class="chev">›</span></button>
        <button class="list-item" data-a="go" data-v="chat"><span class="ico">${I.chat}</span><span><b>Chat with support</b><small>Message the campus support team</small></span><span class="chev">›</span></button>
        <button class="list-item" data-a="call"><span class="ico">${I.phone}</span><span><b>Call support 24/7</b><small>Talk to someone about your trip</small></span><span class="chev">›</span></button>
        <button class="list-item" data-a="go" data-v="faq"><span class="ico">${I.book}</span><span><b>FAQs</b><small>Pickup, time changes and cancellations</small></span><span class="chev">›</span></button>
      </div>
      ${next ? `<div class="card" style="margin-top:14px;background:var(--bg)"><div class="sub">Your upcoming trip</div><b>${CAR(next.carId).name} · ${CAR(next.carId).lot}</b><div class="sub">${dateLabel(next.date)} · ${fmtH(next.from)}–${fmtH(next.to)}</div></div>` : ''}
      ${S.stack.length > 1 ? '<p class="note">← Back returns you to where you left off.</p>' : ''}`,
    cta: '',
  };
};

SCREENS.faq = function () {
  const F = [
    ['How do I pick up the car?', 'Walk to the lot and spot shown on your trip in My Trips. The car is parked in a marked car-share bay.'],
    ['Can I change my time after booking?', 'Yes. Open My Trips → Change time. You see the new total and confirm before anything is saved.'],
    ['What is the cancellation policy?', 'Cancelling is free up to 2 hours before pickup. After that, the first hour is charged.'],
    ['What if the car is damaged when I arrive?', 'Report it before you drive: Help → Report a problem. Damage reported before the trip is never charged to you.'],
  ];
  return {
    header: header({ title:'FAQs', step:'Quick answers' }),
    body: F.map(([q, a], i) => `<div class="faq"><button data-a="faq" data-v="${i}" aria-expanded="${S.faqOpen === i}">${q}<span>${S.faqOpen === i ? '−' : '+'}</span></button>${S.faqOpen === i ? `<div>${a}</div>` : ''}</div>`).join('')
      + `<p class="note">Still stuck? <button class="linkbtn" data-a="go" data-v="chat">Chat with support</button></p>`,
    cta: '',
  };
};
