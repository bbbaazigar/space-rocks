const CANVAS_ID = "gameCanvas";
const canvas = document.getElementById(CANVAS_ID) as HTMLCanvasElement;
if (!canvas) {
    throw new Error(`Could not load canvas ${CANVAS_ID}`);
}
const ctx = canvas.getContext("2d")!; //! forces it to be non-null. null check doesn't work for some reason. 

const HEIGHT = canvas.height;
const WIDTH = canvas.width;

export { ctx, HEIGHT, WIDTH }