document.querySelector('.button').addEventListener('click', () => {

  if (document.querySelector('.input').value.indexOf('ssr://') < 0) {
    alert('非法链接，请输入正确的SSR链接')
    return;
  }

  let html = '';
  let substr;
  let laststr
  let str = document.querySelector('.input').value.split('ssr://')[1];

  if (str.indexOf('_') > -1) {
    str = str.split('_');
    str = `${atob(str[0])}${atob(str[1])}`
  } else {
    str = atob(str)
  }

  if (str.indexOf('/?') > -1) {
    str = str.split('/?');
  } else if (str.indexOf('/') > -1) {
    str = str.split('/');
  }

  substr = str[0].split(':');
  laststr = getArgs(str[1]);

  let info = {
    ip: substr[0],
    port: substr[1],
    protocol: substr[2],
    encrypt: substr[3],
    confusion: substr[4],
    unknown: substr[5],
    obfsparam: laststr.obfsparam,
    group: laststr.group,
    protoparam: laststr.protoparam,
    password: laststr.remarks,
    udpport: laststr.udpport,
    uot: laststr.uot
  }

  for (let key in info) {
    html += `<p>${key}：${info[key]}</p>`
  }

  document.querySelector('.result').innerHTML = html;

}, false);

function getArgs(str) {
  let items = str.split('&')
  let args = {}
  let item = []
  let key = ''
  for (let i = 0; i < items.length; i++) {
    item = items[i].split('=')
    key = decodeURIComponent(item[0])
    if (key.length) {
      args[key] = decodeURIComponent(item[1])
    }
  }
  return args
}
