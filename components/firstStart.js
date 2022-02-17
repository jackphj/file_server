const fs = require('fs/promises')
const firstUse = require('../config.json').firstUse

//TODO:fix fs/promise problem

async function startUp() {
    let lists = await fs.opendir('./')
    let status_storage = false;
    let status_temp = false;
    for await(const file of lists) {
        if (file.name === 'storage' && file.isDirectory()) {
            status_storage = true;
        }
        if (file.name === 'temp' && file.isDirectory()) {
            status_temp = true;
        }
    }

    let lists2 = await fs.opendir('./storage')
    let status_share = false;
    for await (const dirent of lists2) {
        if (dirent.name === 'share' && dirent.isDirectory()) {
            status_share = true;
        }
    }

    if (status_storage === false) {
        let res1 = await fs.mkdir('./storage');
        if (res1 === undefined) {
            status_storage = true;
            console.log("\033[35mStorage Fold Create Complete!\033[37m");
        } else {
            status_storage = false;
            console.log("First Start Error!: " + res1);
        }
    }

    if (status_temp === false) {
        let res = await fs.mkdir('./temp');
        if (res === undefined) {
            status_temp = true;
            console.log("\033[35mTemp Fold Create Complete!\033[37m");
        } else {
            status_temp = false;
            console.log("First Start Error!: " + res);
        }
    }

    if (status_share === false) {
        let res = await fs.mkdir('./storage/share');
        if (res === undefined) {
            status_share = true;
            console.log("\033[35mShare Fold Create Complete!\033[37m");
        } else {
            status_share = false;
            console.log("First Start Error!: " + res1);
        }
    }

    if (status_storage && status_temp && status_share) {
        console.log("\033[35mFirst Start Up Process Complete!\033[37m");
    } else {
        console.log("First Start Error!: " + res);
    }
}

module.exports = startUp