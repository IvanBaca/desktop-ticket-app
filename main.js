const { app, BrowserWindow} = require('electron')
const { path } = require('path')
const { connection } = require('./db-connection')
const Store = require('electron-store')
Store.initRenderer();

let window;

function createWindow() {
    window = new BrowserWindow({
        width: 1366,
        height: 850,
        minWidth: 600,
        minHeight: 400,
        webPreferences: {
            enableRemoteModule: true,
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    // window.removeMenu();
    window.loadFile('./src/html/ticket-view.html');
    window.maximize();
}

module.exports = {
    createWindow
  };