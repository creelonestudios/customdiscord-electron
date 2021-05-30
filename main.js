const { app, BrowserWindow } = require('electron');
const path = require('path');

// Dc stuff
const discordJS = require("discord.js");
const client = new discordJS.Client();

// Export stuff
exports.getDiscordJS = () => { return discordJS; };
exports.getDCJSClient = () => { return client; }
exports.setToken = () => {  }

app.on('ready', () => {
  // Create browser window
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  });

  // Remove that stupid menu bar
  window.setMenu(null);

  // Load app
  window.loadFile(path.join(__dirname, 'src/app/app.html'));

  // Open DEVTOOLS
  window.openDevTools();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') { // darwin is mac for some reason
    app.quit();
  }
});

// Import more stuff (like bg scripts)
