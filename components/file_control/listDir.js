const fs = require("fs/promises");

async function listDir(location) {
    try {
        let dir = await fs.opendir(location);
        let files = [], i = 0;
        for await (const dirent of dir) {
            let fileStat = await fs.stat(location + '/' + dirent.name)
            files[i++] = {
                name: dirent.name,
                dir: dirent.isDirectory() ? 1 : 0,
                size: fileStat.size
            }
        }
        return files
    } catch (e) {
        return {code: 102, msg: 'read dir error'}
    }

}

module.exports = listDir