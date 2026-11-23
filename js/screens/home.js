/* Project: CarShare high-fidelity prototype (ITEC3230GROUPA)
Description: Screen: Home map: search, price pins, "you are here" */

SCREENS.home = function () {
    const q = state.search.q.trim().toLowerCase();
    const sugg = CARS.filter((c) => !q || (c.lot + " " + c.name).toLowerCase().includes(q));
    return {
        header: header({ title: "Find a car", step: "Cars near you on campus" }),
        body: `
            <div class="search">${icons.search}
                <input id="searchInput" type="text" placeholder="Search campus or pickup lot" value="${escapeHtml(state.search.q)}" autocomplete="off" aria-label="Search campus or pickup lot">
                ${state.search.open ? `<div class="suggest">${sugg.length ? sugg.map((c) => `<button data-a="pin" data-v="${c.id}"><span><b>${c.lot}</b> · ${c.name}</span><span>$${c.price}/hr</span></button>`).join("")
                    : `<div class="empty">No pickup lots match “${escapeHtml(state.search.q)}”. Try “Lot A” or “Library”.</div>`}</div>` : ""}
            </div>
            <div class="map">${mapSVG()}
                <div class="chip">${CARS.length} cars nearby</div>
                ${CARS.map((c) => `<button class="pin" style="left:${c.pin.x}%;top:${c.pin.y}%" data-a="pin" data-v="${c.id}" aria-label="${c.name} at ${c.lot}, $${c.price} per hour">$${c.price}/hr<small>${c.name}</small></button>`).join("")}
                <div class="you" style="left:47%;top:60%"></div><div class="youLabel" style="left:47%;top:60%">You</div>
            </div>
            <div class="legend"><span><i></i>You are here</span><span><b>$</b>Price per hour · tap a pin</span></div>
            <p class="note">Cars available now. Tap a price pin if you know what you want, or filter by your trip to find the right car.</p>`,
        cta: `<button class="btn" data-a="go" data-v="filters">Filter vehicles →</button>`,
    };
};
