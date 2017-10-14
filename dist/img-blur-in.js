var ImgBlurIn = (function (exports) {
'use strict';

var addCssRule = function (selector, style) {
    var styleTag = window.document.getElementsByTagName('style')[0];
    if (!styleTag) {
        styleTag = window.document.createElement('style');
        styleTag.setAttribute('type', 'text/css');
        window.document.getElementsByTagName('head')[0].appendChild(styleTag);
    }
    styleTag.appendChild(window.document.createTextNode(selector + "{" + style + "}"));
};
var kvs2str = function (obj) {
    if (obj === void 0) { obj = {}; }
    var pairs = [];
    for (var key in obj) {
        if (!obj.hasOwnProperty(key))
            continue;
        pairs.push(key + ":" + obj[key]);
    }
    return pairs.join(';');
};

var flag = 'rand_4958672984';
var init = function () {
    if (window[flag])
        return;
    window[flag] = true;
    var blurRadius = 15;
    var transitionDuration = .2;
    addCssRule('.img-blur-in', kvs2str({
        '-webkit-filter': "blur(" + blurRadius + "px)",
        '-moz-filter': "blur(" + blurRadius + "px)",
        '-ms-filter': "blur(" + blurRadius + "px)",
        '-o-filter': "blur(" + blurRadius + "px)",
        'filter': "blur(" + blurRadius + "px)",
        '-webkit-transition': "all ease " + transitionDuration + "s",
        '-moz-transition': "all ease " + transitionDuration + "s",
        '-ms-transition': "all ease " + transitionDuration + "s",
        '-o-transition': "all ease " + transitionDuration + "s",
        'transition': "all ease " + transitionDuration + "s"
    }));
};
init();

exports.init = init;

return exports;

}({}));
//# sourceMappingURL=img-blur-in.js.map
