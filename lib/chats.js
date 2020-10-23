const API = require('./api')
const crypto = require('./crypto')
const { ipcMain } = require('electron')

ipcMain.on('chats', (event, auth) => {
    API.send("getChats", "4", {
        auth: auth
    }).then(res => {
        crypto.decrypt(auth, res.data_enc).then(res => {
            event.reply('chats:reply', JSON.parse(res))
        }).catch(err => event.reply('chats:reply', false))
    }).catch(err => event.reply('chats:reply', false))
})