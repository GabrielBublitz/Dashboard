const { app, BrowserWindow, ipcMain } = require('electron');
const isDev = process.env.NODE_ENV !== "production";
const config = require('../userConfig.json');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const logFolderPath = './logs/';


//#region App
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const CreateWindow = () => {
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
  CreateWindow();

  let hasFile = ValidateFileExist('./config.json');
  if (!hasFile) {
    LoadConfig('./config.json', config);
  }

  if (!ValidateFileExist(logFolderPath)) {
    fs.promises.mkdir(logFolderPath);
  }

  ClearOldLogs();
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
    CreateWindow();
  }
});

//#endregion

const LoadConfig = async (filePath, content) => {
  try {
    await fs.promises.writeFile(filePath, JSON.stringify(content, null, 2), 'utf8');

    return content;
  } catch (error) {
    console.error('Erro ao salvar o arquivo JSON:', err);
  }
}

function ValidateFileExist(filePath) {
  try {
    fs.accessSync(filePath, fs.constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
}

const ReadFile = async (filePath) => {
  const content = await fs.promises.readFile(filePath, 'utf-8');
  return content;
};

ipcMain.on('read-file', async (event, filePath) => {
  try {
    const content = await ReadFile(filePath);

    event.reply('file-content', JSON.parse(content));
  } catch (error) {
    console.error('Erro ao ler o arquivo:', error);
    event.reply('file-content', null);
  }
});

ipcMain.on('write-file', async (event, request) => {
  try {
    var response = await LoadConfig(request.filePath, request.content);

    event.reply('receive', response);
  } catch (e) {
    event.reply('write-file-error', { message: 'Falha ao registrar config', error: e });
  }
});

ipcMain.on('fetch-data', async (event, request) => {
  try {
    const response = await axios.get(request.url);

    event.reply(request.url + request.index,
      {
        data: response.data,
        status: response.status,
        identifier: request.url
      }
    );
  } catch (error) {
    event.reply(request.url + 'error' + request.index,
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
    await LogError(request.content);

  } catch (e) {
    event.reply('write-file-error', { message: 'Falha ao registrar config.', error: e });
  }
});

const LogError = async (content) => {
  try {
    let filePath = await CreateLogFile();

    let dataAtual = new Date();
    let timeZoneSP = 'America/Sao_Paulo';
    let formatOptions = {
      timeZone: timeZoneSP,
      hour12: false,
    };
    const formatedDate = dataAtual.toLocaleString('pt-BR', formatOptions).replace(/ [A-Z]{3}$/, '');

    await fs.promises.appendFile(filePath, `\n--- ${formatedDate}\n` + content + '\n');
  } catch (error) {
    console.error('Erro ao salvar o arquivo JSON: ', error);
  }
};

const CreateLogFile = async () => {
  try {
    let date = GetFormatedDate();
    let logFilePath = `${logFolderPath}${date}.txt`;

    if (!ValidateFileExist(logFilePath)) {
      await fs.promises.writeFile(logFilePath, 'null', 'utf-8');
    }

    return logFilePath;
  } catch (error) {
    console.error('Erro ao criar arquivo de log: ', error);
  }
}

const GetFormatedDate = () => {
  let currentDate = new Date();

  let day = currentDate.getDate();
  let month = currentDate.getMonth();
  let year = currentDate.getFullYear();

  return `${day}-${month}-${year}`;
};

const ClearOldLogs = () => {
  let currentDate = new Date();

  //Calculate time for one weed ago: currentDate in ms - 7 (days) * 24 (to hours) * 60 (to minutes) * 60 (to seconds) * 1000 (to ms)
  let weekAgoDate = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);

  fs.readdir(logFolderPath, (error, files) => {
    if (error) {
      console.log('Erro ao limpar arquivos de log: \n', error);

      return;
    }

    files.forEach(file => {
      let filePath = path.join(logFolderPath, file);

      fs.stat(filePath, (error, stats) => {
        if (error) {
          console.log(`Erro ao acessar status do arquivo de log: ${filePath}\n`, error);

          return;
        }

        if (stats.mtime < weekAgoDate) {
          fs.unlink(filePath, (error) => {
            if (error) {
              console.log(`Erro ao excluir arquivo de log: ${filePath} \n`, error);

              return;
            }

            console.log(`Arquivo de log excluido: ${filePath} \n`);
          });
        }
      });
    });
  });
};