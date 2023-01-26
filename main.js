const { app, BrowserWindow } = require('electron');
const path = require('path');

const isMac = process.platform === 'darwin';
const isDev = process.env.NODE_ENV !== 'production';

const createMainWindow = () => {
  const mainWindow = new BrowserWindow({
    title: 'Image Resizer',
    width: isDev ? 1000 : 500,
    height: 600,
  });

  // open dev tools if in dev env
  isDev ? mainWindow.webContents.openDevTools() : '';
  mainWindow.loadFile(path.join(__dirname, './view/index.html'));
};

app.whenReady().then(() => {
  createMainWindow();
  app.on('activate', () =>
    BrowserWindow.getAllWindows().length === 0 ? createMainWindow() : ''
  );
});

app.on('window-all-closed', () => (!isMac ? app.quit() : ''));
