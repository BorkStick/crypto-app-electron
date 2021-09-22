// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu} = require('electron')
const path = require('path')
const url = require('url')
const shell = require('electron').shell
const ipc = require('electron').ipcMain

// Enable live reload for all the files inside your project directory

// Enable live reload for Electron too
require('electron-reload')(__dirname, {
    // Note that the path to electron may vary according to the main file
    electron: require(`${__dirname}/node_modules/electron`)
});

let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
      width: 600, 
      height: 320,
      webPreferences: {
        nodeIntegration: true
      }
    })

  

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, '/src/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  //win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

var menu = Menu.buildFromTemplate([
    {
        label: 'Menu',
            submenu: [
            {label:'Adjust Notification Value'},
            {
                label:'CoinMarketCap',
                click() { 
                    shell.openExternal('http://coinmarketcap.com')
                },
                accelerator: 'CmdOrCtrl+Shift+C'
            },
            {type:'separator'},
            {
                label:'Exit', 
                click() { 
                    app.quit() 
                } 
            }
        ]
    }
  ])
Menu.setApplicationMenu(menu); 

ipc.on('update-notify-value', function (event, arg) {
    win.webContents.send('targetPriceVal', arg)
  })


