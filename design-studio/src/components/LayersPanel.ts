import { Node } from '../types';
import { createElement } from '../utils/dom';

export class LayersPanel {
    private layers: Node[];
    private container: HTMLElement;

    constructor(container: HTMLElement) {
        this.layers = [];
        this.container = container;
        this.render();
    }

    public addLayer(node: Node) {
        this.layers.push(node);
        this.render();
    }

    public removeLayer(nodeId: string) {
        this.layers = this.layers.filter(layer => layer.id !== nodeId);
        this.render();
    }

    public updateLayer(node: Node) {
        const index = this.layers.findIndex(layer => layer.id === node.id);
        if (index !== -1) {
            this.layers[index] = node;
            this.render();
        }
    }

    private render() {
        this.container.innerHTML = ''; // Clear previous layers
        const layerList = createElement('div', { className: 'layer-list' });

        this.layers.forEach(layer => {
            const layerItem = createElement('div', {
                className: 'layer-item',
                innerHTML: `${layer.type} <small>#${layer.id}</small>`,
            });

            layerItem.addEventListener('click', () => {
                this.selectLayer(layer.id);
            });

            layerList.appendChild(layerItem);
        });

        this.container.appendChild(layerList);
    }

    private selectLayer(layerId: string) {
        // Logic to select the layer and update the properties panel
        console.log(`Layer ${layerId} selected`);
    }
}