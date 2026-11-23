/* Home map: search, price pins, "you are here" */
SCREENS.home = function () {
  const q = S.search.q.trim().toLowerCase();
  const sugg = CARS.filter(c => !q || (c.lot + ' ' + c.name).toLowerCase().includes(q));
  return {
    header: header({ title:'Find a car', step:'Cars near you on campus' }),
    body: `
      <div class="search">${I.search}
        <input id="searchInput" type="text" placeholder="Search campus or pickup lot" value="${esc(S.search.q)}" autocomplete="off" aria-label="Search campus or pickup lot">
        ${S.search.open ? `<div class="suggest">${sugg.length ? sugg.map(c => `<button data-a="pin" data-v="${c.id}"><span><b>${c.lot}</b> · ${c.name}</span><span>$${c.price}/hr</span></button>`).join('')
          : `<div class="empty">No pickup lots match “${esc(S.search.q)}”. Try “Lot A” or “Library”.</div>`}</div>` : ''}
      </div>
      <div class="map">${mapSVG()}
        <div class="chip">${CARS.length} cars nearby</div>
        ${CARS.map(c => `<button class="pin" style="left:${c.pin.x}%;top:${c.pin.y}%" data-a="pin" data-v="${c.id}" aria-label="${c.name} at ${c.lot}, $${c.price} per hour">$${c.price}/hr<small>${c.name}</small></button>`).join('')}
        <div class="you" style="left:47%;top:60%"></div><div class="you-label" style="left:47%;top:60%">You</div>
      </div>
      <div class="legend"><span><i></i>You are here</span><span><b>$</b>Price per hour · tap a pin</span></div>
      <p class="note">Cars available now. Tap a price pin if you know what you want, or filter by your trip to find the right car.</p>`,
    cta: `<button class="btn" data-a="go" data-v="filters">Filter vehicles →</button>`,
  };
};
