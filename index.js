const { createWindow } = require("./main");
const { app } = require("electron");

require('./db-connection');
require('electron-reload')(__dirname);

app.allowRendererProcessReuse = false;
app.whenReady().then(createWindow);