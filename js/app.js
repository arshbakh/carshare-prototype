/* Project: CarShare high-fidelity prototype (ITEC3230GROUPA)
Description: All the button and form handling, and the render function that draws the current screen */

const actions = {
    openDropdown: (v) => { state.openDropdown = state.openDropdown === v ? null : v; render(); },
    pickOption: (v) => {
        const [field, value] = v.split("|");
        state.openDropdown = null;
        setField(field, value);
        render();
    },
    go: (v) => { if (v === currentScreen()) return; go(v); },
    back: () => back(),
    tab: (v) => { state.tripTab = "upcoming"; tab(v); },
    pin: (v) => { state.carId = v; state.search = { open: false, q: "" }; go("details"); },
    purpose: (v) => { state.filters.purpose = v; state.filters.size = PURPOSES.find((p) => p.id === v).size; state.compareSel = null; render(); },
    size: (v) => { state.filters.size = v; state.compareSel = null; render(); },
    clearFilters: () => { state.filters = { purpose: null, size: null, min: 10, max: 20 }; state.compareSel = null; render(); },
    selectCar: (v) => { state.compareSel = v; render(); },
    viewDetails: () => { state.carId = state.compareSel; go("details"); },
    reserve: () => go("time"),
    confirm: () => {
        const b = state.booking, id = "T-" + (tripCounter++);
        state.trips.unshift({ id, carId: state.carId, date: b.date, from: b.from, to: b.to, status: "confirmed" });
        state.stack = ["trips"]; state.tripTab = "upcoming";
        state.banner = "Reservation confirmed. You’re all set!";
        state.filters = { purpose: null, size: null, min: 10, max: 20 }; state.compareSel = null;
        render(true);
    },
    tripTab: (v) => { state.tripTab = v; render(); },
    changeTime: (v) => { const t = state.trips.find((x) => x.id === v); state.edit = { tripId: v, date: t.date, from: t.from, to: t.to }; state.banner = null; go("change"); },
    reviewChange: () => { state.modal = { type: "change" }; render(); },
    saveChange: () => {
        const t = state.trips.find((x) => x.id === state.edit.tripId);
        Object.assign(t, { date: state.edit.date, from: state.edit.from, to: state.edit.to, status: "updated" });
        state.modal = null; state.stack = ["trips"]; state.tripTab = "upcoming";
        state.banner = `Trip updated: ${dateLabel(t.date)}, ${formatHour(t.from)}–${formatHour(t.to)}.`;
        render(true);
    },
    cancelTrip: (v) => { state.modal = { type: "cancel", tripId: v }; render(); },
    doCancel: () => {
        const i = state.trips.findIndex((x) => x.id === state.modal.tripId), t = state.trips[i], c = findCar(t.carId);
        state.trips.splice(i, 1); t.status = "cancelled"; state.past.unshift(t);
        state.modal = null; state.banner = `Reservation cancelled. $${c.price * (t.to - t.from)} refund to ${PAY} in 3–5 days.`;
        render();
    },
    report: (v) => { state.report = { tripId: v || (state.trips[0] ? state.trips[0].id : null), issue: null, details: "", photo: false }; go("report"); },
    rTrip: (v) => { state.report.tripId = v; render(); },
    rIssue: (v) => { state.report.issue = v; render(); },
    rPhoto: () => { state.report.photo = !state.report.photo; render(); },
    submitReport: () => {
        const r = state.report, t = state.trips.find((x) => x.id === r.tripId);
        state.reportDone = { no: reportCounter++, issue: r.issue, trip: t ? `${findCar(t.carId).name}, ${dateLabel(t.date)}` : "" };
        state.stack[state.stack.length - 1] = "reportDone"; render(true);
    },
    call: () => { state.modal = { type: "call" }; render(); },
    dial: () => { state.modal = null; toast("Calling 1-800-555-0199… (simulated in prototype)"); },
    faq: (v) => { state.faqOpen = state.faqOpen === +v ? -1 : +v; render(); },
    closeModal: () => { state.modal = null; render(); },
    overlay: (v, el, e) => { if (e.target === el) { state.modal = null; render(); } },
};

document.addEventListener("click", (e) => {
    const el = e.target.closest("[data-a]");
    if (!el || el.disabled) return;
    if (el.dataset.a !== "overlay") e.stopPropagation();
    if (el.dataset.a !== "openDropdown" && el.dataset.a !== "pickOption") state.openDropdown = null;
    actions[el.dataset.a](el.dataset.v, el, e);
});
document.addEventListener("mousedown", (e) => {
    if (state.search.open && !e.target.closest(".search") && !e.target.closest("[data-a]")) { state.search.open = false; render(); }
    if (state.openDropdown && !e.target.closest(".dropdown") && !e.target.closest("[data-a]")) { state.openDropdown = null; render(); }
});

