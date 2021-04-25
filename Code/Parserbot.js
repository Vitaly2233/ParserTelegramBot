const cheerio = require("cheerio");
const axios = require("axios");
const parserDatabase = require("../Connections/parserDatabase")


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
class parser {
	async setCon() {
		con = await parserDatabase()
	}

	async addForChecking(url) {
		const offerId = url.split("/")[5].slice(9);
		let findOffer = `SHOW TABLES LIKE '${offerId}'`
		const res = await con.query(findOffer);
		console.log(res);
		// con.query()
		// const getHTML = async (url) => {
		// 	const {data} = await axios.get(url);
		// 	return cheerio.load(data);
		// }
		// const $ = await getHTML(url);
		// console.log($)
	}
}

module.exports = new parser();