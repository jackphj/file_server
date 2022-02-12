const Router = require("@koa/router");
const Multer = require('@koa/multer');

const login = require('./routes_handle/login')
const test = require('./routes_handle/test')
const register = require('./routes_handle/register')
const userControl = require('./routes_handle/userControl')
const verify = require("../components/id-verify");

const router = new Router();

/*TODO:
*   1、注册
*   2、管理账户
*   3、文件下载
*/

router
    .get('/', async (ctx, next) => {
        console.log(ctx.request.body);
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

    .post('/test', async (ctx, next) => {
        await test(ctx, next);
        await next();
    })

module.exports = router;