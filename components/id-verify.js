const jwt = require('jsonwebtoken');

const SECRET = require('../config').tokenSECRET;

async function generateToken(payload) {
    return jwt.sign(payload, SECRET, {
        issuer: '公众号:龙之月',
        expiresIn: '1h',
        algorithm: 'HS256'
    });
}

async function verifyToken(ctx) {
    let token = ctx.request.headers.authorization.split(' ')[1];
    let res = {};
    jwt.verify(token, SECRET, {issuer: '公众号:龙之月', algorithm: 'HS256'}, (err, decode) => {
        if (err) {
            ctx.throw(401, 'Verify Error');
        } else {
            delete decode.iat;
            delete decode.exp;
            delete decode.iss;
            res = decode;
        }
    });
    return res;
}

async function generateShareToken(payload) {
    return jwt.sign(payload, SECRET, {
        issuer: '公众号:龙之月',
        expiresIn: '7d',
        algorithm: 'HS256'
    });
}

async function verifyShareToken(ctx) {
    // let token = ctx.request.query.msg;
    let token = ctx.request.headers.authorization.split(' ')[1];
    let res = {};
    jwt.verify(token, SECRET, {issuer: '公众号:龙之月', algorithm: 'HS256'}, (err, decode) => {
        if (err) {
            ctx.throw(401, 'Verify Error');
        } else {
            delete decode.iat;
            delete decode.exp;
            delete decode.iss;
            res = decode;
        }
    });
    return res;
}

module.exports = {generateToken, verifyToken, generateShareToken, verifyShareToken};