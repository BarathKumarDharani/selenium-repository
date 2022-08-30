require("chromedriver")

var chrome    = require('selenium-webdriver/chrome');

var webdriver = require('selenium-webdriver')
var options   = new chrome.Options().headless();
const {
    By
} = require('selenium-webdriver')

var driver;
var addContext = require("mochawesome/addContext")


describe('Test Suite', function() {

    afterEach(function() {

        let imageFileName = this.currentTest.title + '.jpeg';
        driver.takeScreenshot().then(
            function(image) {
                require('fs').writeFileSync('./screenshots/' + imageFileName, image, 'base64')
            }
        )
        addContext(this, 'Following comes the test image')
        addContext(this, '../screenshots/' + imageFileName)

    })

    afterEach(async () => {
        await driver.quit();
    })


    it("Selenium check Git sign In", async () => {
        driver = new webdriver.Builder().forBrowser("chrome").setChromeOptions(options).build();
        await driver.get("https://github.com/login")
        this.AcceptButton = By.css(".js-sign-in-button")

        await driver.wait(webdriver.until.elementLocated(this.AcceptButton), 5000)
    })

   
})