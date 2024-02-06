process.env.NODE_ENV = "development";
// Set env mode
// process.env.NODE_ENV = 'production';



import { app, BrowserWindow } from "electron";
import * as path from "path";


// doar o singura instanta a aplicatiei
const gotTheLock = app.requestSingleInstanceLock();
let mainWindow: BrowserWindow = null;


function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    backgroundColor: "#fff",
    webPreferences: {
        nodeIntegration: true,
        preload: path.join(__dirname, "./preload.js"),
    },
});

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "../src/index.html"));


  if (process.env.NODE_ENV !== "development") {
    mainWindow.removeMenu();
  }

  if (process.env.NODE_ENV === "development") {
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
  }
}


if (!gotTheLock) {
  app.quit();
} else {
  app.whenReady().then(() => {
      createWindow();
  });
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
  }
});
