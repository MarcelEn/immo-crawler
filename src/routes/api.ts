import { Router } from "express";
import { api } from "..";
import { getCurrentIds } from "../service/immoCrawler";
import bodyParser from "body-parser";
import webpush from "web-push";
import { publicKey, privateKey } from "../service/webPushKeys";

const apiRouter = Router();

webpush.setVapidDetails(
    "mailto:undefined",
    publicKey,
    privateKey,
);

apiRouter.post("/crawl", async (req, res) => {
    try {
        const target = `https://www.immobilienscout24.de/Suche/${req.query.target}`;

        const ids: number[] = [];

        const subscriptions = (await api.pushNotificaionDTO.all())


        for (let id of await getCurrentIds(target)) {
            if (await api.immoWhiteListDTO.byId(id) == null) {
                ids.push(id);
            }
        }

        for (let id of ids) {
            for (let subscription of subscriptions) {
                try {
                    await webpush.sendNotification(JSON.parse(subscription.subscription), JSON.stringify({
                        id,
                    }))
                } catch (e) {
                    if (e.statusCode === 410) {
                        await api.pushNotificaionDTO.deleteById(subscription.id);
                    }
                }
            }
        }

        return res.json(ids);
    } catch (e) {
        return res.status(500).send(e.message);
    }
});

apiRouter.get("/check/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) return res.sendStatus(400);

        if (await api.immoWhiteListDTO.byId(id) == null) await api.immoWhiteListDTO.create({ id });

        return res.redirect(`https://www.immobilienscout24.de/expose/${id}`);
    } catch (e) {
        return res.status(500).send(e.message);
    }
});

apiRouter.delete("/subscription/:id", async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.sendStatus(400);

    await api.pushNotificaionDTO.deleteById(id);

    return res.sendStatus(200);
})

apiRouter.use(bodyParser.json());

apiRouter.post("/subscription", async (req, res) => {
    if (!req.body) return res.sendStatus(400);

    const id = await api.pushNotificaionDTO.create({
        subscription: JSON.stringify(req.body),
    });

    return res.json({
        id,
    });
});

export default apiRouter;
