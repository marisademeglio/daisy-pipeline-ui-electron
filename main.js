// Modules to control application life and create native browser window
const {app, BrowserWindow, Tray, Menu, nativeImage} = require('electron')
const {trayMenu, mainMenu} = require('./menus');
const {iconBase64} = require('./icon')
const path = require('path')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('public/index.html')
}

let tray;
app.setName("DAISY Pipeline");

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  const icon = nativeImage.createFromDataURL(iconBase64)
  tray = new Tray(icon)

  const contextMenu = Menu.buildFromTemplate(trayMenu)

  tray.setToolTip('DAISY Pipeline')
  tray.setContextMenu(contextMenu)
  
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})


const menu = Menu.buildFromTemplate(mainMenu)
Menu.setApplicationMenu(menu)