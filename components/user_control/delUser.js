const user = require('../mongo').user

/*@name:delUser
* @usage:delete user and group
* @param
*   mainUser : admin
*   userDel : user to be delete
* @return
*   201: succeed
*   202: main user error
*   203: user error
*   204: auth error
*  */
async function delUser(mainUser, userDel) {
    /*if (mianUser == null) {
        //let result = await user.deleteOne()
    }*/

    //main user auth check & check main user whether legal or not
    let Auth = 0;
    let group = "";
    user.find(mainUser).then((userCheck) => {
        if (userCheck.length > 1) {
            console.log("多个相同账户 Muti main user")
            return 202;
        } else if (userCheck.length < 1) {
            console.log("无此账号 No main user")
            return 202;
        } else {
            Auth = userCheck.auth;
            group = userCheck.email;
        }
    }).catch((err) => {
        console.log(err);
    });

    user.find(userDel).then((res) => {
        if (res.length === 1) {
            if (res.email !== group) {
                console.log("没有权限 Insufficient permissions")
                return 204;
            }
        } else if (res > 1) {
            console.log("多个相同账户 Muti user");
            return 203;
        } else {
            console.log("用户不存在 User not exists");
            return 203;
        }
    }).catch((err) => {
        console.log(err);
    });

    //delete and user which it create
    user.find({group: group}).then((res) => {

        for (let userToDel in res) {
            user.delete(userToDel.toObject).then((result) => {
                if (result === userToDel) {
                    console.log("成功 Succeed")
                    return 101;
                } else {
                    console.log("其他问题 Else error")
                    return 107;
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    })


}

module.exports={delUser}