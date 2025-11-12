class RectTool {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D | null;
    private isDrawing: boolean = false;
    private startX: number = 0;
    private startY: number = 0;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.initializeEvents();
    }

    private initializeEvents() {
        this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
        this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        this.canvas.addEventListener('mouseleave', this.onMouseLeave.bind(this));
    }

    private onMouseDown(event: MouseEvent) {
        if (!this.ctx) return;
        this.isDrawing = true;
        const { offsetX, offsetY } = event;
        this.startX = offsetX;
        this.startY = offsetY;
    }

    private onMouseMove(event: MouseEvent) {
        if (!this.isDrawing || !this.ctx) return;
        const { offsetX, offsetY } = event;
        this.clearCanvas();
        this.drawRect(this.startX, this.startY, offsetX - this.startX, offsetY - this.startY);
    }

    private onMouseUp(event: MouseEvent) {
        if (!this.isDrawing || !this.ctx) return;
        this.isDrawing = false;
        const { offsetX, offsetY } = event;
        this.drawRect(this.startX, this.startY, offsetX - this.startX, offsetY - this.startY);
    }

    private onMouseLeave() {
        this.isDrawing = false;
    }

    private clearCanvas() {
        if (!this.ctx) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private drawRect(x: number, y: number, width: number, height: number) {
        if (!this.ctx) return;
        this.ctx.beginPath();
        this.ctx.rect(x, y, width, height);
        this.ctx.fillStyle = 'rgba(255, 0, 0, 0.5)'; // Example fill color
        this.ctx.fill();
        this.ctx.strokeStyle = 'red'; // Example stroke color
        this.ctx.stroke();
    }
}

export default RectTool;