export class ImageTool {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private fileInput: HTMLInputElement;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d')!;
        this.fileInput = this.createFileInput();
        this.setupEventListeners();
    }

    private createFileInput(): HTMLInputElement {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.style.display = 'none';
        document.body.appendChild(input);
        return input;
    }

    private setupEventListeners(): void {
        this.fileInput.addEventListener('change', (event) => this.handleFileChange(event));
    }

    public activate(): void {
        this.fileInput.click();
    }

    private handleFileChange(event: Event): void {
        const target = event.target as HTMLInputElement;
        const file = target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    this.drawImage(img);
                };
                img.src = e.target?.result as string;
            };
            reader.readAsDataURL(file);
        }
    }

    private drawImage(image: HTMLImageElement): void {
        const x = (this.canvas.width - image.width) / 2;
        const y = (this.canvas.height - image.height) / 2;
        this.context.drawImage(image, x, y);
    }
}