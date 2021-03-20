const puppeteer = require("puppeteer-extra");
const plugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(plugin());
const login = (email,password)=> {
    puppeteer.launch({
        headless: true
    })
        .then(
            async browser => {
                const page = await browser.newPage();
                await page.goto(pageToVisit);
                await page.waitForSelector("#identifierId", {timeout: 60000});
                await page.type("#identifierId",email, {delay: 30});
                await page.click("#identifierNext");
                await page.waitForSelector("#password", {timeout: 60000});
                await page.type("#password", ` ${password}`, {delay: 500});
                await page.click("#passwordNext");
                await page.waitForNavigation({waitUntil: 'networkidle2'});
                await page.screenshot({path: 'example.png'});
                await browser.close();
            }
        )
        .catch(err => {
            console.log(err)
        });
}
const pageToVisit = "https://accounts.google.com/signin/v2/identifier?continue=https%3A%2F%2Fmail.google." +
    "com%2Fmail%2F&service=mail&sacu=1&rip=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin";

module.exports = login;
