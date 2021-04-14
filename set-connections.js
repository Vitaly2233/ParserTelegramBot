import mysql from "mysql";
import util from "util";
import TelegramBot from "node-telegram-bot-api";
let link = {};
//creatin connection
export default async function MakeCon() {
	console.log("Entered function");
	const createdConnection = util.promisify(mysql.createConnection);
	let con = await createdConnection({
		host: "localhost",
		user: "root",
		password: "1234",
		database: "telegrambot",
	});
	console.log(con);
}
//Getting token from database and connecting bot
async function setConnections() {}
// .then((con) => {
// 	console.log("Here");
// 	con.connect(function (err) {
// 		if (err) throw err;
// 		console.log("Connected!");
// 	});
// });
