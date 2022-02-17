const fs = require('fs/promises')
const verify = require("../../../components/id-verify");
const config = require("../../../config.json")
const shareMsg = require("./mongoShare")

function getRandomInt() {
    return Math.floor(Math.random() * 9999999);
}

async function shareFile(files) {
    let dir = `${getRandomInt()}`;
    let location = `./storage/share/share-${dir}`;
    let status = false;
    console.log(location)

    while (true) {
        let resFind = await shareMsg.find({location: location + '/'})
        try {
            await fs.access(location);
            dir = `${getRandomInt()}`;
            location = `./storage/share/share-${dir}`;
        } catch (e) {
            if (e.code === "ENOENT") {
                if (resFind.length === 0) {
                    status = true;
                    break;
                } else {
                    dir = `${getRandomInt()}`;
                    location = `./storage/share/share-${dir}`;
                }
            } else {
                dir = `${getRandomInt()}`;
                location = `./storage/share/share-${dir}`;
            }
        }
    }
    if (status === true) {
        try {
            await fs.mkdir(location);
            let nowDate = new Date();
            let fileMsg = {
                location: location + '/',
                out_date: new Date(nowDate.setDate(nowDate.getDate() + 7))
            }
            let fileMsgSave = new shareMsg(fileMsg)
            let resSave = await fileMsgSave.save()
            if (resSave === fileMsgSave) {
                for (let i = 0; i < files.length; i++) {
                    try {
                        await fs.cp(files[i].location, location + '/' + files[i].name, {
                            errorOnExist: true,
                            recursive: true,
                            force: false
                        })
                    } catch (e) {
                        try {
                            await fs.rmdir(location)
                            let resDel = await shareMsg.deleteOne(fileMsg)
                            if (resDel.deletedCount !== 1) {
                                return {code: 102, msg: 'cp rm db error'};
                            }
                        } catch (e) {
                            return {code: 102, msg: 'cp rm error'};
                        }
                        return {code: 102, msg: 'cp error'};
                    }
                }
                let payload = {location: dir}
                return {
                    code: 101,
                    link: config.web_site + ':' + config.port + '/?msg=' + await verify.generateShareToken(payload)
                };
            } else {
                return {code: 102, msg: 'db error'};
            }
        } catch (e) {
            return {code: 102, msg: 'mkdir error'};
        }
    }
}

module.exports = shareFile