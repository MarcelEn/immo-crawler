import { getCurrentIds, browser } from "./service/immoCrawler";
import { Database } from "sqlite3";
import ApiImpl from "./api/ApiImpl";
import { getDBPath } from "./helper/processArgs";
import Api from "./api/Api";

const target = "https://www.immobilienscout24.de/Suche/de/baden-wuerttemberg/karlsruhe/groetzingen/haus-kaufen";

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

    const ids = await getCurrentIds(target);
    for (let id of ids) {
        console.log(id, await api.immoWhiteListDTO.byId(id) != null);
    }
    await (await browser).close();
})();