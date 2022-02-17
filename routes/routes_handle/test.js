const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const fs = require('fs/promises');

const mongoTest = require('../../components/user_control/test')
const userCheck = require("../../components/user_control/userCheck");
const verify = require("../../components/id-verify");

let FirstUse = require('../../config').firstUse;

var FormData = require('form-data');
const busboy = require("busboy");

const listDir = require('../../components/file_control/listDir')
const newDir = require('../../components/file_control/newDir')

function getRandomInt() {
    return Math.floor(Math.random() * 9999999);
}

let fileName = [];

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

    // const dir = await fs.opendir('./storage/1234567@163.com');
    // console.log(dir)
    // for await (const dirent of dir)
    //     console.log(dirent);

    // const fd = await fs.open('./storage/12345678@163.com/');
    // const Name = "1.png";
    // const Size = (await fd.stat()).size;
    // const fileReadStream = await fd.createReadStream()
    //
    // ctx.set('Content-Disposition', 'attachment; filename=' + Name)
    // ctx.set('Content-type', 'application/force-download')
    // ctx.set('Content-Length', Size)
    // ctx.body = fileReadStream

    // const file = ctx.request.files
    // console.log(file)
    // const fileReader = fs.createReadStream(file.path);
    // const filePath = path.join(__dirname, '/storage/12345678@qq.com/');
    // const fileResource = filePath + `/${file.name}`;
    // // const fileResource = './' + `/${file.name}`;
    // const writeStream = fs.createWriteStream(fileResource);
    // fileReader.pipe(writeStream);
    // ctx.body = {
    //     url: uploadUrl + `/${file.name}`,
    //     code: 0,
    //     message: '上传成功'
    // };

    // for (let i = 0; i < ctx.request.files.files.length; i++) {
    //     try {
    //         await fs.copyFile(ctx.request.files.files[i].path, './storage/12345678@qq.com/' + ctx.request.body.location + ctx.request.files.files[i].originalname)
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }
    // console.log(ctx.request.body.location)

    // for (let i = 0; i < ctx.request.files.files.length; i++) {
    //     try {
    //         await fs.copyFile(ctx.request.files.files[i].path, './storage/12345678@qq.com/' + ctx.request.body.location + ctx.request.files.files[i].originalname);
    //         try {
    //             await fs.rm(ctx.request.files.files[i].path)
    //             ctx.body = {
    //                 code: 101,
    //                 msg: 'upload succeed!'
    //             };
    //         } catch (e) {
    //             ctx.body = {
    //                 code: 0,
    //                 msg: 'upload failed!'
    //             };
    //         }
    //     } catch (e) {
    //         ctx.body = {
    //             code: 0,
    //             msg: 'upload failed!'
    //         };
    //         console.log(e);
    //     }
    // }

    // const bb = busboy({headers: ctx.headers})
    //
    // let i = 0;
    // bb.on('file', (name, file, info) => {
    //     const {filename, encoding, mimeType} = info;
    //     // console.log(info)
    //     // console.log(
    //     //     `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
    //     //     filename,
    //     //     encoding,
    //     //     mimeType
    //     // );
    //
    //     file.pipe(fs.createWriteStream('./temp/aaa/' + `busboy-upload-${getRandomInt()}`))
    //     file
    //         .on('data', (data) => {
    //
    //             console.log(`File [${name}] got ${data.length} bytes,上传。。。`);
    //         })
    //         .on('end', () => {
    //             // fileName[i] = filename;
    //             // i++;
    //             // console.log(filename)
    //             fileName[i++]=info.filename
    //             console.log(`上传成功`);
    //         });
    // });
    // bb.on('field', (name, val, info) => {
    //     console.log(`Field [${name}]: value: %j`, val);
    // });
    // bb.on('finish', () => {
    //     console.log('结束!');
    //     console.log(fileName);
    //     // ctx.status = 200;
    //     // ctx.body = {code: 101, msg: 'upload'}
    //     return {code: 101, msg: 'upload'}
    //     // ctx.status=400
    // });
    // ctx.req.pipe(bb);

    // ctx.body = {code: 101, msg: 'upload'}

    // if (a === 1)
    //     ctx.body = {code: 101, msg: 'upload'}


    // let responseHeader = new FormData()
    // responseHeader.append("myFile",'./storage/12345678@163.com/1.png')
    // responseHeader.append("myFile2",'./storage/12345678@163.com/test1.txt')
    // ctx.type='multipart/mixed'
    // ctx.append("myFile",fs.createReadStream('./storage/12345678@163.com/1.png'),'1.png' )
    // ctx.append("myFile2",fs.createReadStream('./storage/12345678@163.com/test1.txt'),'test1.txt')

    // const fd = await fs.open('./storage/12345678@163.com/1.png');
    // // Create a stream from some character device.
    // const stream = fd.createReadStream();
    // ctx.body = stream
    // setTimeout(() => {
    //     stream.close(); // This may not close the stream.
    //     // Artificially marking end-of-stream, as if the underlying resource had
    //     // indicated end-of-file by itself, allows the stream to close.
    //     // This does not cancel pending read operations, and if there is such an
    //     // operation, the process may still not be able to exit successfully
    //     // until it finishes.
    //     stream.push(null);
    //     stream.read(0);
    // }, 100);

    // try {
    //     const dir = await fs.opendir('./storage/12345678@163.com');
    //     for await (const dirent of dir) {
    //         console.log(dirent.name)
    //         console.log(dirent.isDirectory());
    //     }
    //
    // } catch (err) {
    //     console.error(err);
    // }

    // for (const file of list)
    //     console.log(file==='storage');

    // try {
    //     await fs.access('./storage/12345678@qq.com/')
    // } catch (e) {
    //     console.log(e.code === "ENOENT");
    // }
    //
    // let d = new Date()
    // let r = new Date(d.setDate(d.getDate() - 17))
    // console.log(r)
    ctx.status = 200;


}

module.exports = test