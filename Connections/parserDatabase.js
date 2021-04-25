const mysql = require("mysql2/promise")
const {Telegraf} = require("telegraf")
const linkTg = require("./set-connections")
let link = {};

async function makeCon() {
	link = await mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "1234",
		database: "parser",
	});
	console.log("Parser's connected");
	return link;
}

module.exports = makeCon;