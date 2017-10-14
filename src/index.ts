import { addCssRule, kvs2str } from './helper'

declare global {
    interface Window { [key: string]: any; }
}

const flag = 'rand_4958672984';

export const init = (): void => {
    if (window[flag]) return;
    window[flag] = true;

    let blurRadius: number = 15;
    let transitionDuration: number = .2;

    addCssRule('.img-blur-in', kvs2str({
        '-webkit-filter': `blur(${blurRadius}px)`,
        '-moz-filter': `blur(${blurRadius}px)`,
        '-ms-filter': `blur(${blurRadius}px)`,
        '-o-filter': `blur(${blurRadius}px)`,
        'filter': `blur(${blurRadius}px)`,
        '-webkit-transition': `all ease ${transitionDuration}s`,
        '-moz-transition': `all ease ${transitionDuration}s`,
        '-ms-transition': `all ease ${transitionDuration}s`,
        '-o-transition': `all ease ${transitionDuration}s`,
        'transition': `all ease ${transitionDuration}s`
    }));
}

init();