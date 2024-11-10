export var Keys;
(function (Keys) {
    Keys["W"] = "KeyW";
    Keys["A"] = "KeyA";
    Keys["S"] = "KeyS";
    Keys["D"] = "KeyD";
    Keys["LEFT"] = "ArrowLeft";
    Keys["RIGHT"] = "ArrowRight";
    Keys["UP"] = "ArrowUp";
    Keys["DOWN"] = "ArrowDown";
    Keys["SPACE"] = "Space";
})(Keys || (Keys = {}));
export class Keyboard {
    constructor(window) {
        console.log("keyboard constructor called.");
        this.downKeys = new Set();
        window.addEventListener("keydown", (e) => this.handleKeyPress(e));
        window.addEventListener("keyup", (e) => this.handleKeyPress(e));
    }
    handleKeyPress(e) {
        const key = e.code;
        if (!Keyboard.gameKeys.has(key)) {
            return;
        }
        e.preventDefault(); //disable other functions tied to the key event.
        if (e.type === "keydown") {
            this.downKeys.add(key);
        }
        else if (e.type === "keyup") {
            this.downKeys.delete(key);
        }
    }
    isKeyDown(key) {
        return this.downKeys.has(key);
    }
}
Keyboard.gameKeys = new Set(Object.values(Keys));
//# sourceMappingURL=keyboard.js.map