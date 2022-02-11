const crypto = require('crypto');
const userCheck = require("../../components/user_control/userCheck");
const verify = require("../../components/id-verify");

async function login(ctx, next) {
    let account = {
        name: ctx.request.body.name
    };
    let pwd = crypto.createHash('md5').update(ctx.request.body.pwd).digest('hex');
    let res = await userCheck(account);
    switch (res) {
        case 101: {
            ctx.throw(400, 'user not found');
            break;
        }
        case 102: {
            ctx.throw(400, 'multi-user');
            break;
        }
        default: {
            if (res[0].pwd === pwd) {
                let encrypt = await verify.generateToken(account)
                ctx.body = {
                    token: encrypt,
                    msg: 'login succeed',
                    code: '1'
                };
                ctx.status = 200;
            } else {
                ctx.throw(400, 'pwd error');
            }
        }
    }
}

module.exports = login