const fs = require("fs/promises");

async function deleteDir(location) {
    try {
        await fs.access(location);
        try {
            await fs.rmdir(location);
            return {code: 101, msg: 'delete dir succeed'};
        } catch (e) {
            return {code: 103, msg: 'delete dir error'};
        }

    } catch (e) {
        return {code: 102, msg: 'dir not exist'};
    }

}

module.exports = deleteDir