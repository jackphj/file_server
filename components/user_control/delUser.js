const fs = require('fs/promises')
const user = require('../mongo').user


/*@name:delUser
* @usage:delete user and group
* @param
*   mainUser : admin
*   userDel : user to be delete
* @return
*   101: succeed
*   102: main user error
*   103: user error
*   104: auth error
*   105: else error
*  */
async function delUser(mainUser, userDel) {
    let res = {};
    let resFind = await user.find(mainUser);
    let resFindDel = await user.find(userDel);

    if (resFindDel.length !== 1) {

        res.code = 103;
        res.msg = 'user error';

    } else {
        if (resFind.length === 1) {

            if (resFind[0].auth === 1) {
                if (resFindDel[0].auth === 1 && resFind[0].group === "root" && resFindDel[0].group === "admin") {       //delete admin
                    let res1 = await user.deleteOne(userDel);
                    if (res1.deletedCount === 1) {
                        res.code = 101;
                        res.msg = 'succeed';
                    } else {
                        res.code = 105;
                        res.msg = 'else error';
                    }

                    if (res.code === 101) {
                        let res1 = await fa.rmdir('./storage/' + resFindDel[0].email)
                        if (res1 === undefined) {
                            res.code = 101;
                            res.msg = 'succeed delete';
                        } else {
                            let recover = new user(resFindDel[0]);
                            let res1 = await recover.save();
                            if (res1 === resFindDel[0]) {
                                res.code = 106;
                                res.msg = 'recover';
                            } else {
                                res.code = 105;
                                res.msg = 'else error';
                            }
                        }
                    }

                    let res2 = await user.deleteMany({group: resFindDel[0].email})
                    if (res2.deletedCount >= 0) {
                        res.code = 101;
                        res.msg = 'succeed';
                    } else {
                        res.code = 105;
                        res.msg = 'else error';
                    }


                } else if (resFindDel[0].auth !== 1) {                                                                  //delete else
                    let res1 = await user.deleteOne(userDel);
                    if (res1.deletedCount === 1) {
                        res.code = 101;
                        res.msg = 'succeed';
                    } else {
                        res.code = 105;
                        res.msg = 'else error';
                    }
                } else {
                    res.code = 104;
                    res.msg = 'auth error';
                }

            } else if (resFind[0].auth === 2) {                                                                         //delete else
                if (resFindDel[0].auth > resFind[0].auth && resFindDel[0].group === resFind[0].group) {
                    let res1 = await user.deleteOne(userDel);
                    if (res1.deletedCount === 1) {
                        res.code = 101;
                        res.msg = 'succeed';
                    } else {
                        res.code = 105;
                        res.msg = 'else error';
                    }
                } else {
                    res.code = 104;
                    res.msg = 'auth error';
                }
            } else {
                res.code = 104;
                res.msg = 'auth error';
            }

        } else {
            res.code = 102;
            res.msg = 'main user error';
        }
    }

}

module.exports = delUser