const crypto = require('crypto');
const fs = require('fs/promises')
const verify = require('../../components/id-verify')
const createUser = require('../../components/user_control/createUser')

let FirstUse = require('../../config').firstUse;

async function register(ctx, next) {

    let account = {
        name: ctx.request.body.name,
        pwd: crypto.createHash('md5').update(ctx.request.body.pwd).digest('hex'),
    };

    if (FirstUse === 1) {
        let res = await createUser(null, account);
        if (res === 100) {

        } else if (res === 101) {

        }
        let configfile = await fs.readFile('../../config.json', 'utf-8')
        let jsonFile = JSON.parse(configfile.toString())
        jsonFile.firstUse = 1
        let save_res = await fs.writeFile('./config.json', JSON.stringify(jsonFile, null, '\t'))
    } else {
        FirstUse = 0;
        let mainUser = {
            name: (await verify.verifyToken(ctx, next)).name
        }
        let res = await createUser(mainUser, account);
        if (res === 100) {

        } else if (res === 101) {

        }
    }
}

module.exports = register

