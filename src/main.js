const { app, BrowserWindow, ipcMain } = require('electron');
const isDev = process.env.NODE_ENV !== "production";
const config = require('../userConfig.json')
const fs = require('fs');
const axios = require('axios');

//#region App
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1280,
    minWidth: 1280,
    height: 720,
    minHeight: 720,
    center: true,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      webSecurity: true,
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
app.on('ready', () => {
  createWindow();
  hasFile = validateFileExist('./config.json');
  if (!hasFile) {
    loadConfig('./config.json', config);
  }
});

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

//#endregion

const loadConfig = async (filePath, content) => {
  try {
    await fs.promises.writeFile(filePath, JSON.stringify(content, null, 2), 'utf8');

    return content;
  } catch (error) {
    console.error('Erro ao salvar o arquivo JSON:', err);
  }
}

function validateFileExist(caminho) {
  try {
    fs.accessSync(caminho, fs.constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
}

const readFile = async (filePath) => {
  const content = await fs.promises.readFile(filePath, 'utf-8');
  return content;
};

ipcMain.on('read-file', async (event, filePath) => {
  try {
    const content = await readFile(filePath);

    event.reply('file-content', JSON.parse(content));
  } catch (error) {
    console.error('Erro ao ler o arquivo:', error);
    event.reply('file-content', null);
  }
});

ipcMain.on('write-file', async (event, request) => {
  try {
    var response = await loadConfig(request.filePath, request.content);

    event.reply('receive', response);
  } catch (e) {
    event.reply('write-file-error', { message: 'Falha ao registrar config', error: e });
  }
});

ipcMain.on('fetch-data', async (event, request) => {
  try {
    const response = await axios.get(request.url);
    event.reply('data-fetched',
      {
        data: response.data,
        status: response.status,
        identifier: request.url
      }
    );
  } catch (error) {
    event.reply('fetch-error',
      {
        satus: 400,
        errorMessage: error.message,
        stack: error.stack,
        identifier: request.url
      }
    );
  }
});

ipcMain.on('log-error', async (event, request) => {
  try {
    await logError(request.filePath, request.content);

  } catch (e) {
    event.reply('write-file-error', { message: 'Falha ao registrar config.', error: e });
  }
});

const logError = async (filePath, content) => {
  try {
    const dataAtual = new Date();
    const fusoHorarioSP = 'America/Sao_Paulo';
    const opcoesFormato = {
      timeZone: fusoHorarioSP,
      hour12: false,
    };
    const formatedDate = dataAtual.toLocaleString('pt-BR', opcoesFormato).replace(/ [A-Z]{3}$/, '');

    await fs.promises.appendFile(filePath, `\n--- ${formatedDate}\n` + content + '\n');
  } catch (error) {
    console.error('Erro ao salvar o arquivo JSON: ', error);
  }
};