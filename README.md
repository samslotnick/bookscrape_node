### About:
This is an eBook scraper designed for Toronto Public Library. It uses Google's new headless Chrome Node API, "Puppeteer."
The speed depends on a number of things but currently makes about 250 pages/minute ("merge" time included).
Currently only works locally, web app soon to come. Normally, I would build the web app along with the functionality, but because Puppeteer is so new, I really didn't know what it was capable of.
### Instructions:
Probably best to wait for the web app but otherwise:
* `git clone`
* `npm install i puppeteer easy-pdf-merge cheerio`
* `echo 'module.exports = { username:"YOULIBRARYCARDNO.",password:"LAST4DIGITSOFPHONENUMBER"}' >> cred.js`
* open `index.js' and replace the initial url with the first page of the eBook you want to scrape`
* `node index.js`
