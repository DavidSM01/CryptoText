import { $, eraseValue, shareText, shareFile, copy } from "./util.js";
import { showTextDiv, showFileDiv } from "./divs.js";
import { encrypt, decrypt } from "./crypto.js";

let passwordInput = $("passwordInput");
let savedPassword = localStorage.getItem("password");
if (savedPassword) {
  passwordInput.value = savedPassword;
}

passwordInput.oninput = savePassword;
$("passwordBtn").onclick = togglePassword;

textBtn.addEventListener("click", showTextDiv);
fileBtn.addEventListener("click", showFileDiv);

let textTextarea = $("textTextarea");
let resultTextarea = $("resultTextarea");

$("eraseTextBtn").onclick = () => eraseValue(textTextarea);
$("eraseResultBtn").onclick = () => eraseValue(resultTextarea);

$("copyTextBtn").onclick = () => copy(textTextarea.value);
$("copyResultBtn").onclick = () => copy(resultTextarea.value);

$("shareTextBtn").onclick = () => shareText(textTextarea.value);
$("shareResultBtn").onclick = () => shareText(resultTextarea.value);

$("encryptDecryptBtn").onclick = encryptDecryptText;

$("encryptFileBtn").onclick = encryptFile;
$("decryptFileBtn").onclick = decryptFile;

function togglePassword() {
  let eyeImg = $("eyeImg");
  let eyeOffImg = $("eyeOffImg");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    eyeImg.hidden = true;
    eyeOffImg.hidden = false;
  } else {
    passwordInput.type = "password";
    eyeOffImg.hidden = true;
    eyeImg.hidden = false;
  }

  passwordInput.focus();
}

function savePassword() {
  localStorage.setItem("password", this.value);
}

function encryptDecryptText() {
  let textData = textTextarea.value;
  let resultData = resultTextarea.value;
  let password = passwordInput.value;

  if (password) {
    if (textData && !resultData) {
      resultTextarea.value = encrypt(textData, password);
    }

    if (!textData && resultData) {
      textTextarea.value = decrypt(resultData, password);
    }
  }
}

async function encryptFile() {
  let password = passwordInput.value;
  if (password) {
    let file = (await window.webxdc.importFiles({}))[0];
    let fileName = file.name;

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      let dataUrl = event.target.result;
      let base64 = dataUrl.split(",")[1];

      let encryptedBase64 = encrypt(base64, password);
      shareFile({
        file: {
          name: fileName,
          plainText: encryptedBase64,
        },
      });
    };
  }
}

async function decryptFile() {
  let password = passwordInput.value;
  if (password) {
    let file = (await window.webxdc.importFiles({}))[0];
    let fileName = file.name;

    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (event) => {
      let encryptedBase64 = event.target.result;
      let decryptedBase64 = decrypt(encryptedBase64, password);
      shareFile({
        file: {
          name: fileName,
          base64: decryptedBase64,
        },
      });
    };
  }
}
