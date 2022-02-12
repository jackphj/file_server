const fs = require('fs/promises')
const firstUse = require('../config.json').firstUse

async function startUp() {
    let lists = await fs.readdir('./')
    let status = false;
    for (const file of lists) {
        if (file === 'storage') {
            status = true;
        }
    }

    if (status === false) {
        let res = await fs.mkdir('./storage');
        if (res === undefined) {
            console.log("\033[35mFirst Start Up Process Complete!\033[37m");
        } else {
            console.log("First Start Error!: " + res);
        }
    }
}

module.exports = startUp