const fs = require("fs/promises");

async function deleteFileDir(file) {
    let status = false;
    for (let i = 0; i < file.length; i++) {
        try {
            await fs.access(file[i]);
            try {
                await fs.rm(file[i],{recursive: true});
                status = true;
            } catch (e) {
                return {code: 103, msg: 'delete file/DIR error'};
            }

        } catch (e) {
            return {code: 102, msg: 'file/DIR not exist'};
        }
    }
    if (status === true)
        return {code: 101, msg: 'delete file/DIR succeed'};
}

module.exports = deleteFileDir