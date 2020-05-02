import puppeteer from "puppeteer";
import { isDevModeEnabled } from "../helper/processArgs";

const browserArgs: puppeteer.LaunchOptions = isDevModeEnabled() ?
    {
        headless: false,
        slowMo: 100,
    }
    :
    {}

export const browser = puppeteer.launch(browserArgs);

export const getCurrentIds = async (target: string) => {
    const page = await (await browser).newPage();
    await page.goto(target);

    const ids = await page.evaluate(() =>
        Array.from(document.querySelectorAll("#resultListItems .result-list-entry__brand-title-container"))
            .map((e) => e.getAttribute("data-go-to-expose-id") || "")
            .map((id) => parseInt(id, 10))
            .filter(id => !isNaN(id))
    );
    await page.close();
    return ids;
}