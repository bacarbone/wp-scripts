#!/usr/bin/env node

const path = require('path');
const { watchFiles } = require('./css-to-theme');

const cssPath = process.env.CSS_PATH || path.resolve(process.cwd(), "./styles/core/");
const variationsPath = process.env.VARIATIONS_PATH || path.resolve(process.cwd(), "./styles/variations/");


watchFiles(cssPath, variationsPath);