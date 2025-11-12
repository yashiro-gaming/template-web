export class EllipseTool {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D | null;
    private isDrawing: boolean;
    private startX: number;
    private startY: number;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.isDrawing = false;
        this.startX = 0;
        this.startY = 0;

        this.initializeEvents();
    }

    private initializeEvents() {
        this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
        this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        this.canvas.addEventListener('mouseout', this.onMouseOut.bind(this));
    }

    private onMouseDown(event: MouseEvent) {
        this.isDrawing = true;
        const { offsetX, offsetY } = event;
        this.startX = offsetX;
        this.startY = offsetY;
    }

    private onMouseMove(event: MouseEvent) {
        if (!this.isDrawing || !this.ctx) return;

        const { offsetX, offsetY } = event;
        const radiusX = Math.abs(offsetX - this.startX) / 2;
        const radiusY = Math.abs(offsetY - this.startY) / 2;
        const centerX = (offsetX + this.startX) / 2;
        const centerY = (offsetY + this.startY) / 2;

        this.clearCanvas();
        this.drawEllipse(centerX, centerY, radiusX, radiusY);
    }

    private onMouseUp() {
        this.isDrawing = false;
        this.ctx?.beginPath(); // Reset the path
    }

    private onMouseOut() {
        this.isDrawing = false;
        this.ctx?.beginPath(); // Reset the path
    }

    private clearCanvas() {
        if (!this.ctx) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private drawEllipse(centerX: number, centerY: number, radiusX: number, radiusY: number) {
        if (!this.ctx) return;

        this.ctx.beginPath();
        this.ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
        this.ctx.fillStyle = 'rgba(255, 0, 0, 0.5)'; // Example fill color
        this.ctx.fill();
        this.ctx.strokeStyle = 'red'; // Example stroke color
        this.ctx.stroke();
    }
}