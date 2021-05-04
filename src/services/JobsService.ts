import connection from "../../database";
import Job from "../entity/Job";
import { LessThanOrEqual } from "typeorm";
import { ISubscribeJobParams } from "../interfaces/JobsService";

import { readdirSync } from "fs";
import { join, parse } from "path";


class JobsService {

    async getFilessJobs() : Promise<string[]> {
        const jobsDir = readdirSync(join(__dirname, "..", "jobs")).map(val => parse(val).name);
        const jobsBd = (await (await connection).manager.find(Job)).map(val => val.name);
        const filelessJobs = jobsBd.filter(val => !jobsDir.includes(val));
        return filelessJobs;
    }

    async getUnsubscribedJobs() : Promise<string[]> {
        const jobsDir = readdirSync(join(__dirname, "..", "jobs")).map(val => parse(val).name);
        const jobsBd = (await (await connection).manager.find(Job)).map(val => val.name);
        const unsubscribedJobs = jobsDir.filter(val => !jobsBd.includes(val));
        return unsubscribedJobs;
    }

    async deleteJob(jobName: string): Promise<void> {
        await (await connection).manager.getRepository(Job).createQueryBuilder().delete().where({name: jobName}).execute();
    }

    async setActive(job : Job | string, active: boolean): Promise<Job> {
        const manager = (await connection).manager;
        let job_ : Job = typeof job == "string" ? await manager.findOne(Job, {name: job}) : job;
        job_.active = active;
        manager.save(job_);
        return job_;
    }

    async getJobByName(jobName: string) : Promise<Job> {
        return await (await connection).manager.findOne(Job, {name: jobName});
    }

    async subscribeJob({name, runAt, active} : ISubscribeJobParams) : Promise<Job> {
        const jobsDir = readdirSync(join(__dirname, "..", "jobs")).map(val => parse(val).name);
        if (!jobsDir.includes(name)) throw new Error(`theres no job named ${name}`);
        const job = new Job();
        job.name = name;
        job.runAt = runAt;
        job.active = active;
        job.running = false;
        await (await connection).manager.save(job);
        return job;
    }

    async getAllJobs(): Promise<Job[]> {
        return await (await connection).manager.find(Job);
    }

    async getJobsToRun(): Promise<Job[]> {
        return await (await connection).manager.find(Job, {
            where: {
                active: true,
                running: false,
                runAt: LessThanOrEqual(new Date()),
            }
        });
    }

    async setRunning(job: Job, running : boolean): Promise<void> {
        job.running = running;
        await (await connection).manager.save(job);
    }

    async reescheduleJob(job: Job): Promise<void> {
        // todo: create a duration table in order to reeschedule 
    }

    async setRunningFalse(): Promise<void> {
        await (await connection).manager.getRepository(Job).createQueryBuilder().update().set({running: false}).execute();
    }

    async setRunAt(job: Job | string, runAt: Date): Promise<Job> {
        const manager = (await connection).manager;
        let job_ : Job = typeof job == "string" ? await manager.findOne(Job, {name: job}) : job;
        job_.runAt = runAt;
        manager.save(job_);
        return job_;
    }
}

export default new JobsService();