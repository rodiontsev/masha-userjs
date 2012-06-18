// ==UserScript==
// @name           Masha
// @version        1.1
// @namespace      http://twitter.com/rodiontsev
// @description    Mark & Share
// @author         Dmitry Rodiontsev
// @include        http://*
// @include        https://*
// @resource masha masha.js
// @resource style masha.css
// ==/UserScript==

/*
Version history:

1.0 on 24/01/2012:
    - Initial version
1.0.1 on 25/01/2012:
    - Check if Masha already exists
    - Check appropriate content type
*/

(function() {

    var log = function(msg) {
        unsafeWindow.console.log(msg);
    };

    var nodeInserted = function(event) {
        var element = event.target;
        if (element.className && element.className.match(/closewrap/) != null) {
            element.getElementsByTagName("a")[0].innerHTML = "x";
        }
    };

    if (typeof unsafeWindow.MaSha == "function") {
        log("Masha:Already exists");
        return;
    }

    var contentType = unsafeWindow.document.contentType;
    if (contentType != "text/html") {
        log("Masha:Inappropriate content type: " + contentType);
        return;
    }

    log("Masha:Init");

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.innerHTML = GM_getResourceText("masha");
    unsafeWindow.document.getElementsByTagName("head")[0].appendChild(script);

    var marker = document.createElement("a");
    marker.setAttribute("id", "txt_select_marker");
    marker.setAttribute("href", "#");
    marker.innerHTML = "M";
    unsafeWindow.document.body.appendChild(marker);

    var wait = function() {
        if(typeof unsafeWindow.MaSha == "undefined") {
            window.setTimeout(wait, 100);
        } else {
            log("Masha:Ready");

            var style = GM_getResourceText("style");
            GM_addStyle(style);

            document.addEventListener("DOMNodeInserted", function(event) {nodeInserted(event);}, true);

            var options = "selectable:document.body,marker:'txt_select_marker'";
            location.href = "javascript:void(MaSha.instance = new MaSha({" + options + "}));";
        }
    };

    wait();

})();
