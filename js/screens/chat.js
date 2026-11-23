/* Project: CarShare high-fidelity prototype (ITEC3230GROUPA)
Description: Screen: Chat with support */

SCREENS.chat = function () {
    return {
        header: header({ title: "Chat with support", step: "Usually replies in under 2 minutes" }),
        body: `<div class="chat" id="chatList">${state.chat.map((m) => `<div class="msg ${m.me ? "me" : "them"} ${m.typing ? "typing" : ""}">${escapeHtml(m.text)}</div>`).join("")}</div>`,
        cta: `<form class="composer" data-f="chat"><input id="chatInput" placeholder="Type a message" autocomplete="off" aria-label="Message"><button type="submit">Send</button></form>`,
    };
};
