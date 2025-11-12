// src/utils/dom.ts

export function createElement(tag: string, className?: string, attributes?: Record<string, string>): HTMLElement {
    const element = document.createElement(tag);
    if (className) {
        element.className = className;
    }
    if (attributes) {
        Object.keys(attributes).forEach(key => {
            element.setAttribute(key, attributes[key]);
        });
    }
    return element;
}

export function appendChild(parent: HTMLElement, child: HTMLElement): void {
    parent.appendChild(child);
}

export function removeChild(parent: HTMLElement, child: HTMLElement): void {
    parent.removeChild(child);
}

export function addEventListener(element: HTMLElement, event: string, handler: EventListener): void {
    element.addEventListener(event, handler);
}

export function removeEventListener(element: HTMLElement, event: string, handler: EventListener): void {
    element.removeEventListener(event, handler);
}

export function setStyle(element: HTMLElement, styles: Record<string, string>): void {
    Object.keys(styles).forEach(key => {
        element.style[key as any] = styles[key];
    });
}

export function getBoundingClientRect(element: HTMLElement): DOMRect {
    return element.getBoundingClientRect();
}

export function clearElement(element: HTMLElement): void {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}