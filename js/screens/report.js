/* Project: CarShare high-fidelity prototype (ITEC3230GROUPA)
Description: Screen: Report a problem and confirmation */

SCREENS.report = function () {
    const r = state.report, ISSUES = ["Damage or scratch","Car is dirty","Can’t unlock","Low fuel or charge","Something else"];
    const opts = [...state.trips.map((t) => ({ id: t.id, label: `${findCar(t.carId).name} · ${dateLabel(t.date)}`, sub: `${findCar(t.carId).lot} · ${formatHour(t.from)}–${formatHour(t.to)}` })),
                                { id: "none", label: "Not about a trip", sub: "General question or account issue" }];
    const ready = r.issue && r.tripId;
    return {
        header: header({ title: "Report a problem", step: "Takes about a minute" }),
        body: `
            <div class="sectionLabel">Which trip is this about?</div>
            <div class="list">${opts.map((o) => `<button class="opt ${r.tripId === o.id ? "on" : ""}" data-a="rTrip" data-v="${o.id}" aria-pressed="${r.tripId === o.id}"><span class="dot"></span><span><b>${o.label}</b><small>${o.sub}</small></span></button>`).join("")}</div>
            <div class="sectionLabel">What happened?</div>
            <div class="chips">${ISSUES.map((i) => `<button class="chipBtn ${r.issue === i ? "on" : ""}" data-a="rIssue" data-v="${i}" aria-pressed="${r.issue === i}">${i}</button>`).join("")}</div>
            <div class="sectionLabel">Tell us more <span class="sub">(optional)</span></div>
            <div class="field"><textarea id="rDetails" placeholder="e.g. Where is the problem and how bad is it?" aria-label="Details">${escapeHtml(r.details)}</textarea></div>
            <div class="attach">${r.photo ? `<span class="file">📎 photo_1.jpg</span><button class="linkbtn" data-a="rPhoto">Remove</button>`
                : `<button class="btn secondary small" style="width:auto" data-a="rPhoto">${icons.camera} Add a photo</button>`}</div>
            <div class="feedback warn">⚠ <span>Unsafe to drive? <button class="linkbtn" data-a="call">Call support 24/7</button></span></div>`,
        cta: `<button class="btn" data-a="submitReport" ${ready ? "" : "disabled"}>Send report</button>
                    ${ready ? "" : `<div class="hint">${!r.tripId ? "Choose a trip" : "Choose what happened"} to send</div>`}`,
    };
};

SCREENS.reportDone = function () {
    const d = state.reportDone;
    return {
        header: header({ title: "Report sent", step: "Support", back: false }),
        body: `
            <div class="success"><div class="big">${icons.check}</div>
                <h2>Thanks, we’ve got it</h2>
                <p>Report <b>#CS-${d.no}</b> · ${d.issue}${d.trip ? ` · ${d.trip}` : ""}</p>
                <p>${d.issue === "Damage or scratch" ? "The damage is now on record <b>before</b> your trip, so you won’t be charged for it." : "Our team is looking into it."} Support will message you within 15 minutes.</p>
            </div>
            <div class="list" style="margin-top:14px">
                <button class="listItem" data-a="go" data-v="chat"><span class="ico">${icons.chat}</span><span><b>Chat with support</b><small>Add more details or ask a question</small></span><span class="chev">›</span></button>
            </div>`,
        cta: `<button class="btn" data-a="tab" data-v="trips">Back to My Trips</button>`,
    };
};
