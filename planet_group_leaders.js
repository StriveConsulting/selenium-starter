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
    await driver.get('https://theplanetgroup.com/about-us/leadership/');
    await driver.manage().setTimeouts({implicit: 1000})


    const leaderElements =  await driver.findElements(By.css('div.fl-visible-desktop  div.fl-row-content.fl-row-fixed-width.fl-node-content div.fl-col-group div.fl-col.fl-col-small div.fl-col-content.fl-node-content'));
    const players = []
    for(let leaderElement of leaderElements){
      console.log("Hi")
      try{
        const imgElement = await leaderElement.findElement(By.css('img'))
        const classElement = await leaderElement.findElement(By.css('span.fl-heading-text'))
        const nameElement = await leaderElement.findElement(By.css('h3 span a'))
      
      players.push({
        name : nameElement.getText(),
        class : classElement.getText(),
        imgLink : imgElement.getAttribute('src')
      })
      }
      catch(e){
        console.log("An Error happened")
      }
      
    }
    
    console.log(players)
    await driver.quit();
  } catch (error) {
    console.log(error)
  }
})();