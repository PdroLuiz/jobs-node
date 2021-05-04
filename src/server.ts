import "./app";
import { Application, json } from "express";
import routes from "./routes";
const app : Application = require("express")();


app.use(json());
app.use(routes);


app.listen(3003, function () {
    console.log('boa');
});