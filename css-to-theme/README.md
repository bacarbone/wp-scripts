# CSS to Theme

This package updates a WordPress theme.json file from CSS files, including variations. It can watch for changes and update the theme files automatically.

## Installation

```bash
npm install --save-dev css-to-theme
```

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

## How it works

1. The tool monitors the specified CSS directory and variations directory for changes.
2. When a change is detected in the CSS directory, it updates the corresponding block styles in the theme.json file.
3. When a change is detected in the variations directory:
   - If a CSS file is changed, it looks for a corresponding JSON file with the same name.
   - If found, it updates the `css` property of the JSON file with the contents of the CSS file.

## License

MIT
