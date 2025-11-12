import { Properties } from '../types';
import { createElement } from '../utils/dom';

export class PropertiesPanel {
    private element: HTMLElement;
    private properties: Properties | null = null;

    constructor() {
        this.element = createElement('div', { className: 'properties-panel' });
        this.render();
    }

    private render() {
        this.element.innerHTML = `
            <h3>Properties</h3>
            <div class="property-group">
                <label for="fill-color">Fill Color:</label>
                <input type="color" id="fill-color" />
            </div>
            <div class="property-group">
                <label for="stroke-color">Stroke Color:</label>
                <input type="color" id="stroke-color" />
            </div>
            <div class="property-group">
                <label for="stroke-width">Stroke Width:</label>
                <input type="number" id="stroke-width" min="0" value="1" />
            </div>
            <div class="property-group">
                <label for="width">Width:</label>
                <input type="number" id="width" min="1" value="100" />
            </div>
            <div class="property-group">
                <label for="height">Height:</label>
                <input type="number" id="height" min="1" value="100" />
            </div>
            <div class="property-group">
                <label for="rotate">Rotate (degrees):</label>
                <input type="number" id="rotate" value="0" />
            </div>
            <div class="property-group">
                <label for="font-size">Font Size:</label>
                <input type="number" id="font-size" value="16" />
            </div>
            <button id="apply-properties">Apply</button>
        `;

        this.addEventListeners();
    }

    private addEventListeners() {
        this.element.querySelector('#apply-properties')?.addEventListener('click', () => {
            if (this.properties) {
                this.updateProperties();
            }
        });

        this.element.querySelector('#fill-color')?.addEventListener('input', (event) => {
            if (this.properties) {
                this.properties.fillColor = (event.target as HTMLInputElement).value;
            }
        });

        this.element.querySelector('#stroke-color')?.addEventListener('input', (event) => {
            if (this.properties) {
                this.properties.strokeColor = (event.target as HTMLInputElement).value;
            }
        });

        this.element.querySelector('#stroke-width')?.addEventListener('input', (event) => {
            if (this.properties) {
                this.properties.strokeWidth = parseInt((event.target as HTMLInputElement).value);
            }
        });

        this.element.querySelector('#width')?.addEventListener('input', (event) => {
            if (this.properties) {
                this.properties.width = parseInt((event.target as HTMLInputElement).value);
            }
        });

        this.element.querySelector('#height')?.addEventListener('input', (event) => {
            if (this.properties) {
                this.properties.height = parseInt((event.target as HTMLInputElement).value);
            }
        });

        this.element.querySelector('#rotate')?.addEventListener('input', (event) => {
            if (this.properties) {
                this.properties.rotation = parseInt((event.target as HTMLInputElement).value);
            }
        });

        this.element.querySelector('#font-size')?.addEventListener('input', (event) => {
            if (this.properties) {
                this.properties.fontSize = parseInt((event.target as HTMLInputElement).value);
            }
        });
    }

    public setProperties(properties: Properties) {
        this.properties = properties;
        this.updateInputs();
    }

    private updateInputs() {
        if (this.properties) {
            (this.element.querySelector('#fill-color') as HTMLInputElement).value = this.properties.fillColor || '#ffffff';
            (this.element.querySelector('#stroke-color') as HTMLInputElement).value = this.properties.strokeColor || '#000000';
            (this.element.querySelector('#stroke-width') as HTMLInputElement).value = this.properties.strokeWidth.toString();
            (this.element.querySelector('#width') as HTMLInputElement).value = this.properties.width.toString();
            (this.element.querySelector('#height') as HTMLInputElement).value = this.properties.height.toString();
            (this.element.querySelector('#rotate') as HTMLInputElement).value = this.properties.rotation.toString();
            (this.element.querySelector('#font-size') as HTMLInputElement).value = this.properties.fontSize.toString();
        }
    }

    private updateProperties() {
        // Logic to update the selected element's properties on the canvas
        // This would typically involve notifying the canvas or the relevant tool
    }

    public getElement(): HTMLElement {
        return this.element;
    }
}