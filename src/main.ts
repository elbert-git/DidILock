import './style.css'
import { InitiailiseRive, SetRiveLock } from './rive'


// props and states
const constants = {
    localStorageKey: "didILock",
}
let locked = false;


// main functions
function onInitialLoad() {
    // init rive
    InitiailiseRive(
        document.getElementById("canvas") as HTMLCanvasElement,
        document.querySelector(".canvasWrapper") as HTMLElement
    )
    // load prev data
}
function setLockTrue() {
    // set vars
    locked = true
    // log the time
    // toggle graphics
    SetRiveLock(true)
    // todo css backgrounds
    // update ui text
}
function setLockFalse() {
    // set vars
    locked = false
    // log the time
    // toggle graphics
    SetRiveLock(false)
    // todo css backgrounds
    // update ui text
}

onInitialLoad()


// event callbacks
document.getElementById("canvas")?.addEventListener("click", () => {
    if (locked) {
        setLockFalse()
    } else {
        setLockTrue()
    }
})