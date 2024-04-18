import { $ } from "./util.js";

let textBtn = $("textBtn");
let fileBtn = $("fileBtn");

export function showTextDiv() {
  fileDiv.hidden = true;
  textDiv.hidden = false;
  fileBtn.classList.replace("active", "no-active")
  textBtn.classList.replace("no-active", "active");
}

export function showFileDiv() {
  textDiv.hidden = true;
  fileDiv.hidden = false;
  textBtn.classList.replace("active", "no-active");
  fileBtn.classList.replace("no-active", "active");
}
