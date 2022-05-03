const fs = require('fs');
const archiver = require('archiver');
const sendfile = require('koa-send')
const Stream = require('stream')

function getRandomInt() {
    return Math.floor(Math.random() * 9999999);
}

async function downloadFiles(ctx, files) {
    if (files.length === 1 && files[0].dir === false) {
        await sendfile(ctx, files[0].location)
        if (!ctx.status) ctx.throw(404)
    } else if (files.length >= 1) {
        try {
            for (let i = 0; i < files.length; i++) {
                fs.accessSync(files[i].location)
            }
        } catch (e) {
            return {code: 102, msg: 'file/dir not exist'}
        }

        const archive = archiver('zip', {
            zlib: {level: 0} // Sets the compression level.
        });

        let nameZIP = `download-${getRandomInt()}.zip`;
        let zipStream = fs.createWriteStream('./temp/' + nameZIP);

        zipStream.on('finish', function () {
            console.log('Archive finish')
        })
        zipStream.on('close', function () {
            console.log(archive.pointer() + ' total bytes, file:' + nameZIP);
            console.log('archiver has been finalized and the output file descriptor has closed.');

        });
        zipStream.on('end', function () {
            console.log('Data has been drained');

        });

        const stream = new Stream.PassThrough()
        ctx.body = stream
        archive.pipe(stream)

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
            if (files[i].dir === true) {
                archive.directory(files[i].location + '/', files[i].name)
            } else {
                const file = fs.createReadStream(files[i].location)
                archive.append(file, {name: files[i].name})
            }
        }

        await archive.finalize()

        ctx.set('Content-Type', 'application/x-zip')
        ctx.set('Content-Disposition', `attachment; filename=${nameZIP}`)
        // return {multi: true, name: nameZIP}

    } else {
        return {code: 103, msg: 'download error'}
    }
}

module.exports = downloadFiles
