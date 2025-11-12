class Exporter {
    private canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
    }

    public exportAsImage(format: 'png' | 'jpeg' = 'png', quality: number = 1): string {
        const dataUrl = this.canvas.toDataURL(`image/${format}`, quality);
        this.download(dataUrl, `design.${format}`);
        return dataUrl;
    }

    public exportAsJSON(nodes: any[]): string {
        const jsonData = JSON.stringify(nodes, null, 2);
        this.downloadURL(jsonData, 'design.json');
        return jsonData;
    }

    private download(dataUrl: string, filename: string): void {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    private downloadURL(data: string, filename: string): void {
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
}

export default Exporter;