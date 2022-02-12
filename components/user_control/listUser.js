const user = require('../mongo').user


/*@name: listUser
* @param:mainUser
* @return
*   code:content
*   101:list without sensitive content
*   102:auth error
*   103:no user
* */

async function listUser(mainUser) {
    let res = {}
    let resFind = await user.find(mainUser);
    if (resFind.length === 1) {
        if (resFind[0].auth === 1 || resFind[0].auth === 2) {
            if (resFind[0].auth === 1 && resFind[0].group === "root") {
                let group = {group: resFind[0].email}
                let resFindUser = await user.find(group)
                if (resFindUser.length > 0) {
                    res.code = 101;
                    res.user = [];
                    resFindUser.forEach((element, index) => {
                        res.user[index] = {
                            name: element.name,
                            auth: element.auth,
                            email: element.email
                        };
                    })
                } else {
                    res.code = 103;
                    return res;
                }
                let group2 = {group: "admin"}
                let resFindUser2 = await user.find(group2)
                if (resFindUser2.length > 0) {
                    res.code = 101;
                    res.userAdmin = [];
                    resFindUser2.forEach((element, index) => {
                        res.userAdmin[index] = {
                            name: element.name,
                            auth: element.auth,
                            email: element.email
                        };
                    })
                } else {
                    res.code = 103;
                    return res;
                }
            }
            let group = {group: resFind[0].auth === 1 ? resFind[0].email : resFind[0].group}
            let resFindUser = await user.find(group)
            if (resFindUser.length > 0) {
                res.code = 101;
                res.user = [];
                resFindUser.forEach((element, index) => {
                    res.user[index] = {
                        name: element.name,
                        auth: element.auth,
                        email: element.email
                    };
                })
                return res;
            } else {
                res.code = 103;
                return res;
            }
        } else {
            res.code = 102;
            return res;
        }
    } else {
        res.code = 102;
        return res;
    }
}

module.exports = listUser