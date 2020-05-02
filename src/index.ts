import { Database } from "sqlite3";
import ApiImpl from "./api/ApiImpl";
import { getDBPath, getPort } from "./helper/processArgs";
import Api from "./api/Api";
import express from "express";
import apiRouter from "./routes/api";

export const PORT = getPort();

export const createDB = (path: string) => new Promise<Database>((res, rej) => {
    const db = new Database(path, (err) => {
        if (err) {
            rej(err);
        } else {
            res(db);
        }
    })
});

export let api: Api;

(async () => {
    api = await ApiImpl(await createDB(getDBPath()));

    const app = express();

    app.use("/api", apiRouter);

    app.use(express.static("../static"));

    app.listen(PORT, () => console.log(`listening on ${PORT}`));
})();