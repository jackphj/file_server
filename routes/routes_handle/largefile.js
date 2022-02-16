const fs = require('fs')
const busboy = require("busboy");

const verify = require("../../components/id-verify");
const userCheck = require("../../components/user_control/userCheck")

function getRandomInt() {
    return Math.floor(Math.random() * 9999999);
}

async function largefile(ctx, next) {
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
            const bb = busboy({headers: ctx.headers});
            let location = '';
            let fileMsg = [], i = 0;
            bb.on('file', (name, file, info) => {
                const {filename, encoding, mimeType} = info;
                let dir = `./temp/busboy-upload-${getRandomInt()}`;
                file.pipe(fs.createWriteStream(dir))
                file
                    .on('data', (data) => {

                    })
                    .on('end', () => {
                        fileMsg[i++] = {
                            originName: filename,
                            fileName: dir
                        }
                    });
            });
            bb.on('field', (name, val, info) => {
                if (name === 'location') {
                    location = val;
                }
            });
            bb.on('finish', () => {
                if (mainUser[0].auth < 4 && mainUser[0].auth >= 1) {
                    let dir = (mainUser[0].auth === 1 ? mainUser[0].email : mainUser[0].group) + '/' + location;
                    for (let t = 0; t < fileMsg.length; t++) {
                        fs.copyFileSync(fileMsg[t].fileName, './storage/' + dir + fileMsg[t].originName);
                        console.log('save')
                        fs.rmSync(fileMsg[t].fileName);
                    }
                }

            });
            ctx.req.pipe(bb);

            ctx.status = 200;
            ctx.body = {
                code: 101,
                msg: 'upload start'
            }
        }
    }

}

module.exports = largefile