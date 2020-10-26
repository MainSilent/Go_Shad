const {
  app,
  BrowserWindow,
  ipcMain
} = require('electron')
const localShortcut = require('electron-localshortcut')
const findRemoveSync = require('find-remove')
require("./lib/auth")
require("./lib/chats")

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    },
    title: "GoShad",
    icon: "./public/assets/images/icon.png"
  })
  win.removeMenu(true)
  win.loadURL('http://localhost:3000')

  localShortcut.register(win, 'Ctrl+Shift+I', () => {
    win.openDevTools()
  })

  // Video Window
  ipcMain.on('video', (event, url) => {
    const winVideo = new BrowserWindow({
      width: 1200,
      height: 800,
      webPreferences: {
        nodeIntegration: true
      },
      parent: win,
      modal: true,
      title: "GoShad",
      icon: "./public/assets/images/icon.png"
    })
    winVideo.removeMenu(true)
    winVideo.loadFile('public/video.html', {query: {"url": url}})
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

//clean tmp directory and logs
findRemoveSync('./lib/tmp', {
  dir: "*",
  files: "*.*"
})
findRemoveSync('./lib/Crypto', {
  extensions: ['.log']
})