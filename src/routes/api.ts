import { Router } from "express";
import { api } from "..";
import { getCurrentIds } from "../service/immoCrawler";

const apiRouter = Router();

apiRouter.post("/crawl", async (req, res) => {
    try {
        const target = `https://www.immobilienscout24.de/Suche/${req.query.target}`;

        const ids: number[] = [];

        for (let id of await getCurrentIds(target)) {
            if (await api.immoWhiteListDTO.byId(id) == null) {
                ids.push(id);
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

export default apiRouter;
