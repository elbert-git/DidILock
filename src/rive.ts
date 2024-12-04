import * as rive from "@rive-app/canvas";
import onInitialLoad from "./main";

let lockBool: rive.StateMachineInput | undefined = undefined;

export function InitiailiseRive(canvas: HTMLCanvasElement) {
    // create on resize
    function onResize() {
        // const parentWidth = parent.clientWidth
        // const parentHeight = parent.clientHeight
        // const sizeMultiplier = 3
        // const size = (parent.clientHeight * sizeMultiplier) / 2
        const size = 450 / 2;
        // set canvas size
        canvas.height = size;
        canvas.width = size;
        r.resizeDrawingSurfaceToCanvas();
    }

    // init the rive object
    const r = new rive.Rive({
        src: "lock.riv",
        // OR the path to a discoverable and public Rive asset
        // src: '/public/example.riv',
        canvas: canvas,
        autoplay: true,
        // artboard: "Arboard", // Optional. If not supplied the default is selected
        stateMachines: "states",
        onLoad: () => {
            console.log("loaded");
            // resize the canvas on start
            onResize();
            // get state machinse inputs
            const stateMachinesInputs = r.stateMachineInputs("states");
            // get lock input
            lockBool = stateMachinesInputs.find((i) => i.name === "lock");
            //! note lol this is a bit backwards but you start rive first then... you start your logic
            //execute start up
            onInitialLoad();
        },
    });

    onResize();

    // listen to futuer rive events
    window.addEventListener("resize", () => {
        onResize();
    });

    //  this is dumb but it will work to automatically resize
    setInterval(() => {
        onResize()
    }, 1000)
}

export function SetRiveLock(b: boolean) {
    lockBool!.value = b;
}
