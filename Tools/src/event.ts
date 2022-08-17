import {
    IAddHandler, IStopBubble, IStopDefault, IRemoveHandler, IDispatchEvent
} from "./index.js"
export const addHandler: IAddHandler = (ele, type, handler) => {
    if (ele.addEventListener) {
        ele.addEventListener(type, handler, false);
    } else {
        ele["on" + type] = handler;
    }
}

export const stopBubble: IStopBubble = (event) => {
    event = event || window.event;
    if (event.stopPropagation) {
        event.stopPropagation();
    } else {
        event.cancelBubble = false
    }
}

export const stopDefault: IStopDefault = (event) => {
    event = event || window.event;
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
}

export const removeHandler: IRemoveHandler = (ele, type, handler) => {
    if (ele.removeEventListener) {
        ele.removeEventListener(type, handler, false);
    } else {
        ele["on" + type] = null;
    }
}
export const dispatchEvent: IDispatchEvent = (ele, data) => {
    const evts = new Event(data);
    ele.dispatchEvent(evts);
}