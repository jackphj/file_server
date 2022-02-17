const fs = require('fs/promises')
const shareMsg = require("./file_control/share/mongoShare")

async function schedule(job) {
    let resFind = await shareMsg.find();
    let dateNow = new Date();
    for (let i = 0; i < resFind.length; i++) {
        let outDate = new Date(resFind[i].out_date);
        if (outDate - dateNow <= 0) {
            let location = resFind[i].location;
            console.log(location);
            try {
                await fs.rmdir(location, {recursive: true});
                let resDel = await shareMsg.deleteOne({location: location})
                if (resDel.deletedCount !== 1) {
                    console.log("schedule error");
                }
            } catch (e) {
                console.log("schedule error");
            }
        }
    }
}

module.exports = schedule

// const Agenda = require("agenda");
// const fs = require('fs/promises')
// const shareMsg = require("./file_control/share/mongoShare")
//
// const agenda = new Agenda({});
//
// agenda.processEvery("1 minute");
//
// agenda.define("check share dir", {priority: "high"}, async (job) => {
//     let resFind = await shareMsg.find();
//     let dateNow = new Date();
//     for (let i = 0; i < resFind.length; i++) {
//         let outDate = new Date(resFind[i].out_date);
//         if (dateNow - outDate <= 0) {
//             let location = resFind[i].location;
//             try {
//                 await fs.rmdir(location);
//                 let resDel = shareMsg.deleteOne({location: location})
//                 if (resDel.deletedCount !== 1) {
//                 }
//             } catch (e) {
//             }
//         }
//     }
// })
//
// agenda.on('start', (job) => {
//     console.log("Job %s starting", job.attrs.name);
// });
//
// agenda.on("success", (job) => {
//     console.log(`Sent Email Successfully to ${job.attrs.data.to}`);
// });
//
// agenda.on("fail", (err, job) => {
//     console.log(`Job failed with error: ${err.message}`);
// });
//
// agenda.every("1 minute", "check share dir");
//
//
// module.exports = async () => {
//     await agenda.start();
// }