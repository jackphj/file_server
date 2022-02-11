/*@name: validation
* @param: user
* @return
*   101: need name
*   102: need auth
*   103: need pwd
*   104: need email
*   105: need group
*   106: need location
* */

async function validation(user) {
    let result = user.validateSync()

    let res = {
        num: 0,
        name:[],
        code:[]
    };
    let i = 0;

    if (result !== undefined) {
        let regExpName = /name/
        let regExpAuth = /auth/
        let regExpPwd = /pwd/
        let regExpEmail = /email/
        let regExpGroup = /group/
        let regExpLocation = /location/

        if (regExpName.test(result.message)) {
            res.num += 1;
            res.name[i] = '`name` is required';
            res.code[i] = 101
            i++;
            console.log('`name` is required');
        }
        if (regExpAuth.test(result.message)) {
            res.num += 1;
            res.name[i] = '`auth` is required';
            res.code[i] = 102
            i++;
            console.log('`auth` is required');
        }
        if (regExpPwd.test(result.message)) {
            res.num += 1;
            res.name[i] = '`pwd` is required';
            res.code[i] = 103
            i++;
            console.log('`pwd` is required');
        }
        if (regExpEmail.test(result.message)) {
            res.num += 1;
            res.name[i] = '`email` is required';
            res.code[i] = 104
            i++;
            console.log('`email` is required');
        }
        if (regExpGroup.test(result.message)) {
            res.num += 1;
            res.name[i] = '`group` is required';
            res.code[i] = 105
            i++;
            console.log('`group` is required');
        }
        if (regExpLocation.test(result.message)) {
            res.num += 1;
            res.name[i] = '`location` is required';
            res.code[i] = 106
            i++;
            console.log('`location` is required');
        }
    }
    return res;
}

module.exports = validation