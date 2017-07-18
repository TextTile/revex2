const electron = require('electron')
//const devInstaller = require('electron-devtools-installer');
//const installExtension = devInstaller.default;
//const { REACT_DEVELOPER_TOOLS, REACT_PERF, REDUX_DEVTOOLS } = devInstaller;
const settings = require('electron-settings');
const httpServer = require('./http-server')
const app = electron.app

const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

let mainWindow

function createWindow() {
    // Create the browser window.
    
    /*require('devtron').install()
    installExtension(REACT_DEVELOPER_TOOLS)
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log('An error occurred: ', err));

    installExtension(REACT_PERF)
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log('An error occurred: ', err));

    installExtension(REDUX_DEVTOOLS)
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log('An error occurred: ', err));*/

       

    mainWindow = new BrowserWindow({ width: 1000, height: 700, titleBarStyle: 'hidden' })

    httpServer.then(port => {
        //mainWindow.loadURL(`file://${__dirname}/build/index.html`)
        mainWindow.loadURL(`http://localhost:${port}/`)
        //mainWindow.webContents.openDevTools()
    })

    
    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

app.on('ready', createWindow)
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
})

//Events ---------------------------------------------------------------
const { ipcMain } = require('electron')

ipcMain.on('save-dataset', (event, arg) => {
    try {
        settings.setSync(`datasets.${arg.id}`, arg);
        let data = settings.getSync('datasets');
        event.sender.send('datasets-changed', data);    
    } catch (error) {
        event.sender.send('save-dataset-error', {error, arg});   
    }
})

ipcMain.on('remove-dataset', (event, id) => {
    try {
        settings.deleteSync(`datasets.${id}`);
        let data = settings.getSync('datasets');
        event.sender.send('datasets-changed', data);    
    } catch (error) {
        event.sender.send('delete-error', {error, arg});   
    }
})


ipcMain.on('get-datasets', (event, arg) => {
    try {
        let data = settings.getSync('datasets');
        event.returnValue = data
    } catch (error) {
        event.returnValue = error
    }
})




