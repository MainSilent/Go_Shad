const request = require('request')
const { dialog } = require("electron")

exports.send = (method, version, data) => {
    console.log(method, "\b...")
    return new Promise((resolve, reject) => {
        //request.get("https://shgetdcmess.iranlms.ir", (error, response, apiLink) => {
            //if (error) reject(error)
            //const default_api = JSON.parse(apiLink).data.default_api
            //const api = JSON.parse(apiLink).data.API[default_api]
            const api = "https://shadmessenger1.iranlms.ir"
            var options = {
                url: api,
                method: 'POST',
                json: {
                    "api_version": version,
                    "client": {
                        "app_name": "Main",
                        "app_version": "2.6.3",
                        "lang_code": "fa",
                        "package": "ir.medu.shad",
                        "platform": "Android"
                    },
                    ...data,
                    "method": method
                }
            }
            request(options, (error, res, body) => {
                if (error) {
                    reject("API-Error: " + error)
                    dialog.showMessageBoxSync({type: 'error', message: error.toString() + ", Please try again.", title: "API Error"});
                } 
                resolve(body)
            })
        //})
    })
}