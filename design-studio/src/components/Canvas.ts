class Canvas {
    private canvasElement: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private nodes: Node[] = [];
    private selectedNode: Node | null = null;

    constructor(canvasId: string) {
        this.canvasElement = document.getElementById(canvasId) as HTMLCanvasElement;
        this.context = this.canvasElement.getContext('2d')!;
        this.initialize();
    }

    private initialize() {
        this.canvasElement.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.canvasElement.addEventListener('mousemove', this.onMouseMove.bind(this));
        this.canvasElement.addEventListener('mouseup', this.onMouseUp.bind(this));
        this.canvasElement.addEventListener('dblclick', this.onDoubleClick.bind(this));
        this.render();
    }

    private onMouseDown(event: MouseEvent) {
        const { offsetX, offsetY } = event;
        this.selectedNode = this.getNodeAtPosition(offsetX, offsetY);
        if (this.selectedNode) {
            this.selectedNode.isDragging = true;
            this.selectedNode.offsetX = offsetX - this.selectedNode.x;
            this.selectedNode.offsetY = offsetY - this.selectedNode.y;
        } else {
            this.createNode('rectangle', offsetX, offsetY);
        }
    }

    private onMouseMove(event: MouseEvent) {
        if (this.selectedNode && this.selectedNode.isDragging) {
            const { offsetX, offsetY } = event;
            this.selectedNode.x = offsetX - this.selectedNode.offsetX;
            this.selectedNode.y = offsetY - this.selectedNode.offsetY;
            this.render();
        }
    }

    private onMouseUp() {
        if (this.selectedNode) {
            this.selectedNode.isDragging = false;
            this.selectedNode = null;
        }
    }

    private onDoubleClick(event: MouseEvent) {
        const { offsetX, offsetY } = event;
        const node = this.getNodeAtPosition(offsetX, offsetY);
        if (node) {
            this.editNode(node);
        }
    }

    private createNode(type: string, x: number, y: number) {
        const newNode: Node = {
            id: this.nodes.length + 1,
            type,
            x,
            y,
            width: 100,
            height: 100,
            isDragging: false,
            offsetX: 0,
            offsetY: 0,
            color: '#000000',
            text: '',
        };
        this.nodes.push(newNode);
        this.render();
    }

    private editNode(node: Node) {
        const newText = prompt('Edit text:', node.text);
        if (newText !== null) {
            node.text = newText;
            this.render();
        }
    }

    private getNodeAtPosition(x: number, y: number): Node | null {
        for (const node of this.nodes) {
            if (x >= node.x && x <= node.x + node.width && y >= node.y && y <= node.y + node.height) {
                return node;
            }
        }
        return null;
    }

    private render() {
        this.context.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
        for (const node of this.nodes) {
            this.context.fillStyle = node.color;
            this.context.fillRect(node.x, node.y, node.width, node.height);
            if (node.text) {
                this.context.fillStyle = '#FFFFFF';
                this.context.fillText(node.text, node.x + 10, node.y + 20);
            }
        }
    }

    public exportCanvas(): string {
        return this.canvasElement.toDataURL('image/png');
    }
}

interface Node {
    id: number;
    type: string;
    x: number;
    y: number;
    width: number;
    height: number;
    isDragging: boolean;
    offsetX: number;
    offsetY: number;
    color: string;
    text: string;
}

export default Canvas;