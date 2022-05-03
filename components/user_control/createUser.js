const fs = require('fs/promises')

const user = require('../mongo').user
const validation = require('./validation')

//TODO:beautify console log meg

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
        newUserConfig.group = 'root';
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
                let mkdir = await fs.mkdir('./storage' + newUserConfig.location);
                if (mkdir === undefined) {
                    res.code = 101;
                    res.meg = 'new user created';
                    return res;
                } else {
                    res.code = 106;
                    res.meg = 'else error';
                    return res;
                }
            } else {
                res.code = 106;
                res.meg = 'else error';
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
            return res;
        } else if (resFind.length > 1) {                            //check if main user goes wrong
            res.code = 102;
            res.meg = 'multi-user error';
            return res;
        } else {
            //find if a user has same email address
            let checkMulti = {email: newUserConfig.email};
            let resFind_2 = await user.find(checkMulti);
            if (resFind_2.length !== 0) {
                res.code = 103;
                res.meg = 'new user exist';
                return res;
            } else {
                if (resFind[0].auth < 1 || resFind[0].auth > 2 || resFind[0].auth > newUserConfig.auth) {               //user auth control
                    res.code = 105;
                    res.meg = 'no auth';
                    return res;
                } else {
                    if (newUserConfig.auth === 1 && resFind[0].auth===1) {                                                  //new user is admin(auth=1 create auth=1)
                        newUserConfig.group = 'admin';
                        newUserConfig.location = '/' + newUserConfig.email;
                    } else if (newUserConfig.auth !== 1 && resFind[0].auth < newUserConfig.auth) {                      //new user not admin(auth level higher create auth level lower)
                        newUserConfig.group = resFind[0].email;
                        newUserConfig.location = resFind[0].location;
                    } else {
                        res.code = 105;
                        res.meg = 'no auth';
                        return res;
                    }
                    let newUser = new user(newUserConfig);
                    let resSave = await newUser.save()
                    if (resSave === newUser) {
                        if (newUserConfig.auth === 1) {
                            let mkdir = await fs.mkdir('./storage' + newUserConfig.location);
                            if (mkdir === undefined) {
                                res.code = 101;
                                res.meg = 'new user created';
                                return res;
                            } else {
                                res.code = 106;
                                res.meg = 'else error';
                                return res;
                            }
                        } else {
                            res.code = 101;
                            res.meg = 'new user created';
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
}

module.exports = createUser