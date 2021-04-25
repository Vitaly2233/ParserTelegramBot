const link = require("../Connections/set-connections")

module.exports = async function setCommands() {
  const {bot: bot, DBcon: con} = link.connections;
  bot.command("start", async (ctx) => {
    const chatId = ctx.chat.id
    let sqlGetUser = `SELECT ChatId FROM botusers WHERE ChatId = ${chatId}`;
    let sqlInsertUser = `INSERT INTO botusers VALUES (${chatId})`;
    const [res, _def] = await con.query(sqlGetUser);
    if (res.length === 0) {
      await con.query(sqlInsertUser);
      await bot.telegram.sendMessage(chatId, "Добро пожаловать, введите команду /commands чтобы продолжить роботу с ботом)");
    }
  });
  bot.command("commands", (ctx) => {
    ctx.reply("Вот список команд:", {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Оплата бота / проверить оплату:",
              callback_data: "checkPayment",
            },
          ],
          [
            {
              text: "Связаться с разработчиком:",
              callback_data: "contact",
            },
          ],
          [
            {
              text: "Оставить отзыв",
              callback_data: "feedback",
            },
          ],
          [
            {
              text: "Открыть интерфейс",
              callback_data: "interface",
            },
          ]
        ],
      },
    });
  });
}

// bot.on("text", (ctx) => {
// 	ctx.reply("Салам", {
// 		reply_markup: {
// 			inline_keyboard: [
// 				[
// 					{ text: "1", callback_data: "button1" },
// 					{ text: "2", callback_data: "button2" },
// 				],
// 				[
// 					{ text: "3", callback_data: "button3" },
// 					{ text: "4", callback_data: "button4" },
// 				],
// 			],
// 		},
// 	});
// });