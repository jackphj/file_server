const verify = require("../../components/id-verify");
const listDir = require("../../components/file_control/listDir")

async function share(ctx, next) {
    let location_default = (await verify.verifyShareToken(ctx, next)).location;
    let location = ctx.request.body.location
    ctx.body = await listDir(`./storage/share/share-${location_default}/${location}`);
}

module.exports = share