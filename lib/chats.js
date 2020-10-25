const API = require('./api')
const crypto = require('./crypto')
const { ipcMain } = require('electron')
const { data } = require('jquery')

ipcMain.on('chats', (event, auth) => {
    API.send("getChats", "4", {
        auth: auth
    }).then(res => {
        crypto.decrypt(auth, res.data_enc).then(res => {
            event.reply('chats:reply', JSON.parse(res))
        }).catch(err => event.reply('chats:reply', false))
    }).catch(err => event.reply('chats:reply', false))
})

ipcMain.on('messages', (event, auth, msg_id, object_guid) => {
    crypto.encrypt(auth, {
        middle_message_id: msg_id,
        object_guid: object_guid
    }).then(data_enc => {
        API.send("getMessagesInterval", "4", {
            auth: auth,
            data_enc: data_enc
        }).then(res => {
            crypto.decrypt(auth, res.data_enc).then(res => {
                event.reply('messages:reply', JSON.parse(res))
            }).catch(err => event.reply('messages:reply', false))
        }).catch(err => event.reply('messages:reply', false))
    }).catch(err => event.reply('messages:reply', false))
})