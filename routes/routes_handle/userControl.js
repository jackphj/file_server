const listUser = require('../../components/user_control/listUser')
const delUser = require('../../components/user_control/delUser')
const verify = require("../../components/id-verify");

/*@name:userControl
* operate:
*   1:list
*   2:delete
*   TODO:reset password
*
* {
*   operate:1/2/...,
*   userDel:{
*       name:"",
*       auth:1/2/3/4,
*       email:"123456@123.com"
*   }
* }
* */

async function userControl(ctx, next) {
    let mainUser = {
        email: (await verify.verifyToken(ctx, next)).email
    }
    if (ctx.request.body.operate === 1) {
        let res = await listUser(mainUser)
        ctx.body = res;
    } else if (ctx.request.body.operate === 2) {
        let userDel = {
            name: ctx.request.body.userDel.name,
            email: ctx.request.body.userDel.email,
            auth: ctx.request.body.userDel.auth
        }
        let res = await delUser(mainUser, userDel);
        ctx.body = res;
    } else {
        ctx.body = {
            code: 201,
            meg: "unknow operate"
        }
    }

    ctx.status = 200
}

module.exports = userControl