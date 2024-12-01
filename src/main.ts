import "./style.css";
import { InitiailiseRive, SetRiveLock } from "./rive";

//intefaces
interface UserData {
  lastLocked: number;
  locked: boolean;
}

// props and states
const constants = {
  localStorageKey: "didILock",
  durationToUnlock: 1000 * 60 * 20, // 1s * 60 & 20 (20 mins)
  greenColor: "72FFC2",
  redColor: "FF7E7E",
};
let locked = false;

// init rive first
InitiailiseRive(
  document.getElementById("canvas") as HTMLCanvasElement,
  document.querySelector(".canvasWrapper") as HTMLElement
);

// main functions
let userData: UserData | null = null;
function onInitialLoad() {
  // this is the main start function

  // load prev data
  const data = loadData();
  // create default data if not there
  if (data === null) {
    const data: UserData = { lastLocked: 0, locked: false };
    saveData(data);
    userData = data;
  } else {
    // load the data if not null
    userData = loadData();
  }

  // check if elapsed time has caused the chain to lock
  const duration = Date.now() - userData!.lastLocked;
  if (duration > constants.durationToUnlock) {
    setLockFalse();
  } else {
    setLockTrue();
  }
}
function setLockTrue() {
  // set vars
  locked = true;
  userData!.locked = true;
  // log the time
  userData!.lastLocked = Date.now();
  // save data
  saveData(userData!);
  // toggle graphics
  SetRiveLock(true);
  // css backgrounds
  document.body.setAttribute(
    "style",
    `background-color:#${constants.greenColor}`
  );
  // update ui text
  document.getElementById("answer")!.innerHTML = "YES!";
  updateDurationUI();
}
function setLockFalse() {
  // set vars
  locked = false;
  userData!.locked = false;
  // save data
  saveData(userData!);
  // toggle graphics
  SetRiveLock(false);
  // css backgrounds
  document.body.setAttribute(
    "style",
    `background-color:#${constants.redColor}`
  );
  // update ui text
  document.getElementById("answer")!.innerHTML = "NO!";
  updateDurationUI();
}
function saveData(data: UserData) {
  localStorage.setItem(constants.localStorageKey, JSON.stringify(data));
}
function loadData() {
  return JSON.parse(
    localStorage.getItem(constants.localStorageKey)!
  ) as UserData | null;
}
function updateDurationUI() {
  // get minutes
  const duration = Date.now() - userData!.lastLocked;
  let durationInMinutes = Math.round(duration / 1000 / 60);
  // clamp duration
  if (durationInMinutes > constants.durationToUnlock) {
    durationInMinutes = Math.round((constants.durationToUnlock * 1000) / 60);
  }
  if (durationInMinutes < 1) {
    durationInMinutes = 1;
  }
  // update ui
  document.getElementById(
    "durationLabel"
  )!.innerHTML = `Last locked about ${durationInMinutes} minute(s) ago`;
}

// event callbacks
document.getElementById("canvas")?.addEventListener("click", () => {
  if (locked) {
    setLockFalse();
  } else {
    setLockTrue();
  }
});

//! note lol this is a bit backwards but you start rive first then... you start your logic
export default onInitialLoad;
