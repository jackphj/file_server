const fs = require("fs/promises");

async function newDir(location) {
    try {
        await fs.access(location);
        return {code: 102, msg: 'dir exist'};
    } catch (e) {
        try {
            await fs.mkdir(location);
            return {code: 101, msg: 'dir created'};
        } catch (e) {
            return {code: 103, msg: 'create dir error'};
        }
    }

}

module.exports = newDir