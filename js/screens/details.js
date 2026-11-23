/* Project: CarShare high-fidelity prototype (ITEC3230GROUPA)
Description: Screen: Step 3 of 5: car details and pickup location */

SCREENS.details = function () {
    const c = findCar(state.carId);
    return {
        header: header({ title: "Car details", step: "Step 3 of 5 · Your selected vehicle", progress: 3 }),
        body: `
            <div class="hero">
                <div class="heroTop"><div><h2>${c.name}</h2><div class="model">${c.model}</div></div><span class="badge ok">✓ Available</span></div>
                <div class="carimg" style="margin-top:10px">${carSVG(c)}</div>
                <div class="rows" style="margin-top:8px">
                    <div class="row"><span>Seats</span><span>${c.seats} people</span></div>
                    <div class="row"><span>Space</span><span>${c.spaceLong}</span></div>
                    <div class="row"><span>Fuel</span><span>${c.fuel}</span></div>
                    <div class="row"><span>Hourly price</span><span>$${c.price}/hr</span></div>
                </div>
            </div>
            <div class="card" style="margin-top:12px">
                <div class="loc"><span class="ico">${icons.pin}</span><div><b>Pickup: ${c.lot}, ${c.spot}</b><div>${c.walk}-minute walk from your location</div><div>${c.street}</div></div></div>
            </div>
            <div class="feedback info"><span>Choose your time next. <b>No booking yet.</b></span></div>`,
        cta: `<button class="btn" data-a="reserve">Reserve now →</button>`,
    };
};
