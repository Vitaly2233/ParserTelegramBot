import mysql from "mysql2/promise";
import { Telegraf } from "telegraf";
let link = {};
//creating connection
export async function makeCon() {
	console.log("Entered function");
	link.DBcon = await mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "1234",
		database: "telegrambot",
	});
	link.bot = await setBot();
}
//Getting token from database and connecting bot
async function setBot() {
	let res = await link.DBcon.query("SELECT TOKEN FROM token WHERE id = 2");
	let bot = new Telegraf(res[0][0].TOKEN, { polling: { interval: 1000 } });
	await bot.launch();
	return Promise.resolve(bot);
}
export { link };
