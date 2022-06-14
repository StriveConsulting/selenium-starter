const {Builder, By} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const _ = require("lodash");

(async function openChromeTest() {
  try {
    let options = new chrome.Options();
    let driver = await new Builder()
                .setChromeOptions(options)
                .forBrowser('chrome')
                .build();
    await driver.get('https://google.com');
    await driver.manage().setTimeouts({implicit: 1000})
    let searchBox = await driver.findElement(By.name('q'));
    let searchButton = await driver.findElement(By.name('btnK'));
    await searchBox.sendKeys('Strive Consulting');
    await searchButton.click();


    await driver.manage().setTimeouts({implicit: 1000})
    const linkHeaders =  await driver.findElements(By.css('a h3'));

    for(let link of linkHeaders){
        console.log(await link.getText())
    }
    const firstLink = await linkHeaders[0].getText()
    if(firstLink != "Strive Consulting, LLC."){
      console.log("Oh No, some else has better SEO than we do")
    }
    else{
      console.log("We good, Strive is the the first result")
    }
    
    await driver.quit();
  } catch (error) {
    console.log(error)
  }
})();