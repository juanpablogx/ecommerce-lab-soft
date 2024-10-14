const CryptoJS = require('crypto-js');

const hash = cadena => CryptoJS.SHA256(cadena).toString(CryptoJS.enc.Hex);

module.exports = {
  hash
};