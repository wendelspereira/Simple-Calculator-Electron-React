const path = require('path');

const { app, BrowserWindow, Menu } = require('electron');
const isDev = require('electron-is-dev');

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    height: 320,
    width: 250,
    resizable: false,
    fullscreenable: false,
    center: true,
    maximizable: false,
    webPreferences: {
      devTools: false,
      nodeIntegration: true,
      scrollBounce: false,
    },
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
}

const menu = Menu.buildFromTemplate([])
Menu.setApplicationMenu(menu)

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

