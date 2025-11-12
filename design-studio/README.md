# Design Studio

Welcome to the Design Studio project! This application is a powerful web-based design tool that allows users to create and manipulate design elements such as shapes, text, and images on a canvas. Below you will find information on how to set up, features, and usage guidelines.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Canvas Area**: A responsive drawing area where users can create and edit designs.
- **Toolbar**: A user-friendly interface for selecting various tools (select, rectangle, ellipse, text, image).
- **Properties Panel**: Modify properties of selected elements, including color, size, and rotation.
- **Layers Panel**: Manage the stacking order of design elements.
- **Export Options**: Export designs as images or JSON data.
- **Responsive Design**: The application is designed to work on various screen sizes.

## Installation

To get started with the Design Studio, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/design-studio.git
   ```

2. Navigate to the project directory:
   ```
   cd design-studio
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and go to `http://localhost:3000` to view the application.

## Usage

Once the application is running, you can:

- Select tools from the toolbar to create shapes, add text, or upload images.
- Click on elements to select them and modify their properties using the Properties Panel.
- Use the Layers Panel to manage the order of elements.
- Export your designs using the Exporter functionality.

## Project Structure

The project is organized as follows:

```
design-studio
├── public
│   └── index.html          # Main HTML entry point
├── src
│   ├── main.ts             # Main TypeScript entry point
│   ├── app.ts              # Application logic
│   ├── index.html          # Additional HTML file for testing
│   ├── styles
│   │   └── main.css        # Main styles for the application
│   ├── components
│   │   ├── Canvas.ts       # Canvas component
│   │   ├── Toolbar.ts      # Toolbar component
│   │   ├── PropertiesPanel.ts # Properties panel component
│   │   ├── LayersPanel.ts  # Layers panel component
│   │   └── Exporter.ts     # Exporter component
│   ├── tools
│   │   ├── SelectTool.ts   # Tool for selecting elements
│   │   ├── RectTool.ts     # Tool for drawing rectangles
│   │   ├── EllipseTool.ts  # Tool for drawing ellipses
│   │   ├── TextTool.ts     # Tool for adding text
│   │   └── ImageTool.ts    # Tool for uploading images
│   ├── utils
│   │   ├── dom.ts          # DOM utility functions
│   │   ├── geometry.ts     # Geometry utility functions
│   │   └── export.ts       # Export utility functions
│   └── types
│       └── index.ts        # TypeScript interfaces and types
├── package.json             # npm configuration file
├── tsconfig.json            # TypeScript configuration file
├── vite.config.ts           # Vite configuration file
├── .gitignore               # Git ignore file
└── README.md                # Project documentation
```

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.