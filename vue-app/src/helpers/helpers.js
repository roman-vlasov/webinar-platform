function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min)
  rand = Math.floor(rand)
  return rand
}

function textTimeStamp(seconds) {
  let tempSeconds = seconds
  const days = Math.floor(tempSeconds / (24 * 60 * 60))
  tempSeconds -= days * (24 * 60 * 60)
  const hours = Math.floor(tempSeconds / (60 * 60))
  tempSeconds -= hours * (60 * 60)
  const minutes = Math.floor(tempSeconds / (60))
  tempSeconds -= minutes * 60

  let resultArray = []
  if (days > 0) { resultArray.push(`${days} д`) }
  if (hours > 0) { resultArray.push(`${hours} ч`) }
  if (minutes > 0) { resultArray.push(`${minutes} мин`) }
  resultArray.push(`${tempSeconds} сек`)

  return resultArray.join(' ')
}

function nFormatter(num, digits) {
  let si = [
    { value: 1, symbol: "" },
    { value: 1E3, symbol: "k" },
    { value: 1E6, symbol: "M" },
    { value: 1E9, symbol: "G" },
    { value: 1E12, symbol: "T" },
    { value: 1E15, symbol: "P" },
    { value: 1E18, symbol: "E" }
  ];
  let rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  let i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}

function incBrightness(hex, percent) {
  if (hex == null) return null;
  // strip the leading # if it's there
  hex = hex.replace(/^\s*#|\s*$/g, '');

  // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
  if(hex.length == 3){
    hex = hex.replace(/(.)/g, '$1$1');
  }

  var r = parseInt(hex.substr(0, 2), 16),
    g = parseInt(hex.substr(2, 2), 16),
    b = parseInt(hex.substr(4, 2), 16);

  return '#' +
    ((0|(1<<8) + r + (256 - r) * percent / 100).toString(16)).substr(1) +
    ((0|(1<<8) + g + (256 - g) * percent / 100).toString(16)).substr(1) +
    ((0|(1<<8) + b + (256 - b) * percent / 100).toString(16)).substr(1);
}

export {
  randomInteger,
  textTimeStamp,
  nFormatter,
  incBrightness
}
