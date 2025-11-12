export class SelectTool {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D | null;
    private selectedElement: HTMLElement | null = null;
    private isDragging: boolean = false;
    private dragOffset = { x: 0, y: 0 };

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.initializeEvents();
    }

    private initializeEvents() {
        this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
        this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        this.canvas.addEventListener('dblclick', this.onDoubleClick.bind(this));
    }

    private onMouseDown(event: MouseEvent) {
        const { offsetX, offsetY } = event;
        this.selectedElement = this.getElementAtPosition(offsetX, offsetY);

        if (this.selectedElement) {
            this.isDragging = true;
            const rect = this.selectedElement.getBoundingClientRect();
            this.dragOffset.x = offsetX - (rect.left - this.canvas.getBoundingClientRect().left);
            this.dragOffset.y = offsetY - (rect.top - this.canvas.getBoundingClientRect().top);
        }
    }

    private onMouseMove(event: MouseEvent) {
        if (this.isDragging && this.selectedElement) {
            const { offsetX, offsetY } = event;
            this.selectedElement.style.left = `${offsetX - this.dragOffset.x}px`;
            this.selectedElement.style.top = `${offsetY - this.dragOffset.y}px`;
        }
    }

    private onMouseUp() {
        this.isDragging = false;
        this.selectedElement = null;
    }

    private onDoubleClick(event: MouseEvent) {
        if (this.selectedElement) {
            this.editElement(this.selectedElement);
        }
    }

    private getElementAtPosition(x: number, y: number): HTMLElement | null {
        const elements = Array.from(this.canvas.children) as HTMLElement[];
        for (let element of elements) {
            const rect = element.getBoundingClientRect();
            if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
                return element;
            }
        }
        return null;
    }

    private editElement(element: HTMLElement) {
        const newText = prompt('Edit text:', element.innerText);
        if (newText !== null) {
            element.innerText = newText;
        }
    }
}