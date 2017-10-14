export const addCssRule = (selector: string, style: string): void => {
    let styleTag = window.document.getElementsByTagName('style')[0];
    if (!styleTag) {
        styleTag = window.document.createElement('style');
        styleTag.setAttribute('type', 'text/css');
        window.document.getElementsByTagName('head')[0].appendChild(styleTag);
    }
    styleTag.appendChild(window.document.createTextNode(`${selector}{${style}}`));
}

export const kvs2str = function (obj: {
    [key: string]: string
} = {}): string {
    let pairs: string[] = [];
    for (let key in obj) {
        if (!obj.hasOwnProperty(key)) continue;
        pairs.push(`${key}:${obj[key]}`);
    }
    return pairs.join(';');
}