export interface Node {
    id: string;
    type: 'rect' | 'ellipse' | 'text' | 'image';
    x: number;
    y: number;
    width: number;
    height: number;
    fill?: string; // For shapes
    stroke?: string; // For shapes
    strokeWidth?: number; // For shapes
    text?: string; // For text nodes
    fontSize?: number; // For text nodes
    src?: string; // For image nodes
    zIndex: number; // For layering
}

export interface Tool {
    name: string;
    icon: string;
    activate: () => void;
    deactivate: () => void;
}

export interface Properties {
    fillColor: string;
    strokeColor: string;
    strokeWidth: number;
    width: number;
    height: number;
    rotation: number;
    fontSize: number;
}