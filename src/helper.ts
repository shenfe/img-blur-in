export const addCssRule = (selector: string, style: string): void => {
    let head = window.document.head || window.document.getElementsByTagName('head')[0];
    let styleEl: HTMLStyleElement = head.getElementsByTagName('style')[0];
    if (!styleEl) {
        styleEl = window.document.createElement('style');
        head.insertBefore(styleEl, head.firstChild);
    }
    let styleSheet: CSSStyleSheet = <CSSStyleSheet>styleEl.sheet || styleEl.styleSheet;
    let cssRules = styleSheet.cssRules || styleSheet.rules;
    if (styleSheet.insertRule) {
        styleSheet.insertRule(`${selector}{${style}}`, cssRules.length);
    } else if (styleSheet.addRule) {
        styleSheet.addRule(selector, style);
    }
}

export const kvs2str = (obj: {
    [key: string]: string
} = {}): string => {
    let pairs: string[] = [];
    for (let key in obj) {
        if (!obj.hasOwnProperty(key)) continue;
        pairs.push(`${key}:${obj[key]}`);
    }
    return pairs.join(';');
}

/**
 * throttle节流函数
 * @refer https://stackoverflow.com/a/27078401
 */
export const throttle = function (func: Function, wait: number, options: {
    leading?: boolean,
    trailing?: boolean
} = {}) {
    let context: any, args: IArguments, result: any;
    let timeout: number = 0;
    let previous = 0;
    let later = function () {
        previous = options.leading === false ? 0 : Date.now();
        timeout = 0;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
    };
    return function () {
        var now = Date.now();
        if (!previous && options.leading === false) previous = now;
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
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
}