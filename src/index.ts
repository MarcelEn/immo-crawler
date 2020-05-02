import { getCurrentIds, browser } from "./immoCrawler";

const target = "https://www.immobilienscout24.de/Suche/de/baden-wuerttemberg/karlsruhe/groetzingen/haus-kaufen";

(async () => {
    console.log(await getCurrentIds(target));
    await (await browser).close();
})();