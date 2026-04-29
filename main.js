const { app, BrowserWindow, ipcMain } = require('electron');
const RPC = require('discord-rpc');
const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, 'config.json');
let config = { unlockedFps: false };

if (fs.existsSync(configPath)) {
  try { config = JSON.parse(fs.readFileSync(configPath, 'utf8')); } catch (e) {}
}

if (config.unlockedFps) {
  app.commandLine.appendSwitch('disable-frame-rate-limit');
}

const clientId = ''; 
let rpc;

function updateRPC(details, state) {
  if (!rpc) return;
  rpc.setActivity({
    details: details,
    state: state,
    startTimestamp: Date.now(),
    largeImageKey: "", 
    largeImageText: "",
    instance: false
  }).catch(() => {});
}

try {
    if (clientId) {
        RPC.register(clientId);
        rpc = new RPC.Client({ transport: 'ipc' });
        rpc.on('ready', () => updateRPC("No Menu", "Client"));
        rpc.login({ clientId }).catch(() => {});
    }
} catch (e) {}

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    title: "Client",
    backgroundColor: '#1a1a1a',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  win.setMenuBarVisibility(false);
  win.loadURL('https://www.haxball.com/play');

  win.webContents.on('did-finish-load', () => {
    win.webContents.insertCSS(`
      body { background-color: #1a1a1a !important; color: #fff !important; }
      .gameframe { background-color: #000 !important; }
    `);
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});