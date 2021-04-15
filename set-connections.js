import mysql from "mysql2/promise";
import { Telegraf } from "telegraf";
import util from "util";
let link = {};
//creatin connection
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
export async function getCon() {
	return Promise.resolve(link);
}
//Getting token from database and connecting bot
async function setBot() {
	let res = await link.DBcon.query("SELECT TOKEN FROM token WHERE id = 2");
	let bot = new Telegraf(res[0][0].TOKEN);
	return Promise.resolve(bot);
}
