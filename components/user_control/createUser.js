const vaidation = require("./validation");
let FirstUse = require('../../config').firstUse;
let validation =require('./validation')
const user = require('../mongo').user

/*@name:createUser
* @param
*   mainUser : 申请创建的用户  {email:required}
*   newUser : 要创建的用户  {name,pwd,auth,email} === userSchema
* @return
*   101: succeed
*   102: main user error
*   103: new user exist
*   104: new user error
*   105: no auth
*   106: else error
* */
async function createUser(mainUser, newUser) {

    //check user
    let res = await validation(newUser);
    if(res.num!==0){
        return 103;
    }

    //check if user exist
    let isNew = false;
    try {
        let res = await user.find(newUser)
        if (res.length === 0) {
            isNew = true;
        } else {
            console.log("用户已存在 User already exists");
            return 103;
        }
    } catch (err) {
        console.log(err);
        return 106;
    }

    //check first use 检测是否第一次进入
    if (FirstUse === 1) {
        newUser.group = "admin";
        try {
            let res = await newUser.save()
            if (res === newUser) {
                FirstUse = 0;
                console.log("成功 Succeed")
                return 101;
            }
        } catch (err) {
            console.log(err);
            return 106;
        }
    }

    //create new user
    else {
        newUser.group = mainUser.email;

        //main user auth check & check main user whether legal or not
        let Auth = 0;
        user.find(mainUser).then((userCheck) => {
            if (userCheck.length > 1) {
                console.log("多个相同账户 Muti main user")
                return 102;
            } else if (userCheck.length < 1) {
                console.log("无此账号 No main user")
                return 102;
            } else {
                Auth = userCheck.auth;
            }
        }).catch((err) => {
            console.log(err);
            return 106;
        });


        //user auth check
        if (newUser.auth >= mainUser.auth && (newUser.auth === 1 || newUser.auth === 2)) {
            user.save(newUser).then((res) => {
                if (res === newUser) {
                    console.log("成功 Succeed")
                    return 101;
                } else {
                    console.log("其他问题 Else error")
                    return 107;
                }
            }).catch((err) => {
                console.log(err);
                return 106;
            })
        } else {
            console.log("权限不足 Insufficient permissions");
            return 105;
        }
    }
}

module.exports = createUser