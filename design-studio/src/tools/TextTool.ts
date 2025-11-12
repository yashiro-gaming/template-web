export class TextTool {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private text: string;
    private fontSize: number;
    private fontFamily: string;
    private color: string;
    private isEditing: boolean;
    private position: { x: number; y: number };

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d')!;
        this.text = 'Edit me!';
        this.fontSize = 20;
        this.fontFamily = 'Arial';
        this.color = '#000000';
        this.isEditing = false;
        this.position = { x: 50, y: 50 };

        this.setupEventListeners();
    }

    private setupEventListeners() {
        this.canvas.addEventListener('dblclick', (event) => this.startEditing(event));
        this.canvas.addEventListener('mousedown', (event) => this.selectText(event));
    }

    private startEditing(event: MouseEvent) {
        const { offsetX, offsetY } = event;
        if (this.isTextClicked(offsetX, offsetY)) {
            this.isEditing = true;
            const input = document.createElement('input');
            input.type = 'text';
            input.value = this.text;
            input.style.position = 'absolute';
            input.style.left = `${this.position.x}px`;
            input.style.top = `${this.position.y}px`;
            input.style.fontSize = `${this.fontSize}px`;
            input.style.fontFamily = this.fontFamily;
            input.style.color = this.color;

            input.addEventListener('blur', () => {
                this.text = input.value;
                this.isEditing = false;
                input.remove();
                this.drawText();
            });

            document.body.appendChild(input);
            input.focus();
        }
    }

    private selectText(event: MouseEvent) {
        const { offsetX, offsetY } = event;
        if (this.isTextClicked(offsetX, offsetY)) {
            this.startEditing(event);
        }
    }

    private isTextClicked(x: number, y: number): boolean {
        const metrics = this.context.measureText(this.text);
        return (
            x >= this.position.x &&
            x <= this.position.x + metrics.width &&
            y >= this.position.y - this.fontSize &&
            y <= this.position.y
        );
    }

    public drawText() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.font = `${this.fontSize}px ${this.fontFamily}`;
        this.context.fillStyle = this.color;
        this.context.fillText(this.text, this.position.x, this.position.y);
    }

    public setText(newText: string) {
        this.text = newText;
        this.drawText();
    }

    public setFontSize(size: number) {
        this.fontSize = size;
        this.drawText();
    }

    public setFontFamily(family: string) {
        this.fontFamily = family;
        this.drawText();
    }

    public setColor(newColor: string) {
        this.color = newColor;
        this.drawText();
    }

    public setPosition(x: number, y: number) {
        this.position = { x, y };
        this.drawText();
    }
}