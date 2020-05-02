import { Database } from "sqlite3";
import Api from "./Api";
import AbstractDBImpl from "./AbstractDBImpl";
import { ImmoWhiteListDTO } from "./dto/ImmoWhiteList";
import { PushNotificationDTO } from "./dto/PushNotification";


export default async (db: Database): Promise<Api> => {
    const abstractDB = new AbstractDBImpl(db);
    return {
        immoWhiteListDTO: await ImmoWhiteListDTO(abstractDB),
        pushNotificaionDTO: await PushNotificationDTO(abstractDB),
    };
};
