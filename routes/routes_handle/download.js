const verify = require("../../components/id-verify");
const userCheck = require("../../components/user_control/userCheck");
const downloadFiles = require("../../components/file_control/downloadFiles")

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
                    files[i] = {
                        name: ctx.request.body.name[i],
                        location: dir + '/' + ctx.request.body.name[i]
                    }
                }
                await downloadFiles(ctx, files);
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