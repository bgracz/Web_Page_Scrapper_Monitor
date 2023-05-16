import fetch from 'node-fetch';
import jsdom from 'jsdom';
const { JSDOM } = jsdom;

import Twit from 'twit';
let T = new Twit({
    consumer_key:'###',
    consumer_secret: '###',
    access_token: '###-###',
    access_token_secret: '###',
    timeout_ms:           60*1000, 
    strictSSL:            true,  
  })

let url = 'PutUrlYouWantToMonitor';

async function fetchData() {
    console.log("app is up");
    const response = await fetch(url);
    const text = await response.text();
    const dom = await new JSDOM(text);
    let responseData = dom.window.document.querySelector("#pgc-42-1-2 > div > div.magazyny-info-container-content > div.circle-container.center-block > div").getAttribute('data-value');
    let gwh = dom.window.document.querySelector("#pgc-42-1-2 > div > div.magazyny-info-container-content > div.data-table > div:nth-child(1) > div.col-md-5.col-sm-12.col-xs-12.right > span.gwh-info").innerHTML;
    let percent = responseData * 100 + " %";
    let zuzycie = dom.window.document.querySelector("#pgc-42-1-2 > div > div.magazyny-info-container-content > div.data-table > div:nth-child(3) > div.col-md-5.col-sm-12.col-xs-12.right > span.gwh-info").innerHTML;
    let status = 'Magazyny gazu #PGNiG w #Polska są aktualnie zapełnione w ' + percent + ": " + gwh + " [GWh]." + " Ostatniej doby zużyto z zapasu " + zuzycie + " [GWh]" + " #gaz #balticpipe #energetyka";
    console.log(status);
    T.post('statuses/update', { status: status}, function(err, data, response) {
        console.log(data)
      })
  };
fetchData();
setInterval(fetchData, 86400000);