const fs = require('fs/promises')

const user = require('../mongo').user
const validation = require('./validation')

/*@name:createUser
* @param
*   mainUser : 申请创建的用户  {email:required}
*   newUser : 要创建的用户  {name,pwd,auth,email} === userSchema
* @return
*   code:  msg
*       101: succeed
*       102: main user error
*       103: new user exist
*       104: new user error
*       105: no auth
*       106: else error
* */
async function createUser(mainUser, newUserConfig) {

    let res = {code: undefined, meg: ''}

    //first login
    if (mainUser === null) {
        newUserConfig.auth = 1;
        newUserConfig.group = 'admin';
        newUserConfig.location = '/' + newUserConfig.email;

        let newUser = new user(newUserConfig);

        //check user
        let resCheck = await validation(newUser);

        if (resCheck.num !== 0) {
            res.code = 103;
            res.meg = 'new user exist'
            return res;
        } else {
            let resSave = await newUser.save()
            if (resSave === newUser) {
                console.log('New User Created')
                let mkdir = await fs.mkdir('./storage' + newUserConfig.location);
                if (mkdir === undefined) {
                    res.code = 101;
                    res.meg = 'New User Created';
                    console.log('New User Created')
                    return res;
                } else {
                    res.code = 106;
                    res.meg = 'else error';
                    return res;
                }
            } else {
                res.code = 106;
                res.meg = 'else error';
                console.log('new user save error')
                return res;
            }
        }
    } else {                                                      //Not first time
        //find main user detail
        let resFind = await user.find(mainUser)
        //check whether main user exist
        if (resFind.length === 0) {
            res.code = 102;
            res.meg = 'user not found';
            console.log("user not found");
            return res;
        } else if (resFind.length > 1) {                            //check if main user goes wrong
            res.code = 102;
            res.meg = 'multi-user error';
            console.log("multi-user error");
            return res;
        } else {
            //find if a user has same email address
            let checkMulti = {email: newUserConfig.email};
            let resFind_2 = await user.find(checkMulti);
            if (resFind_2.length !== 0) {
                res.code = 104;
                res.meg = 'email exist';
                console.log('email exist');
                return res;
            } else {
                if (resFind[0].auth < 1 || resFind[0].auth > 2 || resFind[0].auth > newUserConfig.auth) {               //user auth control
                    res.code = 105;
                    res.meg = 'no auth';
                    console.log('权限不足 Insufficient permissions');
                    return res;
                } else {
                    if (newUserConfig.auth === 1 && resFind[0].auth) {                                                  //new user is admin(auth=1 create auth=1)
                        newUserConfig.group = 'admin';
                        newUserConfig.location = '/' + newUserConfig.email;
                    } else if (newUserConfig.auth !== 1 && resFind[0].auth < newUserConfig.auth) {                      //new user not admin(auth level higher create auth level lower)
                        newUserConfig.group = resFind[0].email;
                        newUserConfig.location = resFind[0].location;
                    } else {
                        res.code = 105;
                        res.meg = 'no auth';
                        console.log('权限不足 Insufficient permissions');
                        return res;
                    }
                    let newUser = new user(newUserConfig);
                    let resSave = await newUser.save()
                    if (resSave === newUser) {
                        console.log('New User Created')
                        if (newUserConfig.auth === 1) {
                            let mkdir = await fs.mkdir('./storage' + newUserConfig.location);
                            if (mkdir === undefined) {
                                res.code = 101;
                                res.meg = 'New User Created';
                                console.log('New User Created')
                                return res;
                            } else {
                                res.code = 106;
                                res.meg = 'else error';
                                return res;
                            }
                        } else {
                            res.code = 101;
                            res.meg = 'New User Created';
                            console.log('New User Created')
                            return res;
                        }
                    } else {
                        res.code = 106;
                        res.meg = 'new user save error';
                        return res;
                    }
                }
            }


        }
    }


    //check if user exist
    // let isNew = false;
    // try {
    //     let res = await user.find(newUser)
    //     if (res.length === 0) {
    //         isNew = true;
    //     } else {
    //         console.log("用户已存在 User already exists");
    //         return 103;
    //     }
    // } catch (err) {
    //     console.log(err);
    //     return 106;
    // }
    //
    // //check first use 检测是否第一次进入
    // if (FirstUse === 1) {
    //     newUser.group = "admin";
    //     try {
    //         let res = await newUser.save()
    //         if (res === newUser) {
    //             FirstUse = 0;
    //             console.log("成功 Succeed")
    //             return 101;
    //         }
    //     } catch (err) {
    //         console.log(err);
    //         return 106;
    //     }
    // }
    //
    // //create new user
    // else {
    //     newUser.group = mainUser.email;
    //
    //     //main user auth check & check main user whether legal or not
    //     let Auth = 0;
    //     user.find(mainUser).then((userCheck) => {
    //         if (userCheck.length > 1) {
    //             console.log("多个相同账户 Muti main user")
    //             return 102;
    //         } else if (userCheck.length < 1) {
    //             console.log("无此账号 No main user")
    //             return 102;
    //         } else {
    //             Auth = userCheck.auth;
    //         }
    //     }).catch((err) => {
    //         console.log(err);
    //         return 106;
    //     });
    //
    //
    //     //user auth check
    //     if (newUser.auth >= mainUser.auth && (newUser.auth === 1 || newUser.auth === 2)) {
    //         user.save(newUser).then((res) => {
    //             if (res === newUser) {
    //                 console.log("成功 Succeed")
    //                 return 101;
    //             } else {
    //                 console.log("其他问题 Else error")
    //                 return 107;
    //             }
    //         }).catch((err) => {
    //             console.log(err);
    //             return 106;
    //         })
    //     } else {
    //         console.log("权限不足 Insufficient permissions");
    //         return 105;
    //     }
    // }
}

module.exports = createUser