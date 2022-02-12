const user = require('../mongo').user
const crypto = require('crypto');
const validation = require('./validation')
let FirstUse = require('../../config').firstUse;

/*@name:test
* @param
*   accout
* */
async function test() {
    // let temp = new user({
    //     name: "aaa",
    //     auth: 1,
    //     pwd: crypto.createHash('md5').update("test").digest('hex'),
    //     email: '12345678@qq.com',
    //     group: 'admin',
    //     location: '/'
    // });


    // let temp2 = {
    //     name: "caa"
    //     //pwd: crypto.createHash('md5').update("test").digest('hex'),
    // }

    // let a = await validation(temp)
    // console.log(a.num===0)
    // let err = temp.validateSync();
    // return temp.validateSync()
    // if (err !== undefined) {
    //     console.log(err.errors['email'].message);
    //     return err.errors['auth'].message
    //
    // }

    // console.log(err)

    // let res = await temp.save();
    // if (res === temp) {
    //     console.log(res)
    // }


    // let res = await user.find(temp2);
    // console.log(res.length)
    // if (res.length === 0) {
    //     new Error("user not found");
    //     return 102;
    // } else if (res.length > 1) {
    //     console.log("multi-user error");
    //     return 103;
    // } else {
    //     console.log(res)
    //     return res;
    // }

    let temp3 = {
        name: "qq_2_test3",
        email: "12345@qq.com"
    }
    let res = await user.deleteOne(temp3)
    return res

    //return 'succeed test!';


}

module.exports = test;