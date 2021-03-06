import { isAfter, parse, Duration, add } from "date-fns";
import JobsService from "./services/JobsService";

let watcherRunning = false;

async function t(name: string) {
    try { 
        const { run } = require(`./jobs/${name}`);
        if (!run) throw new Error(`run function not found in ${name} file`);
        await run();
    } catch (e) {
        throw new e;
    }
}


process.on("SIGINT", async function() {
    try {
        await JobsService.setRunningFalse();
    }
    finally {
        process.exit();
    }
    
});

async function watcher() {
    if (watcherRunning) return;
    watcherRunning = true;
    try {
        console.log("watcher is running");
        (await JobsService.getJobsToRun()).forEach(async job => {
            console.log(job);
            if (isAfter(new Date(), job.runAt) && !job.running) {
                await JobsService.setRunning(job, true);
                try { 
                    await t(job.name);
                    await JobsService.setRunning(job, false);
                } catch {
                    
                }
                
            }
        });    
    } finally {
        watcherRunning = false;
    }
}

setInterval(watcher, 1000);
