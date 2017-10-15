const fns = [];

let ready = (window.document.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(window.document.readyState);

let listener;

!ready &&
window.document.addEventListener &&
window.document.addEventListener('DOMContentLoaded', listener = function () {
    window.document.removeEventListener('DOMContentLoaded', listener);
    ready = true;
    while (listener = fns.shift()) listener();
});

export default function domReady(fn) {
    ready ? window.setTimeout(fn, 0) : fns.push(fn);
}
