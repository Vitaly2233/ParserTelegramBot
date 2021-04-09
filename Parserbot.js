const cheerio = require('cheerio');
const mysql = require('mysql');
const axios = require('axios');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "vital41k150820088",
    database: "paymentdatabase",
});
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});




const parse = async () => {
    const getHTML = async (url) => {
        const { data } = await axios.get(url);
        return cheerio.load(data);
    }

    const $ = await getHTML('https://funpay.ru/en/lots/81/');


    for (let i = 0; i < 20; i++) {

        con.query(`INSERT INTO parserdata (DecText, DecLink, DecPrice) VALUES ('${$('.tc-desc-text').eq(i).text()}', '${$('.tc-item').eq(i).attr('href')}', '${$('.tc-price').eq(i).text()}')`)

        $('.tc-desc-text').eq(i).text();
    }

}

exports.parseData = parse;