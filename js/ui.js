/* Project: CarShare high-fidelity prototype (ITEC3230GROUPA)
Description: The header that every screen uses (title, back button, step and progress bar) */

function header({title, step, progress, back: showBack = true}) {
    return `<div class="brandrow"><span class="brand"><i></i>CarShare</span>
            <button class="helplink" data-a="go" data-v="help" aria-label="Help">? Help</button></div>
        <div class="titlerow">${showBack && state.stack.length > 1 ? `<button class="back" data-a="back">${icons.back}Back</button>` : ""}
            <h1 class="title">${title}</h1></div>
        ${step ? `<div class="step">${step}</div>` : ""}
        ${progress ? `<div class="progress" aria-hidden="true"><span style="width:${progress * 20}%"></span></div>` : ""}`;
}


// our own dropdown (drawn inside the phone so it shows on Zoom and in recordings)
// options: [{ value, label }]
function dropdown(id, label, options, value) {
    const open = state.openDropdown === id;
    const current = options.find((o) => String(o.value) === String(value));

    const list = options.map((o) => {
        const selected = String(o.value) === String(value);
        return `<button type="button" class="dropdownOption ${selected ? "selected" : ""}" role="option" aria-selected="${selected}"
            data-a="pickOption" data-v="${id}|${o.value}"><span class="tick">${selected ? "✓" : ""}</span>${o.label}</button>`;
    }).join("");

    return `<div class="field dropdown">
            <label id="${id}Label">${label}</label>
            <button type="button" class="dropdownBtn ${open ? "open" : ""}" id="${id}" data-a="openDropdown" data-v="${id}"
                aria-haspopup="listbox" aria-expanded="${open}" aria-labelledby="${id}Label ${id}">
                <span>${current ? current.label : "Choose"}</span>${icons.chevron}
            </button>
            ${open ? `<div class="dropdownMenu" role="listbox">${list}</div>` : ""}
        </div>`;
}

function dateOptions() {
    return DATES.map((d) => ({ value: d.iso, label: d.label + ", 2026" }));
}

function hourOptions(from, to) {
    return range(from, to).map((h) => ({ value: h, label: formatHour(h) }));
}

const SCREENS = {};
