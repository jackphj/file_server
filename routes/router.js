const Router = require("@koa/router");
const Multer = require('@koa/multer');

const login = require('./routes_handle/login')
const test = require('./routes_handle/test')
const register = require('./routes_handle/register')
const userControl = require('./routes_handle/userControl')
const smallfile = require('./routes_handle/samllfile')
const largefile = require('./routes_handle/largefile')
const fileControl = require('./routes_handle/fileControl')
const download = require('./routes_handle/download')
const share = require('./routes_handle/share')
const shareDownload = require('./routes_handle/shareDownload')

const router = new Router();
const multer = new Multer({dest: 'temp/', limits: {fileSize: 10 * 1024 * 1024}})

/*TODO:
*   1、注册
*   2、管理账户
*   3、文件下载
*/

router
    .get('/', async (ctx, next) => {
        console.log(ctx.request);
        ctx.status = 200;
        ctx.body = "111";
        await next();
    })
    .post('/login', async (ctx, next) => {
        await login(ctx, next);
        await next();
    })
    .post('/register', async (ctx, next) => {
        await register(ctx, next);
        await next();
    })
    .post('/userControl', async (ctx, next) => {
        await userControl(ctx, next)
        await next();
    })
    .post('/smallfile', multer.fields([
        {name: "files", maxCount: 9}
    ]), async (ctx, next) => {
        await smallfile(ctx, next);
        await next();
    })
    .post('/largefile', async (ctx, next) => {
        await largefile(ctx, next);
        await next();
    })
    .post('/fileControl', async (ctx, next) => {
        await fileControl(ctx, next);
        await next();
    })
    .post('/download', async (ctx, next) => {
        await download(ctx, next);
        await next();
    })
    .post('/share', async (ctx, next) => {
        await share(ctx, next);
        await next();
    })
    .post('/shareDownload', async (ctx, next) => {
        await shareDownload(ctx, next);
        await next();
    })
    .post('/test', async (ctx, next) => {
        console.log(ctx.request)
        await test(ctx, next);
        await next();
    })


module.exports = router;