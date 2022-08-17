import { ICreateElement } from "./index.js"
export const createElement: ICreateElement = ({ ele, style, attr, parent }) => {
    const element = ele instanceof HTMLElement ? ele : document.createElement(ele ?? 'div');
    style && Object.keys(style)?.forEach(key => element.style[key] = style[key])
    attr && Object.keys(style)?.forEach(key => element[key] = attr[key])
    parent && parent.appendChild(element);
    return element;
};