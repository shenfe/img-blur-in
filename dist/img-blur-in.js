(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.ImgBlurIn = {})));
}(this, (function (exports) { 'use strict';

var addCssRule = function (selector, style) {
    var styleEl = window.document.head.getElementsByTagName('style')[0];
    if (!styleEl) {
        styleEl = window.document.createElement('style');
        window.document.head.insertBefore(styleEl, window.document.head.firstChild);
    }
    var styleSheet = styleEl.sheet;
    var cssRules = styleSheet.cssRules || styleSheet.rules;
    styleSheet.insertRule(selector + "{" + style + "}", cssRules.length);
};

var throttle = function (func, wait, options) {
    if (options === void 0) { options = {}; }
    var context, args, result;
    var timeout = 0;
    var previous = 0;
    var later = function () {
        previous = options.leading === false ? 0 : Date.now();
        timeout = 0;
        result = func.apply(context, args);
        if (!timeout)
            context = args = null;
    };
    return function () {
        var now = Date.now();
        if (!previous && options.leading === false)
            previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = 0;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout)
                context = args = null;
        }
        else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
};

var fns = [];

var ready = (window.document.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(window.document.readyState);

var _listener = void 0;

!ready && window.document.addEventListener && window.document.addEventListener('DOMContentLoaded', _listener = function listener() {
    window.document.removeEventListener('DOMContentLoaded', _listener);
    ready = true;
    while (_listener = fns.shift()) {
        _listener();
    }
});

function domReady(fn) {
    ready ? window.setTimeout(fn, 0) : fns.push(fn);
}

var isArray = Array.isArray;
var selectorToAnimationMap = {};
var animationCallbacks = {};
var styleEl = void 0;
var styleSheet = void 0;
var cssRules = void 0;

var sentinel = {
    /**
     * Add watcher.
     * @param {array} cssSelectors - List of CSS selector strings
     * @param {Function} callback - The callback function
     */
    on: function on(cssSelectors, callback) {
        if (!callback) return;

        // initialize animationstart event listener
        if (!styleEl) {
            var doc = document,
                head = doc.head;

            // add animationstart event listener
            doc.addEventListener('animationstart', function (ev, callbacks, l, i) {
                callbacks = animationCallbacks[ev.animationName];

                // exit if callbacks haven't been registered
                if (!callbacks) return;

                // stop other callbacks from firing
                ev.stopImmediatePropagation();

                // iterate through callbacks
                l = callbacks.length;
                for (i = 0; i < l; i++) {
                    callbacks[i](ev.target);
                }
            }, true);

            // add stylesheet to document
            styleEl = doc.createElement('style');
            head.insertBefore(styleEl, head.firstChild);
            styleSheet = styleEl.sheet;
            cssRules = styleSheet.cssRules;
        }

        // listify argument and add css rules/ cache callbacks
        (isArray(cssSelectors) ? cssSelectors : [cssSelectors]).map(function (selector, animId, isCustomName) {
            animId = selectorToAnimationMap[selector];

            if (!animId) {
                isCustomName = selector[0] == '!';

                // define animation name and add to map
                selectorToAnimationMap[selector] = animId = isCustomName ? selector.slice(1) : 'sentinel-' + Math.random().toString(16).slice(2);

                // add keyframe rule
                cssRules[styleSheet.insertRule('@keyframes ' + animId + '{from{transform:none;}to{transform:none;}}', cssRules.length)]._id = selector;

                // add selector animation rule
                if (!isCustomName) {
                    cssRules[styleSheet.insertRule(selector + '{animation-duration:0.0001s;animation-name:' + animId + ';}', cssRules.length)]._id = selector;
                }

                // add to map
                selectorToAnimationMap[selector] = animId;
            }

            // add to callbacks
            (animationCallbacks[animId] = animationCallbacks[animId] || []).push(callback);
        });
    },
    /**
     * Remove watcher.
     * @param {array} cssSelectors - List of CSS selector strings
     * @param {Function} callback - The callback function (optional)
     */
    off: function off(cssSelectors, callback) {
        // listify argument and iterate through rules
        (isArray(cssSelectors) ? cssSelectors : [cssSelectors]).map(function (selector, animId, callbackList, i) {
            // get animId
            if (!(animId = selectorToAnimationMap[selector])) return;

            // get callbacks
            callbackList = animationCallbacks[animId];

            // remove callback from list
            if (callback) {
                i = callbackList.length;

                while (i--) {
                    if (callbackList[i] === callback) callbackList.splice(i, 1);
                }
            } else {
                callbackList = [];
            }

            // exit if callbacks still exist
            if (callbackList.length) return;

            // clear cache and remove css rules
            i = cssRules.length;

            while (i--) {
                if (cssRules[i]._id == selector) styleSheet.deleteRule(i);
            }

            delete selectorToAnimationMap[selector];
            delete animationCallbacks[animId];
        });
    },
    /**
     * Reset watchers and cache
     */
    reset: function reset() {
        selectorToAnimationMap = {};
        animationCallbacks = {};
        if (styleEl) styleEl.parentNode.removeChild(styleEl);
        styleEl = 0;
    }
};

var flag = 'rand_4958672984';
var isLoaded = function (img) {
    if (!img.complete) {
        return false;
    }
    if (typeof img.naturalWidth !== 'undefined' && img.naturalWidth === 0) {
        return false;
    }
    return true;
};
var inView = function (el) {
    var _a = el.getBoundingClientRect(), top = _a.top, right = _a.right, bottom = _a.bottom;
    var h = Math.max(window.document.documentElement.clientHeight, window.innerHeight || 0);
    return !(top >= h || bottom <= 0);
};
var process = function (img, className) {
    var handle = function () {
        var ifReplace = !!img.getAttribute('data-src');
        var url = img.getAttribute(ifReplace ? 'data-src' : 'src');
        var onLoaded = function () {
            img.src = url;
            ifReplace && img.removeAttribute('data-src');
            addCssRule("." + className + "-out", "-webkit-filter: none;-moz-filter: none;-ms-filter: none;-o-filter: none;filter: none;\n                -webkit-transition: all ease .2s;-moz-transition: all ease .2s;-ms-transition: all ease .2s;-o-transition: all ease .2s;transition: all ease .2s;");
            img.classList.add(className + "-out");
            img.classList.remove(className);
        };
        var i = new Image();
        i.src = url;
        if (isLoaded(i)) {
            onLoaded();
        }
        else {
            i.onload = function () {
                onLoaded();
            };
        }
    };
    var lazyAttr = img.getAttribute('data-lazy');
    if (lazyAttr === 'true') {
        if (inView(img)) {
            handle();
        }
        else {
            window.addEventListener('scroll', throttle(function (e) {
                if (!inView(img))
                    return;
                handle();
            }, 100), false);
        }
    }
    else {
        handle();
    }
};
var watch = function (className) {
    domReady(function () {
        var imgs = [].slice.call(window.document.querySelectorAll("img." + className), 0);
        imgs.forEach(function (img) {
            process(img, className);
        });
    });
    sentinel.on(['.' + className], function (img) {
        process(img, className);
    });
};
var init = function () {
    if (window[flag])
        return;
    window[flag] = true;
    watch('img-blur-in');
};
init();

exports.watch = watch;

Object.defineProperty(exports, '__esModule', { value: true });

})));
