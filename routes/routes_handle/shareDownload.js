const verify = require("../../components/id-verify");
const downloadFiles = require("../../components/file_control/downloadFiles");
const fs = require('fs/promises')
/*
* {
*   name:[]
* }
* */

async function shareDownload(ctx, next) {
    let location_default = (await verify.verifyShareToken(ctx, next)).location;
    let location_dir = ctx.request.body.location
    let location = `./storage/share/share-${location_default}/${location_dir}`
    let files = [];
    for (let i = 0; i < ctx.request.body.name.length; i++) {
        let file_location = location + ctx.request.body.name[i].name
        files[i] = {
            name: ctx.request.body.name[i].name,
            dir : (await fs.stat(file_location)).isDirectory(),
            location: file_location
        }
    }
    // console.log(files)
    await downloadFiles(ctx, files);

}

module.exports = shareDownload