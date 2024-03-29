// main.js
const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile("index.html");
}

async function handleFileOpen() {
  const fs = require("fs");
  const { canceled, filePaths } = await dialog.showOpenDialog();
  if (!canceled) {
    const csv = fs.readFileSync(filePaths[0], "utf-8");
    return csv;
  }
}

function handleSetTitle(event, title) {
  const webContents = event.sender;
  const win = BrowserWindow.fromWebContents(webContents);
  win.setTitle(title);
  return 2;
}

app.whenReady().then(() => {
  ipcMain.on("set-title", handleSetTitle);
  ipcMain.handle("dialog:openFile", handleFileOpen);

  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
