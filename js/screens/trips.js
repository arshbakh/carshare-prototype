/* Project: CarShare high-fidelity prototype (ITEC3230GROUPA)
Description: Screen: My Trips: upcoming/past trips and change time */

SCREENS.trips = function () {
    const up = state.trips, past = state.past;
    const tripCard = (t, upcoming) => {
        const c = findCar(t.carId), hrs = t.to - t.from;
        const badge = t.status === "cancelled" ? `<span class="badge err">Cancelled</span>`
            : t.status === "completed" ? `<span class="badge muted">Completed</span>`
            : t.status === "updated" ? `<span class="badge ok">✓ Updated</span>` : `<span class="badge ok">✓ Confirmed</span>`;
        return `<div class="trip">
            <div class="tripHead"><h3>${c.name}</h3>${badge}</div>
            <div class="sub">${t.id} · ${c.model}</div>
            <div class="rows" style="margin-top:6px">
                <div class="row"><span>Date</span><span>${t.dateText || dateLabel(t.date) + ", 2026"}</span></div>
                <div class="row"><span>Pickup location</span><span>${c.lot}, ${c.spot}</span></div>
                <div class="row"><span>Pickup → Return</span><span>${formatHour(t.from)} – ${formatHour(t.to)}</span></div>
                <div class="row"><span>Duration</span><span>${hrs} hour${hrs > 1 ? "s" : ""}</span></div>
                <div class="row total"><span>${t.status === "cancelled" ? "Refund" : "Total"}</span><span>$${c.price * hrs}</span></div>
            </div>
            ${upcoming ? `<div class="actions">
                <button class="btn secondary small" data-a="changeTime" data-v="${t.id}">Change time</button>
                <button class="btn secondary small" data-a="cancelTrip" data-v="${t.id}">Cancel reservation</button>
                <button class="btn secondary small" data-a="report" data-v="${t.id}">Report a problem</button></div>` : ""}
        </div>`;
    };
    const list = state.tripTab === "upcoming" ? up : past;
    return {
        header: header({ title: "My Trips", step: "Your reservations", back: false }),
        body: `
            <div class="tabs2" role="tablist"><button class="${state.tripTab === "upcoming" ? "on" : ""}" data-a="tripTab" data-v="upcoming">Upcoming (${up.length})</button>
                <button class="${state.tripTab === "past" ? "on" : ""}" data-a="tripTab" data-v="past">Past (${past.length})</button></div>
            ${state.banner ? `<div class="feedback ok" style="margin:0 0 12px">✓ <span>${state.banner}</span></div>` : ""}
            ${list.length ? list.map((t) => tripCard(t, state.tripTab === "upcoming")).join("")
                : `<div class="emptyState"><b>No upcoming trips</b>When you book a car, it shows up here.</div>
                      <button class="btn" data-a="tab" data-v="home">Find a car →</button>`}
            ${state.tripTab === "upcoming" && up.length ? `<p class="note">You’ll review any change or cancellation before it’s saved.</p>` : ""}`,
        cta: "",
    };
};

SCREENS.change = function () {
    const e = state.edit, t = state.trips.find((x) => x.id === e.tripId), c = findCar(t.carId);
    const hrs = e.to - e.from, oldTotal = c.price * (t.to - t.from), newTotal = c.price * hrs;
    const same = e.date === t.date && e.from === t.from && e.to === t.to;
    const err = conflict(c.id, e.date, e.from, e.to, t.id);
    const diff = newTotal - oldTotal;
    return {
        header: header({ title: "Change time", step: `Editing your ${c.name} trip (${t.id})` }),
        body: `
            <div class="summaryChip"><span class="sw" style="background:${c.color}"></span>Now: ${dateLabel(t.date)} · ${formatHour(t.from)}–${formatHour(t.to)} · $${oldTotal}</div>
            ${dropdown("eDate", "New date", dateOptions(), e.date)}
            <div class="two">
                ${dropdown("eFrom", "New pickup", hourOptions(7, 21), e.from)}
                ${dropdown("eTo", "New return", hourOptions(e.from + 1, 22), e.to)}
            </div>
            ${same ? `<div class="feedback info"><span>Pick a new date or time above.</span></div>`
                : err ? `<div class="feedback err">✗ <span>${err}</span></div>`
                : `<div class="feedback ok">✓ <span>Available for your new time slot.</span></div>`}
            <div class="card" style="margin-top:12px"><div class="rows">
                <div class="row"><span>New duration</span><span>${hrs} hour${hrs > 1 ? "s" : ""}</span></div>
                <div class="row total"><span>New total</span><span>$${newTotal}</span></div>
            </div>
            <div class="sub" style="margin-top:2px">${diff === 0 ? "Same price as before." : diff > 0 ? `$${diff} more than before.` : `$${-diff} less than before. The difference is refunded.`}</div></div>`,
        cta: `<button class="btn" data-a="reviewChange" ${same || err ? "disabled" : ""}>Review change →</button>`,
    };
};
