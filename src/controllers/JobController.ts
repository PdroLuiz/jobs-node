import { Request, Response } from "express";
import JobsService from "../services/JobsService";
import { parseISO } from "date-fns";



class JobController {

    async subscribeJob(req : Request, res : Response) {
        try {
            const name : string = req.params.name;
            const runAt : Date = parseISO(req.body.runAt);
            const active : boolean = req.body.active;
            const job = await JobsService.subscribeJob({name, runAt, active});
            return res.status(200).send(job);
        } catch(err) {
            return res.status(err.status || 500).send({
                error: {
                    message: err.message,
                    status: err.status || 500
                }
            });
        }
    }

    async getAll(req : Request, res : Response) {
        try {
            const jobs = await JobsService.getAllJobs();
            return res.status(200).send(jobs);
        } catch(err) {
            return res.status(err.status || 500).send({
                error: {
                    message: err.message,
                    status: err.status || 500
                }
            });
        }
    }

    async setRunAt(req : Request, res : Response) {
        try {
            const name : string = req.params.name;
            const runAt : Date = parseISO(req.body.runAt); 
            const job = await JobsService.setRunAt(name, runAt);
            return res.status(200).send(job);
        } catch(err) {
            return res.status(err.status || 500).send({
                error: {
                    message: err.message,
                    status: err.status || 500
                }
            });
        }
    }

    async getJobByName(req : Request, res : Response) {
        try {
            const name : string =  req.params.name;
            const job = await JobsService.getJobByName(name);
            return res.status(200).send(job);
        } catch(err) {
            return res.status(err.status || 500).send({
                error: {
                    message: err.message,
                    status: err.status || 500
                }
            });
        }
    }

    async getFilessJobs(req : Request, res : Response) {
        try {
            const jobs = await JobsService.getFilessJobs();
            return res.status(200).send(jobs);
        } catch(err) {
            return res.status(err.status || 500).send({
                error: {
                    message: err.message,
                    status: err.status || 500
                }
            });
        }
    }

    async getUnsubscribedJobs(req : Request, res : Response) {
        try {        
            const jobs = await JobsService.getUnsubscribedJobs();
            return res.status(200).send(jobs);
        } catch(err) {
            return res.status(err.status || 500).send({
                error: {
                    message: err.message,
                    status: err.status || 500
                }
            });
        }
    }

    async deleteJob(req : Request, res : Response) {
        try {
            const name : string =  req.params.name;
            await JobsService.deleteJob(name);
            return res.status(200).send();
        } catch(err) {
            return res.status(err.status || 500).send({
                error: {
                    message: err.message,
                    status: err.status || 500
                }
            });
        }
    }

    async activeJob(req : Request, res : Response) {
        try {
            const name : string =  req.params.name;
            const job = await JobsService.setActive(name, true);
            return res.status(200).send(job);
        } catch(err) {
            return res.status(err.status || 500).send({
                error: {
                    message: err.message,
                    status: err.status || 500
                }
            });
        }
    }

    async deactivateJob(req : Request, res : Response) {
        try {
            const name : string =  req.params.name;
            const job = await JobsService.setActive(name, false);
            return res.status(200).send(job);

        } catch(err) {
            return res.status(err.status || 500).send({
                error: {
                    message: err.message,
                    status: err.status || 500
                }
            });
        }
    }

}

export default new JobController();