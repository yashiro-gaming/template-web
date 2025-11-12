import { SelectTool } from '../tools/SelectTool';
import { RectTool } from '../tools/RectTool';
import { EllipseTool } from '../tools/EllipseTool';
import { TextTool } from '../tools/TextTool';
import { ImageTool } from '../tools/ImageTool';

export class Toolbar {
    private container: HTMLElement;
    private tools: { [key: string]: any } = {};
    private activeTool: string;

    constructor(container: HTMLElement) {
        this.container = container;
        this.activeTool = 'select';
        this.initializeTools();
        this.render();
    }

    private initializeTools() {
        this.tools['select'] = new SelectTool();
        this.tools['rect'] = new RectTool();
        this.tools['ellipse'] = new EllipseTool();
        this.tools['text'] = new TextTool();
        this.tools['image'] = new ImageTool();
    }

    private render() {
        this.container.innerHTML = `
            <div class="toolbar">
                <button data-tool="select" class="${this.activeTool === 'select' ? 'active' : ''}">Select</button>
                <button data-tool="rect" class="${this.activeTool === 'rect' ? 'active' : ''}">Rectangle</button>
                <button data-tool="ellipse" class="${this.activeTool === 'ellipse' ? 'active' : ''}">Ellipse</button>
                <button data-tool="text" class="${this.activeTool === 'text' ? 'active' : ''}">Text</button>
                <button data-tool="image" class="${this.activeTool === 'image' ? 'active' : ''}">Image</button>
            </div>
        `;

        this.addEventListeners();
    }

    private addEventListeners() {
        const buttons = this.container.querySelectorAll('button[data-tool]');
        buttons.forEach(button => {
            button.addEventListener('click', (event) => {
                const tool = (event.currentTarget as HTMLElement).dataset.tool;
                this.setActiveTool(tool);
            });
        });
    }

    private setActiveTool(tool: string) {
        if (this.tools[tool]) {
            this.activeTool = tool;
            this.render();
            this.tools[tool].activate();
        }
    }

    public getActiveTool() {
        return this.tools[this.activeTool];
    }
}