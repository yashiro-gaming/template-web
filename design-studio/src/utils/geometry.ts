// This file contains utility functions for geometric calculations, such as determining positions and dimensions.

export function getDistance(pointA: { x: number; y: number }, pointB: { x: number; y: number }): number {
    return Math.sqrt(Math.pow(pointB.x - pointA.x, 2) + Math.pow(pointB.y - pointA.y, 2));
}

export function getCenter(rect: { x: number; y: number; width: number; height: number }): { x: number; y: number } {
    return {
        x: rect.x + rect.width / 2,
        y: rect.y + rect.height / 2,
    };
}

export function isPointInRect(point: { x: number; y: number }, rect: { x: number; y: number; width: number; height: number }): boolean {
    return (
        point.x >= rect.x &&
        point.x <= rect.x + rect.width &&
        point.y >= rect.y &&
        point.y <= rect.y + rect.height
    );
}

export function getBoundingBox(nodes: Array<{ x: number; y: number; width: number; height: number }>): { x: number; y: number; width: number; height: number } {
    if (nodes.length === 0) {
        return { x: 0, y: 0, width: 0, height: 0 };
    }

    const xValues = nodes.map(node => node.x);
    const yValues = nodes.map(node => node.y);
    const widths = nodes.map(node => node.width);
    const heights = nodes.map(node => node.height);

    const minX = Math.min(...xValues);
    const minY = Math.min(...yValues);
    const maxX = Math.max(...xValues.map((x, i) => x + widths[i]));
    const maxY = Math.max(...yValues.map((y, i) => y + heights[i]));

    return {
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY,
    };
}

export function scaleRect(rect: { x: number; y: number; width: number; height: number }, scale: number): { x: number; y: number; width: number; height: number } {
    return {
        x: rect.x * scale,
        y: rect.y * scale,
        width: rect.width * scale,
        height: rect.height * scale,
    };
}