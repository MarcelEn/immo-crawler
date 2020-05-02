import { Database } from "sqlite3";
import Api from "./Api";
import AbstractDBImpl from "./AbstractDBImpl";
import { ImmoWhiteListDTO } from "./dto/immoWhiteList";


export default async (db: Database): Promise<Api> => {
    const abstractDB = new AbstractDBImpl(db);
    return {
        immoWhiteListDTO: await ImmoWhiteListDTO(abstractDB),
    };
};
