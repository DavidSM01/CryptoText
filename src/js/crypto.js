import aes from "crypto-js/aes.js";
import utf8 from "crypto-js/enc-utf8.js";

const CryptoJS = {
  AES: aes,
  enc: {
    Utf8: utf8,
  },
};

export function encrypt(text, password) {
  try {
    let encryptedText = CryptoJS.AES.encrypt(text, password).toString();
    return encryptedText;
  } catch (err) {
    alert(err);
  }
}

export function decrypt(encryptedText, password) {
  try {
    let decryptedText = CryptoJS.AES.decrypt(encryptedText, password).toString(
      CryptoJS.enc.Utf8,
    );
    return decryptedText;
  } catch (err) {
    alert(err);
  }
}
