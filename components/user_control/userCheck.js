const user = require('../mongo').user

/*@name:userCheck
* @param
*   account : 用户信息
* @return
*   res: result
*   101: user not found
*   102: multi-user error
* */
async function userCheck(account) {
    let res = await user.find(account);
    if (res.length === 0) {
        console.log("\x1B[31mUser Not Found\x1B[37m");
        return 101;
    } else if (res.length >= 2) {
        console.log("\x1B[31mMulti-User Error!\x1B[37m");
        return 102;
    } else {
        return res;
    }
}

module.exports = userCheck