const { app, BrowserWindow, ipcMain } = require('electron');
const isDev = process.env.NODE_ENV !== "production";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1280,
    minWidth: 560,
    height: 720,
    minHeight: 560,
    center: true,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      webSecurity: false,
      nodeIntegration: true,
      contextIsolation: false
    },
  });

  mainWindow.setMenu(null);

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  ipcMain.on("close", () => {
    const window = BrowserWindow.getFocusedWindow();
    if (window) {
      window.close();
    }
  });

  ipcMain.on("maximize", () => {
    const window = BrowserWindow.getFocusedWindow();
    if (window) {
      if (window.isMaximized) {
        window.unmaximize();
        window.isMaximized = false;
      } else {
        window.maximize();
        window.isMaximized = true;
      }
    }
  });

  ipcMain.on("minimize", () => {
    const window = BrowserWindow.getFocusedWindow();
    if (window) {
      window.minimize();
    }
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

const fs = require('fs');

ipcMain.on('read-file', async (event, filePath) => {
  try {
    const content = await fs.promises.readFile(filePath, 'utf-8');
    event.reply('file-content', content);
  } catch (error) {
    console.error('Erro ao ler o arquivo:', error);
    event.reply('file-content', null);
  }
});

const axios = require('axios');

ipcMain.on('fetch-data', async (event, url) => {
  try {
      const response = await axios.get(url);
      event.reply('data-fetched', { "data": response.data, "status": response.status});
  } catch (error) {
      event.reply('fetch-error', error.message);
  }
});