import mysql from "mysql";
import TelegramBot from "node-telegram-bot-api";
let link = {};
let token;

async function createConnection() {
	let con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "1234",
		database: "telegrambot",
	});
	con.connect(function (err) {
		if (err) throw err;
		console.log("Connected!");
	});
	return Promise.resolve(con);
}
async function getToken() {
	link.connection.query("SELECT TOKEN FROM token WHERE id = 2", (err, res) => {
		return (token = res[0].TOKEN);
	});
}
async function setBot(token) {
	link.bot = new TelegramBot(token, { polling: true });
}
async function fn() {
	link.connection = await createConnection();
	token = await getToken();
	console.log(token);
}
export default { link, fn };
