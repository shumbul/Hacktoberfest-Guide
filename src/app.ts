import express, {Request,Response} from "express";
import http from "http";
import dotenv from "dotenv";
import { router } from "./routes/routes";
import mongoose, {ConnectOptions} from "mongoose";
import { config } from "./config/config";

mongoose.connect(config.mongo.url as string, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
} as ConnectOptions)
.then((db) => {
    console.log("Database Connected Successfully");
})
.catch((err) => {
    console.log("Error Connectiong to the Database");
});

const app = express();
const PORT = config.server.port || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set('views', __dirname + '/views');

app.use('/', router);

app.listen(PORT, () => {
    console.log(`Running on port http://localhost:${PORT}`);
});