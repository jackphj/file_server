const verify = require("../../components/id-verify");
const listDir = require("../../components/file_control/listDir")

async function share(ctx, next) {
    let location = (await verify.verifyShareToken(ctx, next)).location;
    ctx.body = listDir(location);
}

module.exports = share