/* Project: CarShare high-fidelity prototype (ITEC3230GROUPA)
Description: The app state and the helpers for moving between screens, checking booking clashes and picking cars to compare */

const state = {
    stack: ["home"],
    search: { open: false, q: "" },
    filters: { purpose: null, size: null, min: 10, max: 20 },
    compareSel: null,
    carId: null,
    booking: { date: DATES[0].iso, from: 9, to: 10 },
    trips: [],
    past: [{ id: "T-1931", carId: "sedan", date: "2026-11-14", dateText: "Sat, Nov 14", from: 13, to: 15, status: "completed" }],
    tripTab: "upcoming",
    banner: null,
    edit: null,
    report: null,
    reportDone: null,
    chat: [{ me: false, text: "Hi! I’m Sam from CarShare support. How can I help with your trip today?" }],
    faqOpen: -1,
    modal: null,
    openDropdown: null,
    toast: null,
};

let tripCounter = 2047, reportCounter = 2048;

/* =================== HELPERS =================== */
function currentScreen() {
    return state.stack[state.stack.length - 1];
}

function go(screen) {
    state.openDropdown = null;
    state.stack.push(screen);
    state.search.open = false;
    render(true);
}

function back() {
    state.openDropdown = null;
    if (state.stack.length > 1) state.stack.pop();
    render(true);
}

function tab(root) {
    state.openDropdown = null;
    state.stack = [root];
    state.banner = null;
    render(true);
}

function toast(msg) {
    state.toast = msg;
    render();
    clearTimeout(toast.t);
    toast.t = setTimeout(() => { state.toast = null; render(); }, 2600);
}

function conflict(carId, date, from, to, ignoreTrip) {
    const car = findCar(carId);
    const b = car.booked.find((b) => b.date === date && from < b.to && to > b.from);
    if (b) return `This ${car.name} is already booked ${formatHour(b.from)}–${formatHour(b.to)} on ${dateLabel(date)}. Pick another time.`;
    const t = state.trips.find((t) => t.id !== ignoreTrip && t.date === date && from < t.to && to > t.from);
    if (t) return `You already have a trip at that time (${findCar(t.carId).name}, ${formatHour(t.from)}–${formatHour(t.to)}).`;
    return null;
}

function compareList() {
    const f = state.filters;
    const inPrice = CARS.filter((c) => c.price >= f.min && c.price <= f.max);
    const matches = inPrice.filter((c) => !f.size || c.size === f.size);
    const alts = inPrice.filter((c) => !matches.includes(c));
    const list = matches.slice(0, 2).map((c) => ({ car: c, match: true }));
    for (const c of alts) { if (list.length >= 2) break; list.push({ car: c, match: false }); }
    return { list, matchCount: matches.length };
}

function filterSummary() {
    const f = state.filters, parts = [];
    if (f.purpose) parts.push(f.purpose);
    if (f.size) parts.push(f.size);
    parts.push(`$${f.min}–$${f.max}/hr`);
    return parts.join(" · ");
}

// stops typed text from being read as html
function escapeHtml(s) {
    const safe = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "\"": "&quot;"
    };

    return String(s).replace(/[&<>"]/g, (c) => safe[c]);
}
