import { addCssRule, throttle } from './helper'

import domready from './domready'

import sentinel from './sentinel.js'

declare global {
    interface Window { [key: string]: any; }
    interface Image extends HTMLImageElement { src: string }
}

const flag = 'rand_4958672984';

const isLoaded = (img: Image): boolean => {
    if (!img.complete) {
        return false;
    }

    if (typeof img.naturalWidth !== 'undefined' && img.naturalWidth === 0) {
        return false;
    }

    return true;
};

interface options {
    className?: string;
    replace?: boolean;
}

const inView = (el: HTMLElement): boolean => {
    let { top, right, bottom, left } = el.getBoundingClientRect();
    let w = Math.max(window.document.documentElement.clientWidth, window.innerWidth || 0);
    let h = Math.max(window.document.documentElement.clientHeight, window.innerHeight || 0);
    return !(top >= h || bottom <= 0);
};

const process = (img: Image, className: string): void => {
    let handle = (callback?: Function) => {
        let ifReplace: boolean = !!img.getAttribute('data-src');
        let url: string = img.getAttribute(ifReplace ? 'data-src' : 'src');
        let onLoaded = function () {
            img.src = url;
            ifReplace && img.removeAttribute('data-src');
            img.classList.add(`${className}-out`);
            img.classList.remove(className);
            callback && callback();
        };

        let i = new Image();
        i.src = url;
        if (isLoaded(i)) {
            onLoaded();
        } else {
            i.onload = function () {
                onLoaded();
            };
        }
    };

    let lazyAttr = img.getAttribute('data-lazy');
    if (lazyAttr === 'true') {
        if (inView(img)) {
            handle();
        } else {
            let scrollHandler = throttle(function (e: Event) {
                if (!inView(img)) return;
                handle(function () {
                    window.removeEventListener('scroll', scrollHandler, false);
                    scrollHandler = null;
                });
            }, 100);
            window.addEventListener('scroll', scrollHandler, false);
        }
    } else {
        handle();
    }
};

export const watch = (className: string): void => {
    addCssRule(
        `.${className}-out`,
        `-webkit-filter: none;-moz-filter: none;-ms-filter: none;-o-filter: none;filter: none;
        -webkit-transition: all ease .2s;-moz-transition: all ease .2s;-ms-transition: all ease .2s;-o-transition: all ease .2s;transition: all ease .2s;`
    );

    domready(function () {
        let imgs: Array<Image> = [].slice.call(window.document.querySelectorAll(`img.${className}`), 0);
        imgs.forEach(img => {
            process(img, className);
        });
    });

    sentinel.on(['.' + className], function (img: Image) {
        process(img, className);
    });
};

const detectIE = () => {
    let ua = window.navigator.userAgent;
    let msie = ua.indexOf('MSIE ');
    let trident = ua.indexOf('Trident/');
    let edge = ua.indexOf('Edge/');
    if (msie > 0) {
        if (ua.indexOf('MSIE 1') > 0) {
            // IE 10
            return 10;
        } else {
            // older
            return 9;
        }
    } else if (trident > 0) {
        // IE 11
        return 11;
    } else if (edge > 0) {
        // Edge
        return 'edge';
    } else
        // other browser
        return false;
};

const init = (): void => {
    if (window[flag]) return;
    window[flag] = true;
    
    if (detectIE() === 9) return false;

    let blurRadius: number = 15;
    let transitionDuration: number = .2;

    watch('img-blur-in');
};

init();
