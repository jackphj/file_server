const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const fs = require('fs/promises');

const mongoTest = require('../../components/user_control/test')
const userCheck = require("../../components/user_control/userCheck");
const verify = require("../../components/id-verify");

let FirstUse = require('../../config').firstUse;


async function test(ctx, next) {
    // let res = await mongoTest()
    // console.log(res.deletedCount)
    // ctx.body = res
    // FirstUse = 0;

    // let account = {
    //     name: ctx.request.body.name
    // };
    // let pwd = crypto.createHash('md5').update(ctx.request.body.pwd).digest('hex');
    // let res = await mongo.userCheck(account);
    // switch (res) {
    //     case 101: {
    //         ctx.throw(400, 'user not found');
    //         break;
    //     }
    //     case 102: {
    //         ctx.throw(400, 'multi-user');
    //         break;
    //     }
    //     default: {
    //         if (res[0].pwd === pwd) {
    //             await verify.generateToken(account).then((encrypt) => {
    //                 ctx.body = encrypt;
    //             })
    //         } else {
    //             ctx.body = 'pwd error';
    //         }
    //     }
    // }
    // ctx.status = 200;

    // let decode = (await verify.verifyToken(ctx, next)).name
    //
    // console.log(typeof(decode))


    // let dir = await fs.opendir('./')
    // for await (const dirent of dir)
    //     console.log(dirent.name);

    // let file = await fs.readFile('./config.json', 'utf-8')
    // let jsonFile = JSON.parse(file.toString())
    // jsonFile.firstUse = 1
    // let res = await fs.writeFile('./config.json',JSON.stringify(jsonFile,null,'\t'))
    // console.log(res)
    // console.log(jsonFile.firstUse)

    // let a = {email: "123@ss.com"}
    // a.location = '/'+a.email
    // let res = await fs.mkdir('./storage'+a.location)
    // console.log(res === undefined)

    let res = await fs.rmdir('./storage/12345678@126.com')
    console.log(res)

    // for (const file of list)
    //     console.log(file==='storage');
    ctx.status = 200;
}

module.exports = test