// This file contains the main application logic, including the setup of the canvas, toolbar, properties panel, and layers panel.

import { Canvas } from './components/Canvas';
import { Toolbar } from './components/Toolbar';
import { PropertiesPanel } from './components/PropertiesPanel';
import { LayersPanel } from './components/LayersPanel';
import { Exporter } from './components/Exporter';
import { SelectTool } from './tools/SelectTool';
import { RectTool } from './tools/RectTool';
import { EllipseTool } from './tools/EllipseTool';
import { TextTool } from './tools/TextTool';
import { ImageTool } from './tools/ImageTool';

class App {
    private canvas: Canvas;
    private toolbar: Toolbar;
    private propertiesPanel: PropertiesPanel;
    private layersPanel: LayersPanel;
    private exporter: Exporter;

    constructor() {
        this.canvas = new Canvas();
        this.toolbar = new Toolbar(this.canvas);
        this.propertiesPanel = new PropertiesPanel(this.canvas);
        this.layersPanel = new LayersPanel(this.canvas);
        this.exporter = new Exporter(this.canvas);
        
        this.initialize();
    }

    private initialize() {
        this.setupEventListeners();
        this.render();
    }

    private setupEventListeners() {
        // Add event listeners for toolbar actions
        this.toolbar.onToolSelected((tool) => {
            this.canvas.setActiveTool(tool);
        });

        // Add event listeners for properties panel changes
        this.propertiesPanel.onPropertiesChanged((properties) => {
            this.canvas.updateSelectedNodeProperties(properties);
        });

        // Add event listeners for layer management
        this.layersPanel.onLayerSelected((layerId) => {
            this.canvas.selectLayer(layerId);
        });

        // Add export functionality
        this.exporter.onExport((format) => {
            this.exporter.exportCanvas(format);
        });
    }

    private render() {
        document.body.appendChild(this.toolbar.render());
        document.body.appendChild(this.canvas.render());
        document.body.appendChild(this.propertiesPanel.render());
        document.body.appendChild(this.layersPanel.render());
    }
}

// Initialize the application
const app = new App();