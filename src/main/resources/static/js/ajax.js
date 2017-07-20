(function() {
  "use strict";

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

  var ajax = {
    send,
    get: function(url) {
      return send("GET", url);
    }
  };
  if (typeof module !== 'undefined' && typeof exports === 'object') {
    module.exports = ajax;
  } else if (typeof define === 'function' && (define.amd || define.cmd)) {
    define(function() {
      return ajax;
    });
  } else {
    this.ajax = ajax;
  }
}).call(typeof window !== 'undefined' ? window : global);