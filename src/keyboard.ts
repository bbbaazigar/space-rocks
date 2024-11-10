export enum Keys {
    W     = "KeyW",
    A     = "KeyA",
    S     = "KeyS",
    D     = "KeyD",
    LEFT  = "ArrowLeft",
    RIGHT = "ArrowRight",
    UP    = "ArrowUp",
    DOWN  = "ArrowDown",
    SPACE = "Space"
}

export class Keyboard {
    private static readonly gameKeys = new Set(Object.values(Keys));
    private downKeys: Set<Keys>;

    constructor(window: Window) {
        console.log("keyboard constructor called.");
        this.downKeys = new Set();

        window.addEventListener("keydown", (e) => this.handleKeyPress(e));
        window.addEventListener("keyup", (e) => this.handleKeyPress(e));
    }

    private handleKeyPress(e: KeyboardEvent) {
        const key = e.code as Keys;

        if (!Keyboard.gameKeys.has(key)) {
            return;
        }

        e.preventDefault() //disable other functions tied to the key event.

        if (e.type === "keydown") {
            this.downKeys.add(key);
        } else if (e.type === "keyup") {
            this.downKeys.delete(key);
        }

    }

    public isKeyDown(key: Keys): boolean {
        return this.downKeys.has(key);

    }
}