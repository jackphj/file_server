const fs = require("fs/promises");

async function moveFile(file, location) {
    try {
        await fs.access(file);
        try {
            console.log(file);
            console.log(location)

            await fs.copyFile(file, location);
            try {
                await fs.rm(file);
                return {code: 101, msg: 'move file succeed'};
            } catch (e) {
                return {code: 103, msg: 'move file error1'};
            }
        } catch (e) {
            return e;
        }

    } catch (e) {
        return {code: 102, msg: 'file not exist'};
    }

}

module.exports = moveFile