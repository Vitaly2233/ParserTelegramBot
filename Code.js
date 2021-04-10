//for for project
import { botCommands } from "./bot-commands.js";
import { createConnection } from "./set-connection.js";

const con = createConnection();

con.query("SELECT TOKEN FROM token WHERE id = 2", (err, res) => {
	let token = res[0].TOKEN;
	botCommands(token, con);
});
