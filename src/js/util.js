export let $ = (id) => document.getElementById(id);

export let eraseValue = (elem) => (elem.value = "");

export function shareText(text) {
  if (text) window.webxdc.sendToChat({ text: text });
}

export function shareFile(file) {
  try {
    window.webxdc.sendToChat(file);
  } catch (err) {
    alert(err)
  }
}

export function copy(text) {
  if (text) {
    let temp = document.createElement("textarea");
    temp.innerText = text;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    document.body.removeChild(temp);
  }
}
