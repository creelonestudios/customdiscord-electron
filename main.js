const { app, BrowserWindow } = require('electron');
const path = require('path');

// Var stuff
const discordJS = require("discord.js");
const client = new discordJS.Client();
const utilFunctions = require("./src/util/util-functions.js");
const utilClasses = require("./src/util/util-classes.js");
utilClasses.create(client);
var token = "";

// Export stuff
exports.getDiscordJS = () => { return discordJS; };
exports.getDCJSClient = () => { return client; }
exports.setToken = (newToken) => { token = utilFunctions.encrypt(utilFunctions.getSalt(), newToken); }
exports.login = () => {
  client.login(utilFunctions.decrypt(utilFunctions.getSalt(), token))
  .catch((e) => {
    console.error("O_o Client couldn't login. Gonna suicide", e);
    app.exit();
  });
}
exports.getUtilClasses = () => { return utilClasses; };

app.on('ready', () => {
  // Create browser window
  const window = new BrowserWindow({
    width: 1000,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  });

  // Remove that stupid menu bar
  window.setMenu(null);

  // Load BG Scripts first
  require("./src/background/dc_listeners");

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
