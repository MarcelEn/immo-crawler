import { ImmoWhiteListDTO } from "./dto/ImmoWhiteList";
import { PushNotificationDTO } from "./dto/PushNotification";

type Api = Readonly<{
    immoWhiteListDTO: ImmoWhiteListDTO;
    pushNotificaionDTO: PushNotificationDTO;
}>
export default Api;
