# CSS to Theme

The goal of this project is to provide a more efficient way to manage CSS with new block themes in WordPress. 

The tool watches for changes in CSS files and updates the corresponding block styles in the theme.json file.

It also updates the `css` property of variation JSON files when the corresponding CSS file is changed.

## Installation

```bash
npm install --save-dev css-to-theme
```

## Features

- Watch for changes in CSS files and update block styles in the theme.json file.
  - You have to name your CSS files after the block name (e.g., `core/paragraph.css`).
- Monitor changes in variation CSS files and update the `css` property in the corresponding JSON file.
  - Variation CSS files should have the same name as the JSON file (e.g., `call-to-action-group.css` and `call-to-action-group.json`).


## Usage

You can use this package in two ways:

1. As a command-line tool:

```bash
css-to-theme
```

2. As a module in your Node.js project:

```javascript
const { watchFiles } = require('css-to-theme');

watchFiles('./styles/core', './styles/variations');
```

## Configuration

By default, the tool looks for:
- CSS files in `./styles/core/`
- Variation files (CSS and JSON) in `./styles/variations/`

You can customize these paths using environment variables:

- `CSS_PATH`: Path to the directory containing CSS files
- `VARIATIONS_PATH`: Path to the directory containing variation CSS and JSON files

Example:

```bash
css-to-theme CSS_PATH=./custom/css/path VARIATIONS_PATH=./custom/variations/path 
```

## License

MIT
