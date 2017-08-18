// 目前只能发get请求，并且不能传参数
function send(method, url, param) {
  return new Promise(function(resolve, reject) {
    let client = new XMLHttpRequest();
    client.onreadystatechange = function() {
      if (client.readyState == 4 && client.status == 200) {
        let contentType = client.getResponseHeader("Content-Type");
        let data = client.responseText;
        if (contentType.startsWith('application/json')) {
          data = JSON.parse(data);
        }
        resolve(data);
      }
    };
    client.open(method, url, true);
    client.send();
  });
}

export default {
  send,
  get: function(url) {
    return send("GET", url);
  }
};