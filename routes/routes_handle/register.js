const crypto = require('crypto');
const fs = require('fs/promises')
const verify = require('../../components/id-verify')
const createUser = require('../../components/user_control/createUser')

let FirstUse = require('../../config').firstUse;

async function register(ctx, next) {

    let account = {
        name: ctx.request.body.name,
        auth: ctx.request.body.auth,
        pwd: crypto.createHash('md5').update(ctx.request.body.pwd).digest('hex'),
        email: ctx.request.body.email
    };

    if (FirstUse === 1) {
        let res = await createUser(null, account);
        if (res.code === 101) {
            ctx.body = res
            let configfile = await fs.readFile('./config.json', 'utf-8')
            let jsonFile = JSON.parse(configfile.toString())
            jsonFile.firstUse = 0
            await fs.writeFile('./config.json', JSON.stringify(jsonFile, null, '\t'))
        } else if (res.code !== 101) {
            console.log(res.msg)
            ctx.body = res
        }
    } else {
        FirstUse = 0;
        let mainUser = {
            email: (await verify.verifyToken(ctx, next)).email
        }
        let res = await createUser(mainUser, account);
        if (res.code === 101) {
            ctx.body = res
        } else if (res.code !== 101) {
            console.log(res.msg)
            ctx.body = res
        }
    }
    ctx.status = 200;
}

module.exports = register

