/* Shared header used by every screen; screens register themselves in SCREENS */
function header({title, step, progress, back:showBack = true}){
  return `<div class="brandrow"><span class="brand"><i></i>CarShare</span>
      <button class="helplink" data-a="go" data-v="help" aria-label="Help">? Help</button></div>
    <div class="titlerow">${showBack && S.stack.length > 1 ? `<button class="back" data-a="back">${I.back}Back</button>` : ''}
      <h1 class="title">${title}</h1></div>
    ${step ? `<div class="step">${step}</div>` : ''}
    ${progress ? `<div class="progress" aria-hidden="true"><span style="width:${progress * 20}%"></span></div>` : ''}`;
}


const SCREENS = {};
