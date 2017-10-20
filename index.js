const puppeteer = require('puppeteer');
const CREDS = require('./node_modules/cred');
const cheerio = require('cheerio');
const merge = require('easy-pdf-merge');
puppeteer.launch().then(async browser => {
  const page1 = await browser.newPage();
  // initial URL HERE:
  await page1.goto('http://proquestcombo.safaribooksonline.com.ezproxy.torontopubliclibrary.ca/book/programming/javascript/9781449335977/firstchapter');
  await page1.click('input[name=user]');
  await page1.type(CREDS.username);
  await page1.click('input[name=pass]');
  await page1.type(CREDS.password);
  await page1.click('input[type=submit]');
  await page1.waitForNavigation();
  // await page1.click('a[title=Start]');
  // await page1.waitForNavigation();
  // const printPage = await page1.$('#print');
  // console.log(bookTitle);
  var coverPage = await page1.evaluate(() => document.getElementById("HtmlView").getAttribute("data-bow-ajaxcomponent"));
  var linkStart = await coverPage.indexOf("xmlid=");
  var linkEnd = await coverPage.indexOf('_html"');
  var coverLink = await coverPage.slice(linkStart + 6, linkEnd + 5);
  // console.log(coverLink);
  var bookToc = await page1.evaluate(() => document.getElementById("lefttoc").outerHTML);
  var $ = cheerio.load(bookToc, {
    xmlMode: true,
    decodeEntities: true
  });
  let sectionList = [];
  sectionList.push(coverLink);
  var link = $('.tocitem').children(function(i,el){
    var url = $(this).attr('data-xmlid')
      if (url !== undefined){
        sectionList.push(url)
      }
  // if ()
  })
// var sectionPage = await browser.newPage();
// await sectionPage.goto('http://proquestcombo.safaribooksonline.com.ezproxy.torontopubliclibrary.ca/print?xmlid=' + sectionList[0])
    let pathArray = [];
    for(var index = 0; index < sectionList.length; index++){
      var sectionPage = await browser.newPage();
      await sectionPage.goto('http://proquestcombo.safaribooksonline.com.ezproxy.torontopubliclibrary.ca/print?xmlid=' + sectionList[index]);
      await sectionPage.pdf({path: `./sections/${index}.pdf`})
      console.log(`Gathering Section ${index} of ${sectionList.length}`);
      // await sectionPage.waitForNavigation();
      await sectionPage.close();
      pathArray.push(`./sections/${index}.pdf`)
    }
browser.close();
// console.log(pathArray);
merge(pathArray, './Book.pdf',function(err){
  if(err)
  return console.log(err);
  console.log('Merged');
});
// var link = $('div[class=tocitem]').children().last().text()
  // console.log(list);
  // next.click()

});
