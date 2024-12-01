import * as rive from "@rive-app/canvas";

let lockBool: rive.StateMachineInput | undefined = undefined

export function InitiailiseRive(canvas: HTMLCanvasElement, parent: HTMLElement) {

    // create on resize
    function onResize() {
        // const parentWidth = parent.clientWidth
        // const parentHeight = parent.clientHeight
        // const sizeMultiplier = 3
        // const size = (parent.clientHeight * sizeMultiplier) / 2
        const size = 450 / 2
        // set canvas size
        canvas.height = size
        canvas.width = size
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
            // resize the canvas on start
            onResize()
            // get state machinse inputs
            const stateMachinesInputs = r.stateMachineInputs('states');
            // get lock input
            lockBool = stateMachinesInputs.find(i => i.name === 'lock');
        },
    });

    onResize()

    // listen to futuer rive events
    window.addEventListener("resize", () => {
        onResize()
    });
}

export function SetRiveLock(b: boolean) {
    lockBool!.value = b
}


