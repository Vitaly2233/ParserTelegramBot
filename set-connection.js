import mysql from "mysql";

export function createConnection() {
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
	return con;
}
