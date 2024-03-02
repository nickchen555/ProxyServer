function getParam(url, param) {
    url = url.replace('&amp;', '&');
    var urls = url.split(/[&\?]/);

    for(var i = 0; i < urls.length; i++) {
        var params = urls[i].split('=');
        if (params.length == 2) {
            if (params[0] == param) {
                return params[1];
            }
        }
    }
    return "";
}


function setParam(url, param, value) {
    if(url.indexOf(param + '=') == -1) {
        url += '&';
        url += param;
        url += '=';
        url += value;
        return url;
    }
    url = url.replace('&amp;', '&');
    var urls = url.split(/[&\?]/);

    url = '';
    for(var i = 0; i < urls.length; i++) {
        var params = urls[i].split('=');

        if (params.length == 2) {
            if(!url.endsWith('?')) {
                url += '&';
            }

            if (params[0] == param) {
                url += param;
                url += '=';
                url += value;
            } else {
                url += urls[i];
            }
        } else {
            url += urls[i];
            url += '?';
        }
    }
    return url;
}

function offListener (selector) {
    if(selector!= null) {
        for(var i = 0; i < selector.length; i++) {
            var element = selector[i];
            element.outerHTML = element.outerHTML;
        }
    }
}


function offListeners (className) {
    var _listeners = [];

    EventTarget.prototype.addEventListeners = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function(type, listener) {
        if($(this).hasClass(className)) {
            _listeners.push({target: this, type: type, listener: listener});
            console.log("addEventListener: "+ type);
        }
        this.addEventListeners(type, listener);
    };

    EventTarget.prototype.removeEventListeners = function(targetType) {
        for(var i = 0; i < _listeners.length; ) {
            var item = _listeners[i];

            var target = item.target;
            var type = item.type;
            var listener = item.listener;

            if(target == this && (type == targetType || targetType == "ALL")) {
                this.removeEventListener(type, listener);
                _listeners.splice(i, 1)
                console.log("removeEventListener: "+ type);
            } else {
                i++;
            }
        }
    }
}


// @require      http://gcp.gleeze.com/ProxyServer/js/JavaScriptUtil/JavaScriptUtil.js
// @require      http://gcp.gleeze.com/ProxyServer/js/JavaScriptUtil/util/StringUtil.js
function measureWidth(text, font) {
  //let canvas = measureWidth.canvas || (measureWidth.canvas = document.createElement("canvas"));
  let canvas = document.createElement("canvas");
  let context = canvas.getContext("2d");
  context.font = font;

  //text = StringUtil.leftPad("", StringUtil.getBytesLength(text), "0");
  let metrics = context.measureText(text);
  return metrics.width;
}

function trimInt(text) {
  let num = text.replace(/[^0-9]/g, '');
  return parseInt(num);
}

function matchURL(url) {
  let isMatch = false;
  let location = window.location.href;

  if (location.startsWith(url)) {
      isMatch = true;
  } else if ($("iframe[src^='"+url+"']").length > 0) {
      isMatch = true;
  }
  return isMatch;
}

