require("chromedriver")

var chrome = require('selenium-webdriver/chrome');
var fs = require('fs');
var webdriver = require('selenium-webdriver')
var options = new chrome.Options().headless();

let htmldirname = './detailed-report/test-summary-report.html';
let  dirname  = './detailed-report/test-summary-report.json';
let  zipdire  = './zip';
var fsextra = require('fs-extra');

const {
    By
} = require('selenium-webdriver')

var driver;
var addContext = require("mochawesome/addContext")

describe('Test Suite', function() {

    before(function () {
        console.log("Removing file ");
        if (fs.existsSync(htmldirname)) {
            fs.unlinkSync(htmldirname);
          }
          if (fs.existsSync(dirname)) {
            fs.unlinkSync(dirname);
          }

         // fsextra.emptyDirSync(zipdire);
      
       
      });

    afterEach(function() {

        let imageFileName = this.currentTest.title + '.jpeg';
        driver.takeScreenshot().then(
            function(image) {
                require('fs').writeFileSync('./app-test-report/detailed-report/screenshots/'+imageFileName, image, 'base64')
            }

        )
        addContext(this, 'Following comes the test image')
        addContext(this,'./screenshots/'+ imageFileName)

    })

    afterEach(async () => {
        await driver.quit();

    })


    it("Login_test2", async () => {
        driver = new webdriver.Builder().forBrowser("chrome").setChromeOptions(options).build();
        await driver.get("https://github.com/login")
        this.AcceptButton = By.css(".js-sign-in-button")

      await driver.wait(webdriver.until.elementLocated(this.AcceptButton), 5000)
        
    })

    it("Login_Test", async () => {
        driver = new webdriver.Builder().forBrowser("chrome").setChromeOptions(options).build();
        await driver.get("https://github.com/login")
        this.AcceptButton = By.css(".js-sign-in-button")
    
      await driver.wait(webdriver.until.elementLocated(this.AcceptButton), 5000)
        
    })


})