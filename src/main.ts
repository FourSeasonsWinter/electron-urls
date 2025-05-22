import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'node:path'
import started from 'electron-squirrel-startup'

if (started) {
  app.quit()
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 460,
    height: 600,
    maximizable: false,
    resizable: false,
    autoHideMenuBar: true,
    roundedCorners: true,
    backgroundColor: '#0a192f',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    )
  }

  mainWindow.webContents.openDevTools()
}

app.on('ready', createWindow)

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

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
ipcMain.handle('fetch-from-node', async (_event, url, options) => {
  const res = await fetch(url, options)
  const contentType = res.headers.get('content-type')
  let body

  if (contentType && contentType.includes('application/json')) {
    body = await res.json()
  } else [
    body = await res.text()
  ]

  return {
    status: res.status,
    headers: Object.fromEntries(res.headers.entries()),
    body
  }
})