// updates the booking or the edit when a date or time is picked
function setField(k, v) {
    if (k === "bDate") state.booking.date = v;
    if (k === "bFrom") { state.booking.from = +v; if (state.booking.to <= state.booking.from) state.booking.to = state.booking.from + 1; }
    if (k === "bTo") state.booking.to = +v;
    if (k === "eDate") state.edit.date = v;
    if (k === "eFrom") { const dur = state.edit.to - state.edit.from; state.edit.from = +v; state.edit.to = Math.min(22, state.edit.from + dur); }
    if (k === "eTo") state.edit.to = +v;
}

document.addEventListener("change", (e) => {
    const k = e.target.dataset.c; if (!k) return;
    setField(k, e.target.value);
    render();
});

document.addEventListener("input", (e) => {
    const id = e.target.id;
    if (id === "minR" || id === "maxR") {
        let mn = +document.getElementById("minR").value, mx = +document.getElementById("maxR").value;
        if (mn > mx - 1) { if (id === "minR") mn = mx - 1; else mx = mn + 1; }
        document.getElementById("minR").value = mn; document.getElementById("maxR").value = mx;
        state.filters.min = mn; state.filters.max = mx; state.compareSel = null;
        paintRange();
    }
    if (id === "searchInput") { state.search.q = e.target.value; state.search.open = true; renderKeepFocus("searchInput"); }
    if (id === "rDetails") state.report.details = e.target.value;
});
document.addEventListener("focusin", (e) => {
    if (e.target.id === "searchInput" && !state.search.open) { state.search.open = true; renderKeepFocus("searchInput"); }
});
document.addEventListener("submit", (e) => {
    if (e.target.dataset.f !== "chat") return;
    e.preventDefault();
    const inp = document.getElementById("chatInput"), text = inp.value.trim();
    if (!text) return;
    state.chat.push({ me: true, text });
    state.chat.push({ me: false, text: "Sam is typing…", typing: true });
    render(); document.getElementById("chatInput").focus();
    setTimeout(() => {
        state.chat = state.chat.filter((m) => !m.typing);
        state.chat.push({ me: false, text: "Thanks for the details! I’ve added a note to your trip. Is there anything else I can help with?" });
        if (currentScreen() === "chat") { render(); document.getElementById("chatInput").focus(); }
    }, 1300);
});

function paintRange() {
    const f = state.filters, lo = 5, hi = 30;
    const fill = document.getElementById("priceFill"); if (!fill) return;
    const a = (f.min - lo) / (hi - lo), b = (f.max - lo) / (hi - lo);
    fill.style.left = `calc(10px + ${a} * (100% - 20px))`;
    fill.style.width = `calc(${b - a} * (100% - 20px))`;
    document.getElementById("priceLabel").textContent = `$${f.min}–$${f.max}`;
    const fb = document.getElementById("filterFeedback");
    if (f.size) fb.innerHTML = `✓ <span><b>Selected:</b> ${filterSummary()}. You can change these before reserving.</span>`;
}

/* =================== RENDER =================== */
function byId(id) {
    return document.getElementById(id);
}

function render(scrollTop) {
    const s = SCREENS[currentScreen()]();
    byId("hdr").innerHTML = s.header;
    byId("body").innerHTML = s.body;
    byId("cta").innerHTML = s.cta || "";
    byId("cta").style.display = s.cta ? "" : "none";
    const root = state.stack[0];
    byId("nav").innerHTML = [["home","Home",icons.map],["trips","My Trips",icons.trips],["help","Help",icons.help]]
        .map(([id, label, ico]) => `<button class="${root === id ? "active" : ""}" data-a="tab" data-v="${id}" aria-current="${root === id ? "page" : "false"}">${ico}${label}</button>`).join("");
    byId("layer").innerHTML = modalHTML() + (state.toast ? `<div class="toast" role="status">${state.toast}</div>` : "");
    if (scrollTop) byId("body").scrollTop = 0;

    // open dropdowns start scrolled to the selected option
    const menu = document.querySelector(".dropdownMenu");
    const picked = menu && menu.querySelector(".selected");
    if (picked) menu.scrollTop = picked.offsetTop - menu.clientHeight / 2 + picked.offsetHeight / 2;
    if (currentScreen() === "filters") paintRange();
    if (currentScreen() === "chat") byId("body").scrollTop = byId("body").scrollHeight;
}

function renderKeepFocus(id) {
    const el = byId(id), pos = el ? el.selectionStart : null;
    render();
    const n = byId(id); if (n) { n.focus(); if (pos != null) n.setSelectionRange(pos, pos); }
}

/* Start the app on the Home map */
render();
