import { Router } from "express";
import JobRouter from "./JobRouter";

const routes = Router();

routes.use('/jobs', JobRouter);

export default routes;
