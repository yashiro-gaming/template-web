// This file contains utility functions for exporting the canvas content, such as converting it to an image or JSON format.

import html2canvas from 'html2canvas';

export class Exporter {
    private canvasElement: HTMLElement;

    constructor(canvasElement: HTMLElement) {
        this.canvasElement = canvasElement;
    }

    public async exportAsImage(): Promise<void> {
        const canvas = await html2canvas(this.canvasElement, { backgroundColor: null });
        const imageURL = canvas.toDataURL('image/png');
        this.downloadImage(imageURL, 'design.png');
    }

    public exportAsJSON(nodes: any[]): void {
        const data = nodes.map(node => ({
            id: node.id,
            type: node.type,
            left: node.el.style.left,
            top: node.el.style.top,
            width: node.el.style.width,
            height: node.el.style.height,
            zIndex: node.el.style.zIndex,
            background: node.el.style.background,
            borderColor: node.el.style.borderColor,
            borderWidth: node.el.style.borderWidth,
            text: node.el.querySelector('.content')?.innerText || '',
            imageSrc: node.el.querySelector('img')?.src || ''
        }));
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        this.downloadImage(url, 'design.json');
        URL.revokeObjectURL(url);
    }

    private downloadImage(url: string, filename: string): void {
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}