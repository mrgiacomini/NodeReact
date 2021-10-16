const puppeteer = require('puppeteer');

exports.scrape = async (dados) => {    
const {numeroNfse, username, password} = dados;

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--disable-notifications']    
  });
  const page = await browser.newPage();

  
  await page.goto('http://186.224.0.62:5661/issweb/paginas/login')
  await page.waitForTimeout(1000);

  await page.type('#username', username, {delay:10} );
  await page.type('#password', password, {delay:10} );
  
  await page.click('#j_idt110');

  await page.waitForTimeout(1000);

  try {
    await page.waitForSelector('#dStatus', {hidden: true});
  } catch(e) {
        browser.close();
        console.log('Timeout');
        return;
  }

  //console.log('New Page URL:', page.url());

  await page.waitForSelector('table');
  
  // const row = await page.evaluate((numeroNfse) => {
  //   const retorno = [];
  //   const rows = Array.from(document.getElementById('form:listagem_data').querySelectorAll('tr'));

  //   for (var i =0; i < rows.length; i++) {
  //     if (rows[i].querySelectorAll('td')[1].innerText == 1) {
  //       const elem = rows[i].querySelectorAll('td')[0]
  //       .querySelectorAll('div.ui-radiobutton-box')[0];

  //       return cssPath(elem);
  //     }
  //   }
    
  //   return 'erro';

  //   function cssPath(el) {
  //     if (!(el instanceof Element)) return;
  //     var path = [];
  //     while (el.nodeType === Node.ELEMENT_NODE) {
  //       var selector = el.nodeName.toLowerCase();
  //       // if (el.id) {
  //       //   selector += '#' + el.id;
  //       //   path.unshift(selector);
  //       //   break;
  //       // } else {
  //         var sib = el,
  //           nth = 1;
  //         while ((sib = sib.previousElementSibling)) {
  //           if (sib.nodeName.toLowerCase() == selector) nth++;
  //         }
  //         if (nth != 1) selector += ':nth-of-type(' + nth + ')';
  //      // }
  //       path.unshift(selector);
  //       el = el.parentNode;
  //     }
  //     return path.join(' > ');
  //   };

  // }, numeroNfse);

//  console.log(row)

  await page.click('tbody > tr:nth-of-type('+ numeroNfse +') > td > div > div:nth-of-type(2)');

  await page.waitForSelector("div[id$='groupDetalhesNfse']", {hidden: false, visible: true});

  await page.waitForTimeout(1000);  
  console.log('detalhes abriu');

  await page.click("button[id$='cbImprimir']");

  console.log('imprimir')
  await page.waitForTimeout(10000);  
  
  console.log('New page:', await page.title());

  const pages = await browser.pages();

  const buffer = await pages[2].pdf();
  const base64 = buffer.toString('base64');

  console.log(base64);
  await page.waitForTimeout(30000);  

 // await browser.close();

  return;
};

