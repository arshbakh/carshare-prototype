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


const SCREENS = {};
