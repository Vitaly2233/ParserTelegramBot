import cheerio from "cheerio";
import axios from "axios";

export const parse = async (urll) => {
	const getHTML = async (url) => {
		const { data } = await axios.get(url);
		return cheerio.load(data);
	};

	const $ = await getHTML(urll);
	let username, id, description, raiting, price;
	let word = urll.split("/");
	id = word[word.length - 2];
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
};
