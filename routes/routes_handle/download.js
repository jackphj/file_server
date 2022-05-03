const verify = require("../../components/id-verify");
const userCheck = require("../../components/user_control/userCheck");
const downloadFiles = require("../../components/file_control/downloadFiles")
const fs = require('fs/promises');

/*{
    name:[]
}*/

async function download(ctx, next) {
    let account = {
        email: (await verify.verifyToken(ctx, next)).email,
    }
    let mainUser = await userCheck(account)
    switch (mainUser) {
        case 101: {
            ctx.throw(400, 'user not found');
            break;
        }
        case 102: {
            ctx.throw(400, 'multi-user');
            break;
        }
        default: {
            if (mainUser[0].auth <= 4 && mainUser[0].auth >= 1) {
                let dirBase = mainUser[0].auth === 1 ? mainUser[0].email : mainUser[0].group;
                let location = ctx.request.body.location;
                let dir = './storage/' + dirBase + '/' + location;
                let files = [];
                for (let i = 0; i < ctx.request.body.name.length; i++) {
                    let file_location = dir + '/' + ctx.request.body.name[i].name
                    files[i] = {
                        name: ctx.request.body.name[i].name,
                        dir : (await fs.stat(file_location)).isDirectory(),
                        location: file_location
                    }
                }
                await downloadFiles(ctx, files);
                // console.log(files)

                // let downloadFilePath = await downloadFiles(ctx, files);
                // if (downloadFilePath) {
                //     ctx.body = fs.createReadStream('./temp/' + downloadFilePath.name)
                //     ctx.set('Content-disposition', 'attachment; filename=' + downloadFilePath.name);
                // }

            } else {
                ctx.body = {
                    code: 102,
                    msg: 'auth error'
                };
            }
            ctx.status = 200;
        }
    }
}

module.exports = download