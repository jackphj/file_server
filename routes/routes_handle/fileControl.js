const verify = require("../../components/id-verify");
const userCheck = require("../../components/user_control/userCheck");
const listDir = require('../../components/file_control/listDir')
const newDir = require('../../components/file_control/newDir')
const moveFile = require('../../components/file_control/moveFile')
const deleteFileDir = require('../../components/file_control/deleteFileDir')
const shareFile = require('../../components/file_control/share/shareFile')

/*@name:userControl
* operate:
*   1:list dir
*   2:new dir
*   3:move file
*   4:delete file/dir
*   5:file share
*   TODO:share link
*
* {
*   operate:1/2/...,
*   location:'aaaa/',
*   file:[]
*   new_location:''
* }
* */

async function fileControl(ctx, next) {
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
                let operate = ctx.request.body.operate;
                let location = ctx.request.body.location;
                let dir = './storage/' + dirBase + '/' + location;

                switch (operate) {
                    case 1: {
                        ctx.body = await listDir(dir);
                        break;
                    }
                    case 2: {
                        if (mainUser[0].auth < 4) {
                            console.log(dir)
                            ctx.body = await newDir(dir);
                        } else {
                            ctx.body = {
                                code: 104,
                                msg: 'auth error'
                            };
                        }
                        break;
                    }
                    case 3: {
                        if (mainUser[0].auth < 4) {
                            let file = [], newLocation = [];
                            for (let i = 0; i < ctx.request.body.file.length; i++) {
                                file[i] = dir + ctx.request.body.file[i];
                                newLocation[i] = './storage/' + dirBase + '/' + ctx.request.body.new_location + '/' + ctx.request.body.file[i];
                            }
                            ctx.body = await moveFile(file, newLocation);
                        } else {
                            ctx.body = {
                                code: 104,
                                msg: 'auth error'
                            };
                        }
                        break;
                    }
                    case 4: {
                        if (mainUser[0].auth < 4) {
                            let file = [];
                            for (let i = 0; i < ctx.request.body.file.length; i++) {
                                file[i] = dir + ctx.request.body.file[i];
                            }
                            ctx.body = await deleteFileDir(file);
                        } else {
                            ctx.body = {
                                code: 104,
                                msg: 'auth error'
                            };
                        }
                        break;
                    }
                    case 5: {
                        let file = [];
                        for (let i = 0; i < ctx.request.body.file.length; i++) {
                            file[i] = {
                                location: dir + ctx.request.body.file[i],
                                name: ctx.request.body.file[i]
                            };
                        }
                        console.log(file)
                        console.log(await shareFile(file));
                        break;
                    }
                    default: {
                        ctx.body = {
                            code: 105,
                            msg: 'unknow operation'
                        };
                    }
                }
            } else {
                ctx.body = {
                    code: 104,
                    msg: 'auth error'
                };
            }
            ctx.status = 200;
        }
    }
}

module.exports = fileControl