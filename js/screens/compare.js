/* Project: CarShare high-fidelity prototype (ITEC3230GROUPA)
Description: Screen: Step 2 of 5: compare cars side by side */

SCREENS.compare = function () {
    const { list, matchCount } = compareList();
    const sel = state.compareSel && list.find((x) => x.car.id === state.compareSel) ? findCar(state.compareSel) : null;
    const altCount = list.length - Math.min(matchCount, 2);
    let heading;
    if (!list.length) heading = "No cars in this price range";
    else if (matchCount === 0) heading = `No exact matches · ${list.length} close alternative${list.length > 1 ? "s" : ""}`;
    else heading = `${Math.min(matchCount,2)} match${matchCount > 1 ? "es" : ""}${altCount ? ` + ${altCount} alternative` : ""}`;
    const best = (key, fn) => { const vals = list.map((x) => fn(x.car)); const b = key === "max" ? Math.max(...vals) : Math.min(...vals); return vals.map((v) => v === b && list.length > 1); };
    const seatBest = best("max", (c) => c.seats), priceBest = best("min", (c) => c.price), walkBest = best("min", (c) => c.walk);
    return {
        header: header({ title: "Compare cars", step: "Step 2 of 5 · Choose a vehicle", progress: 2 }),
        body: !list.length ? `
            <div class="emptyState"><b>No cars between $${state.filters.min} and $${state.filters.max}/hr</b>Go back and widen your price range.</div>
            <button class="btn secondary" data-a="back">← Change filters</button>` : `
            <div style="font-size:16px;font-weight:700">${heading}</div>
            <div class="sub" style="margin:2px 0 12px">${filterSummary()}</div>
            <div class="cmp">${list.map(({car, match}) => `
                <div class="car ${sel && sel.id === car.id ? "on" : ""}">
                    <span class="badge ${match ? "ok" : "muted"}">${match ? "✓ Match" : "Alternative"}</span>
                    <div class="carimg">${carSVG(car)}</div>
                    <h3>${car.name}</h3><div class="model">${car.model}</div>
                    <div class="facts">${car.seats} seats<br>${car.space}</div>
                    <div class="price">$${car.price}<small>/hr</small></div>
                    <button class="btn small ${sel && sel.id === car.id ? "" : "secondary"}" data-a="selectCar" data-v="${car.id}" aria-pressed="${!!(sel && sel.id === car.id)}">${sel && sel.id === car.id ? "✓ Selected" : "Select " + car.name}</button>
                </div>`).join("")}</div>
            ${list.length > 1 ? `
            <div class="sectionLabel">Side by side</div>
            <table class="cmpTable"><thead><tr><th></th>${list.map((x) => `<th>${x.car.name}</th>`).join("")}</tr></thead><tbody>
                <tr><th>Seats</th>${list.map((x,i) => `<td class="${seatBest[i] ? "good" : ""}">${x.car.seats} people</td>`).join("")}</tr>
                <tr><th>Space</th>${list.map((x) => `<td>${x.car.spaceLong}</td>`).join("")}</tr>
                <tr><th>Price</th>${list.map((x,i) => `<td class="${priceBest[i] ? "good" : ""}">$${x.car.price}/hr</td>`).join("")}</tr>
                <tr><th>Pickup</th>${list.map((x) => `<td>${x.car.lot}</td>`).join("")}</tr>
                <tr><th>Walk</th>${list.map((x,i) => `<td class="${walkBest[i] ? "good" : ""}">${x.car.walk} min</td>`).join("")}</tr>
                <tr><th>Fuel</th>${list.map((x) => `<td>${x.car.fuel}</td>`).join("")}</tr>
            </tbody></table>` : ""}
            ${sel ? `<div class="feedback ok">✓ <span><b>${sel.name} selected</b> · ${sel.seats} seats · $${sel.price}/hr at ${sel.lot}.</span></div>`
                        : `<div class="feedback info"><span>Select a car to see its details.</span></div>`}`,
        cta: list.length ? `<button class="btn" data-a="viewDetails" ${sel ? "" : "disabled"}>View details →</button>` : "",
    };
};
