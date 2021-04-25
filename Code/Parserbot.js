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

class parser {
	async setCon() {
		con = await parserDatabase()
	}

	async addToDb(url) {
		const offerId = url.split("/")[4].slice(9);
		// check if table with offer's id exists
		let findOffer = `SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = ${offerId}`
		const [res, _def] = await con.query(findOffer);
		if (res.length === 0) {
			const getHTML = async (url) => {
				const {data} = await axios.get(url);
				return cheerio.load(data);
			}
			let $ = await getHTML(url);
			const createPriceTable = `CREATE TABLE ${offerId} (
				price VARCHAR(15),
				date DATETIME(14)
			)`
			//await con.query(createPriceTable);

			const bot = require("../Connections/set-connections").connections.bot
			const insertNewLot = ``;

			console.log($.html())

			// await bot.telegram.sendMessage(575360642, res)

		}
		// con.query()
		// const getHTML = async (url) => {
		// 	const {data} = await axios.get(url);
		// 	return cheerio.load(data);
		// }
		// const $ = await getHTML(url);
		// console.log($)
	}
}

function timeConverter(UNIX_timestamp) {
	const a = new Date(UNIX_timestamp * 1000);
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	const year = a.getFullYear();
	const month = months[a.getMonth()];
	const date = a.getDate();
	const hour = a.getHours();
	const min = a.getMinutes();
	const sec = a.getSeconds();
	const ttime = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
	return ttime;
}

module.exports = new parser();