// ==UserScript==
// @name           Masha
// @version        1.0
// @namespace      http://twitter.com/dimarad
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

    log("Masha:init");

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
            log("Masha:ready");

            var style = GM_getResourceText("style");
            GM_addStyle(style);

            document.addEventListener("DOMNodeInserted", function(event) {nodeInserted(event);}, true);

            var options = "selectable:document.body,marker:'txt_select_marker'";
            location.href = "javascript:void(MaSha.instance = new MaSha({" + options + "}));";
        }
    };

    wait();

})();
