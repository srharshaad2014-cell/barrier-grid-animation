# Barrier Grid Animation Generator

A minimal browser-based tool that generates an animated barrier grid pattern using HTML Canvas.

## Features

- Black vertical barrier lines on a white canvas
- User-defined strip width in pixels
- Smooth, continuous horizontal animation
- Lightweight implementation with plain HTML, CSS, and JavaScript
- Download the current frame as a PNG image

## Usage

1. Open `index.html` in any modern desktop or mobile browser.
2. Enter the desired **Strip width (px)** value in the input field.
3. Click **Generate** to update the animation with the new strip width.
4. Click **Download PNG** to save the current frame as a PNG image file.

## Technical Details

- **Rendering**: HTML Canvas with `requestAnimationFrame` for smooth animation
- **Pattern**: Repeating sequence of black vertical bars with equal-width transparent gaps
- **Export**: PNG format using `canvas.toBlob()` with automatic file download
- **Responsive**: Adapts to viewport size and window resizing

## File Structure

```
barrier-grid-animation/
├── index.html       # Main HTML structure
├── style.css        # Minimal responsive styling
├── script.js        # Canvas animation and download logic
└── README.md        # Setup and usage information
```

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Any modern browser with HTML5 Canvas and ES6 support

## Setup

No build process or dependencies required. Simply:

1. Clone or download the repository
2. Open `index.html` in a web browser
3. Start using the tool

## Constraints

- No frameworks (React, Vue, etc.)
- No backend services
- No authentication, audio, or analytics
- Pure HTML, CSS, and JavaScript only

## Animation Parameters

- **Speed**: 60 pixels per second (fixed)
- **Default strip width**: 10 pixels
- **Minimum strip width**: 1 pixel
- **Maximum strip width**: 200 pixels

## License

MIT License - Feel free to use and modify as needed.
