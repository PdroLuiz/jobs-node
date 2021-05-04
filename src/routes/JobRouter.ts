import { Router } from "express";
import JobController from "../controllers/JobController";


const JobRouter = Router();

JobRouter.post('/:name/subscribe', JobController.subscribeJob);

JobRouter.get('/getfilessjobs', JobController.getFilessJobs);
JobRouter.get('/getunsubscribedjobs', JobController.getUnsubscribedJobs);
JobRouter.get('/getall', JobController.getAll);
JobRouter.get('/:name/get', JobController.getJobByName);

JobRouter.put('/:name/active', JobController.activeJob);
JobRouter.put('/:name/deactivate', JobController.deactivateJob);
JobRouter.put('/:name/setrunat', JobController.setRunAt);

JobRouter.delete('/:name', JobController.deleteJob);






export default JobRouter;

