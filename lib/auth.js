const API = require('./api')
const regedit = require('regedit')
const crypto = require('./crypto')
const { ipcMain } = require('electron')
const Str = require('@supercharge/strings')
const { dialog } = require("electron")

// init regedit
const regedit_path = "HKCU\\Software\\GoShad"
regedit.createKey(regedit_path, err => {
    if (err) throw err
})

ipcMain.on('auth', (event) => {
    regedit.list(regedit_path, (err, result) => {
        if (err) throw err
        try {
            event.reply('auth:reply', result[regedit_path].values.auth.value)
        } catch (err) {
            event.reply('auth:reply', false)
        }
    })
})

ipcMain.on('login', (event, phone_number) => {
    API.send("sendCode" , "4", {
            data: {
                phone_number: phone_number,
                send_type: "SMS"
            }
        })
        .then(res => event.reply('login:reply', res))
        .catch(err => console.log(err))
})

ipcMain.on('signIn', (event, phone_number, code, res) => {
    API.send("signIn" , "4", {
        data: {
            phone_code: code,
            phone_code_hash: res.data.phone_code_hash,
            phone_number: phone_number
        }
    })
    .then(res => {
        res.status === "OK" && res.status_det === "OK" &&
        crypto.encrypt(res.data.auth, {
            app_version: "MA_2.6.3",
            device_hash: Str.random(32),
            device_model: Str.random(14),
            lang_code: "en",
            system_version: "SDK 25",
            token: "",
            token_type: "Firebase"
        }).then(data_enc => {
            API.send("registerDevice", "4", {
                auth: res.data.auth,
                data_enc: data_enc
            }).then(result => {
                if(result.status === "OK" && result.status_det === "OK")
                    regedit.putValue({
                        [regedit_path]: {
                            'auth': {
                                value: res.data.auth,
                                type: 'REG_SZ'
                            }
                        }
                    }, err => err)
                else dialog.showMessageBoxSync({type: 'error', message: "Register the Device failed! Please close the app and try again.", title: "Register failed"});
            }).catch(err => console.log(err))
        }).catch(err => console.log(err))
        event.reply('signIn:reply', res)
    })
    .catch(err => console.log(err))
})