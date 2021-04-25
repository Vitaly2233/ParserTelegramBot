const mysql = require("mysql2/promise")
const {Telegraf} = require("telegraf")
let link = {};

async function makeCon() {
  link.DBcon = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "telegrambot",
  });
  link.bot = await setBot();
  console.log("Everything's connected");
  return Promise.resolve(link)
}

//Getting token from database and connecting bot
async function setBot() {
  let res = await link.DBcon.query("SELECT TOKEN FROM token WHERE id = 2");
  let bot = new Telegraf(res[0][0].TOKEN, {
    polling: {interval: 1000},
  });
  await bot.launch();
  return Promise.resolve(bot);
}
module.exports.connections = link;
module.exports.set = makeCon;