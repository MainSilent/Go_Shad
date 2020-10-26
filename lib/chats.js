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

ipcMain.on('getUrl', (event, auth, access_token, live_id) => {
    crypto.encrypt(auth, {
        access_token: access_token,
        live_id: live_id
    }).then(data_enc => {
        API.send("getLivePlayUrl", "4", {
            auth: auth,
            data_enc: data_enc
        }).then(res => {
            crypto.decrypt(auth, res.data_enc).then(res => {
                event.reply('getUrl:reply', JSON.parse(res))
            }).catch(err => event.reply('getUrl:reply', false))
        }).catch(err => event.reply('getUrl:reply', false))
    }).catch(err => event.reply('getUrl:reply', false))
})