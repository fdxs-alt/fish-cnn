"use strict";
const fileInput = document.querySelector(".file-input");
const btn = document.querySelector(".file-button");
btn.addEventListener("click", () => {
    fileInput.click();
});
const images = new Proxy([], {
    get: (target, _p) => {
        const p = Number(_p);
        return target[p];
    },
    set: (target, _p, value) => {
        const p = Number(_p);
        target[p] = value;
        return true;
    },
});
fileInput.addEventListener("change", (_e) => {
    var _a;
    const target = _e.target;
    const file = (_a = target.files) === null || _a === void 0 ? void 0 : _a[0];
    if (file) {
        console.log(file);
        images.push(file);
    }
});
