const verify = require("../../components/id-verify");
const downloadFiles = require("../../components/file_control/downloadFiles");

/*
* {
*   name:[]
* }
* */

async function shareDownload(ctx, next) {
    let location = (await verify.verifyShareToken(ctx, next)).location;
    let files = [];
    for (let i = 0; i < ctx.request.body.name.length; i++) {
        files[i] = {
            name: ctx.request.body.name[i],
            location: location + ctx.request.body.name[i]
        }
    }
    await downloadFiles(ctx, files);

}

module.exports = shareDownload