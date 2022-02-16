const fs = require("fs/promises");

async function deleteFile(file) {
    try {
        await fs.access(file);
        try {
            await fs.rm(file);
            return {code: 101, msg: 'delete file succeed'};
        } catch (e) {
            return {code: 103, msg: 'delete file error'};
        }

    } catch (e) {
        return {code: 102, msg: 'file not exist'};
    }

}

module.exports = deleteFile