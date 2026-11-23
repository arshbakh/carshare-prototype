/* Project: CarShare high-fidelity prototype (ITEC3230GROUPA)
Description: Screen: Step 1 of 5: trip purpose, vehicle size, price range */

SCREENS.filters = function () {
    const f = state.filters, P = PURPOSES.find((p) => p.id === f.purpose);
    return {
        header: header({ title: "Filters", step: "Step 1 of 5 · Find the right car", progress: 1 }),
        body: `
            <div class="sectionLabel">What do you need a car for?</div>
            <div class="optGrid">${PURPOSES.map((p) => `<button class="opt ${f.purpose === p.id ? "on" : ""}" data-a="purpose" data-v="${p.id}" aria-pressed="${f.purpose === p.id}"><span class="dot"></span><span><b>${p.id}</b><small>${p.sub}</small></span></button>`).join("")}</div>
            ${P ? `<div class="hintLine">Suggested for ${P.id}: <b>${P.size}</b> size. You can change it below.</div>` : ""}
            <div class="sectionLabel">Vehicle size</div>
            <div class="seg">${SIZES.map((s) => `<button class="opt ${f.size === s.id ? "on" : ""}" data-a="size" data-v="${s.id}" aria-pressed="${f.size === s.id}"><b>${s.id}</b><small>${s.sub}</small></button>`).join("")}</div>
            <div class="sectionLabel rangeHead"><span>Price per hour</span><b id="priceLabel">$${f.min}–$${f.max}</b></div>
            <div class="dual"><div class="track"></div><div class="fill" id="priceFill"></div>
                <input type="range" id="minR" min="5" max="30" step="1" value="${f.min}" aria-label="Minimum price per hour">
                <input type="range" id="maxR" min="5" max="30" step="1" value="${f.max}" aria-label="Maximum price per hour"></div>
            <div class="rangeEnds"><span>$5</span><span>$30</span></div>
            <div class="feedback ${f.size ? "ok" : "info"}" id="filterFeedback">${f.size ? `✓ <span><b>Selected:</b> ${filterSummary()}. You can change these before reserving.</span>` : `<span>Pick what the trip is for, or choose a size, to see matching cars.</span>`}</div>
            ${(f.purpose || f.size) ? `<p class="note"><button class="linkbtn" data-a="clearFilters">Clear filters</button></p>` : ""}`,
        cta: `<button class="btn" data-a="go" data-v="compare" ${f.size ? "" : "disabled"}>Show available cars →</button>
                    ${f.size ? "" : `<div class="hint">Choose a trip purpose or size to continue</div>`}`,
    };
};
