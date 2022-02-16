const fs = require('fs/promises')

const verify = require("../../components/id-verify");
const userCheck = require("../../components/user_control/userCheck")


async function smallfile(ctx, next) {
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
            if (mainUser[0].auth < 4 && mainUser[0].auth >= 1) {
                let dir = mainUser[0].auth === 1 ? mainUser[0].email : mainUser[0].group;
                for (let i = 0; i < ctx.request.files.files.length; i++) {
                    try {
                        await fs.copyFile(ctx.request.files.files[i].path, './storage/' + dir + '/' + ctx.request.body.location + ctx.request.files.files[i].originalname);
                        try {
                            await fs.rm(ctx.request.files.files[i].path)
                            ctx.body = {
                                code: 101,
                                msg: 'upload succeed!'
                            };
                        } catch (e) {
                            ctx.body = {
                                code: 0,
                                msg: 'upload failed!'
                            };
                        }
                    } catch (e) {
                        ctx.body = {
                            code: 0,
                            msg: 'upload failed!'
                        };
                        console.log(e);
                    }
                }
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

module.exports = smallfile