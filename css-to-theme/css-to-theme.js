const fs = require("fs");
const path = require("path");
const css = require("css");
const chokidar = require("chokidar");




function updateTheme(cssPath, themeFile) {
    let theme = {};
    if (fs.existsSync(themeFile)) {
        theme = JSON.parse(fs.readFileSync(themeFile, "utf8"));
        if (!theme.styles) {
            theme.styles = {};
        }
    
        if (!theme.styles.blocks) {
            theme.styles.blocks = {};
        }

        if(fs.existsSync(cssPath)){
            const files = fs.readdirSync(cssPath);
            files.forEach((file) => {
                if (path.extname(file) === '.css') {
                    const fileName = path.basename(file, '.css');
                    const filePath = path.join(cssPath, file);
                    const rawCss = css.parse(fs.readFileSync(filePath, "utf8"));
                    const stringifiedCss = css.stringify(rawCss, { compress: true });

                    if(!theme.styles.blocks[`core/${fileName}`]){
                        theme.styles.blocks[`core/${fileName}`] = {};
                    }

                    theme.styles.blocks[`core/${fileName}`].css = stringifiedCss;


                }
            });

            if(checkJsonDiff(themeFile, theme)){
                fs.writeFileSync(themeFile, JSON.stringify(theme, null, "\t"));
                console.log(`[${new Date().toLocaleTimeString()}]: Updated theme`);
            }
            
        }else{
            console.log(`Folder ${cssPath} doesn't exist`);
        }
    }else{
        console.log(`No ${themeFile}`);
    }
}

function updateVariations(variationsPath) {
    if (fs.existsSync(variationsPath)) {
        const variationFiles = fs.readdirSync(variationsPath);
        variationFiles.forEach((file) => {
            if (path.extname(file) === '.css') {
                const fileName = path.basename(file, '.css');
                const filePath = path.join(variationsPath, file);
                const jsonFilePath = path.join(variationsPath, `${fileName}.json`);

                if (fs.existsSync(jsonFilePath)) {
                    const rawCss = css.parse(fs.readFileSync(filePath, "utf8"));
                    const stringifiedCss = css.stringify(rawCss, { compress: true });

                    let jsonContent = JSON.parse(fs.readFileSync(jsonFilePath, "utf8"));

                    if (!jsonContent.styles) {
                        jsonContent.styles = {};
                    }
                    jsonContent.styles.css = stringifiedCss;

                    if(checkJsonDiff(jsonFilePath, jsonContent)){
                        fs.writeFileSync(jsonFilePath, JSON.stringify(jsonContent, null, "\t"));
                        console.log(`[${new Date().toLocaleTimeString()}]: Updated variation: ${fileName}`);
                    }
                }else{
                    console.log(`No JSON file found for variation: ${fileName}`);
                }
            }
        });
    }
}

function checkJsonDiff(filePath, newJson) {
    let diff = false;
    if (fs.existsSync(filePath)) {
        const oldJson = JSON.parse(fs.readFileSync(filePath, "utf8"));
        diff = JSON.stringify(oldJson) !== JSON.stringify(newJson);
    }
    return diff;
}

function updateThemeFiles(cssPath, themeFile, variationsPath) {
    updateTheme(cssPath, themeFile, variationsPath);
    updateVariations(variationsPath);
}


function watchFiles(cssPath, variationsPath) {
    const themeFile = "./theme.json";
    const watcher = chokidar.watch([cssPath, variationsPath], {
        ignored: /(^|[\/\\])\../, // ignore dotfiles
        persistent: true
    });

    watcher
        .on('add', () => updateThemeFiles(cssPath, themeFile, variationsPath))
        .on('change', () => updateThemeFiles(cssPath, themeFile, variationsPath))
        .on('unlink', () => updateThemeFiles(cssPath, themeFile, variationsPath));

    console.log(`Watching for changes in ${cssPath} or ${variationsPath}`);
}

module.exports = {
    updateThemeFiles,
    watchFiles
};