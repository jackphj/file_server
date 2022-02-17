const fs = require("fs/promises");

async function moveFile(file, location) {
    let status = false
    for (let i = 0; i < file.length; i++) {
        try {
            await fs.access(file[i]);
            try {
                await fs.cp(file[i], location[i], {errorOnExist: true, recursive: true, force: false});
                try {
                    await fs.rm(file[i], {recursive: true});
                    status = true;
                } catch (e) {
                    return {code: 103, msg: 'move file error'};
                }
            } catch (e) {
                return {code: 103, msg: 'move file error'};
            }
        } catch (e) {
            return {code: 102, msg: 'file not exist'};
        }
    }
    if (status === true)
        return {code: 101, msg: 'move file succeed'};
}

module.exports = moveFile