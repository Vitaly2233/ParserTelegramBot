const cheerio = require("cheerio");
const axios = require("axios");
const parserDatabase = require("../Connections/parserDatabase");


function here(urll) {
	// const getHTML = async (url) => {
	// 	const { data } = await axios.get(url);
	// 	return cheerio.load(data);
	// };
	//
	// const $ = await getHTML(urll);
	// let username, id, description, raiting, price;
	// let word = urll.split("/");
	// id = word[word.length - 2];
	// con.query(
	// 	`SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = ${id}`,
	// 	(err, res) => {
	// 		console.log(res);
	// 	}
	// );
	// con.query(`CREATE TABE ${id}(
	// 	Description VARCHAR(100),
	// 	Price VARCHAR(10),
	// )`);
}

let con;

async function getHTML(url) {
	const {data} = await axios.get(url);
	return cheerio.load(data);
}

class parser {
	async setCon() {
		con = await parserDatabase()
	}
	// let s = new Date(Date.now()).toLocaleString('ua')
	// console.log(s)
	/*
	Function to add user's data to database about his lots. If there is same data it won't be added
	 */
	async addUserToDb(url) {
		if (!url.includes('https://funpay.ru/users/')) return false;
		const userId = url.split('/').slice(-2)[0];
		const [res, _def] = await con.query(`SELECT table_name FROM information_schema.tables WHERE TABLE_NAME = 'user${userId}'`)
		if (res.length !== 0) return userId
		let SqlCreateUser = `CREATE TABLE user${userId} (
LotId VARCHAR(30) NOT NULL UNIQUE,
ShortDescription VARCHAR(3000) NOT NULL,
Category VARCHAR(60) NOT NULL,
CurrentPrice VARCHAR(30),
Date VARCHAR(50))`;
		// Create table with users lots
		await con.query(SqlCreateUser);
		const $ = await getHTML(url)
		const offers = $('.offer');
		offers.each(async (i, elem) => {
			const category = offers.eq(i).find('.offer-list-title-container').text().trim();
			const offer = offers.eq(i).find('.tc-item');
			offer.each(async (j) => {
				const linkOffer = offer.eq(j).attr('href');
				const price = offer.eq(j).find('.tc-price').text().trim();
				const description = offer.eq(j).find('.tc-desc-text').text().trim() || null;
				const indexId = linkOffer.indexOf('id') + 3;
				const lotId = linkOffer.slice(indexId)
				let SqlAddLot = `INSERT INTO user${userId} VALUES ('${lotId}', '${description}', '${category}', '${price}', '${Date.now()}')`
				await con.query(SqlAddLot)
			})
		})
		return userId;
	}
}

module.exports = new parser();