const fs = require('fs');
const archiver = require('archiver');

const archive = archiver('zip', {
    zlib: {level: 9} // Sets the compression level.
});

function getRandomInt() {
    return Math.floor(Math.random() * 9999999);
}

async function downloadFiles(ctx, files) {
    if (files.length === 1) {
        return fs.createWriteStream(files[0].location);
    } else if (files.length > 1) {
        try {
            for (let i = 0; i < files.length; i++) {
                fs.accessSync(files[i].location)
            }
        } catch (e) {
            return {code: 102, msg: 'file/dir not exist'}
        }
        let nameZIP = `download-${getRandomInt()}.zip`;
        let zipStream = fs.createWriteStream('./temp/' + nameZIP);

        zipStream.on('close', function () {
            console.log(archive.pointer() + ' total bytes');
            console.log('archiver has been finalized and the output file descriptor has closed.');
        });
        zipStream.on('end', function () {
            console.log('Data has been drained');
        });
        archive.on('warning', function (err) {
            if (err.code === 'ENOENT') {
                // log warning
            } else {
                // throw error
                throw err;
            }
        });

        archive.on('error', function (err) {
            throw err;
        });
        archive.pipe(zipStream);
        for (let i = 0; i < files.length; i++) {
            const file = fs.createReadStream(files[i].location)
            archive.append(file, {name: files[i].name})
        }

        await archive.finalize();
        // ctx.attachment('./temp/' + nameZIP)
        // await send(ctx, './temp/' + nameZIP)
        ctx.body = fs.createReadStream('./temp/' + nameZIP)
        // fs.rmSync('./temp/' + nameZIP, {force: true})

    } else {
        return {code: 103, msg: 'download error'}
    }
}

module.exports = downloadFiles

