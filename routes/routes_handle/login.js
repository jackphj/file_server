const crypto = require('crypto');
const userCheck = require("../../components/user_control/userCheck");
const verify = require("../../components/id-verify");

async function login(ctx, next) {
    let account = {
        email: ctx.request.body.email
    };
    let pwd = crypto.createHash('md5').update(ctx.request.body.pwd).digest('hex');
    let res = await userCheck(account);
    switch (res) {
        case 101: {
            ctx.body = {
                code: 0,
                msg: 'user not found'
            };
            ctx.status = 400;
            // ctx.throw(400, 'user not found');
            break;
        }
        case 102: {
            ctx.body = {
                code: 0,
                msg: 'multi-user'
            };
            ctx.status = 400;
            // ctx.throw(400, 'multi-user');
            break;
        }
        default: {
            if (res[0].pwd === pwd) {
                let encrypt = await verify.generateToken(account)
                ctx.body = {
                    token: encrypt,
                    name: res[0].name,
                    msg: 'login succeed',
                    code: '1'
                };
                ctx.status = 200;
            } else {
                ctx.body = {
                    code: 0,
                    msg: 'pwd error'
                };
                ctx.status = 400;
                // ctx.throw(400, 'pwd error');
            }
        }
    }
}

module.exports = login