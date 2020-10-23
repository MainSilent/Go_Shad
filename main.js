const {
  app,
  BrowserWindow
} = require('electron')
const localShortcut = require('electron-localshortcut')
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