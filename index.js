/*
* 默认启动页
* */

const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const jwt = require('koa-jwt');

const router = require('./routes/router.js');
const mongo = require('./components/mongo');
const startUp = require('./components/firstStart')

const PORT = require('./config').port;
const SECRET = require('./config').tokenSECRET;

const app = new koa();

mongo.mongoDBconnect();


app
    .use((ctx, next) => {                     //handle jwt error (send nothing but an error status)
        return next().catch((err) => {
            if (401 === err.status) {
                ctx.status = 401;
                ctx.body = "Authentication Error"
                console.log('Authentication Error')
            } else {
                throw err;
            }
        });
    })
    .use(jwt({
        secret: SECRET,
        issuer: '公众号:龙之月'
    }).unless({
        path: ['/login', '/register', '/test','/largefile']
    }))
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(PORT, () => {
    console.log("\033[35mFile Server Succeed Run On %d!\033[37m", PORT)
});

startUp().then(() => {
})
