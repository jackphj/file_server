const fs = require('fs/promises')
const firstUse = require('../config.json').firstUse

//TODO:fix fs/promise problem

async function startUp() {
    let lists = await fs.readdir('./')
    let status_storage = false, status_temp = false;
    let status = false;

    for (const file of lists) {
        if (file === 'storage') {
            status_storage = true;
        }
        if (file === 'temp') {
            status_temp = true;
        }
    }

    if (status_storage === false) {
        let res = await fs.mkdir('./storage');
        if (res === undefined) {
            status_storage = true;
            console.log("\033[35m storage Fold Create Complete!\033[37m");
        } else {
            status_storage = false;
            console.log("First Start Error!: " + res);
        }
    }

    if (status_temp === false) {

        let res = await fs.mkdir('./temp');
        if (res === undefined) {
            status_temp = true;
            console.log("\033[35m temp Fold Create Complete!\033[37m");
        } else {
            status_temp = false;
            console.log("First Start Error!: " + res);
        }
    }

    status = status_storage && status_temp;

    if (status === true) {
        console.log("\033[35mFirst Start Up Process Complete!\033[37m");
    } else {
        console.log("First Start Error!: " + res);
    }
}

module.exports = startUp