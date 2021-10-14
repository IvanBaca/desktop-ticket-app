const {BrowserWindow} = require('electron')
const {app} = require('electron')

let window

function createWindow() {
    window = new BrowserWindow({
        width: 1366,
        height: 850,
        minWidth: 600,
        minHeight: 400,
        webPreferences: {
            nodeIntegration: true
        }
    })
    // window.removeMenu();
    window.loadFile('src/html/index.html');
    window.maximize();
}

require('electron-reload')(__dirname);

app.allowRendererProcessReuse = false;
app.whenReady().then(createWindow);