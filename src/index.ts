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
    let handle = () => {
        let ifReplace: boolean = !!img.getAttribute('data-src');
        let url: string = img.getAttribute(ifReplace ? 'data-src' : 'src');
        let onLoaded = function () {
            img.src = url;
            ifReplace && img.removeAttribute('data-src');
            addCssRule(
                `.${className}-out`, 
                `-webkit-filter: blur(0);-moz-filter: blur(0);-ms-filter: blur(0);-o-filter: blur(0);filter: blur(0);
                -webkit-transition: all ease .4s;-moz-transition: all ease .4s;-ms-transition: all ease .4s;-o-transition: all ease .4s;transition: all ease .4s;`
            );
            img.classList.add(`${className}-out`);
            img.classList.remove(className);
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
            window.addEventListener('scroll', throttle(function (e: Event) {
                if (!inView(img)) return;
                handle();
            }, 100), false);
        }
    } else {
        handle();
    }
};

export const watch = (className: string): void => {
    domready(function () {
        let imgs: Array<Image> = [].slice.call(window.document.querySelectorAll(`img.${className}`), 0);
        imgs.forEach(img => {
            process(img, className);
        });
    });

    sentinel.on(['.' + className], function (img: Image) {
        console.log('sentinel');
        process(img, className);
    });
};

const init = (): void => {
    if (window[flag]) return;
    window[flag] = true;

    let blurRadius: number = 15;
    let transitionDuration: number = .2;

    watch('img-blur-in');
};

init();
