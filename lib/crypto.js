const fs = require("fs");
const { exec } = require("child_process");
const Str = require('@supercharge/strings');

function encrypt(auth, data) { 
    return new Promise((resolve, reject) => {
        exec(`lib\\Crypto\\Crypto.exe ${auth} -e ${JSON.stringify(data).replace(/"/g, "\\\"").replace(/ /g, '')}`, (error, stdout, stderr) => {
            if (error) {
                reject(`encrypt error: ${error.message}`)
            }
            if (stderr) {
                reject(`encrypt stderr: ${stderr}`)
            }
            resolve(stdout);
        })
    })
}

function decrypt(auth, data_enc) { 
    return new Promise((resolve, reject) => {
        const tmp_path = __dirname + "\\tmp\\" + Str.random(32)
        fs.writeFile(tmp_path, data_enc.replace(/\n/g, ''), function(err) {
            if (err) {
               return console.log(err)
            }
            exec(`lib\\Crypto\\Crypto.exe ${auth} -d ${tmp_path}`, (error, stdout, stderr) => {
                if (error) {
                    reject(`decrypt error ${error.message}`)
                }
                if (stderr) {
                    reject(`decrypt stderr ${stderr}`)
                }
                fs.unlink(tmp_path, err => err)
                resolve(stdout);
            })
         });
    })
}

exports.encrypt = encrypt;
exports.decrypt = decrypt;