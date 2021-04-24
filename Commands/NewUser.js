const link = require("../Connections/set-connections")
const paymentChecker = require("../Middlewares/paymentChecker")

module.exports =  async function setCommands() {
  const { bot: bot, DBcon: con } = link.connections;
  bot.command("start", async (ctx) => {
    const chatId = ctx.chat.id
    let sqlGetUser = `SELECT ChatId FROM botusers WHERE ChatId = ${chatId}`;
    let sqlInsertUser = `INSERT INTO botusers VALUES (${chatId})`;
    const [res, _def] = await con.query(sqlGetUser);
    if (res.length === 0) {
      await con.query(sqlInsertUser);
      await bot.telegram.sendMessage(chatId,"Добро пожаловать, введите команду /commands чтобы продолжить роботу с ботом)");
    }});
// bot's commands for using bot
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
              text: "Открыть интерфейс(Только для пользователей оплативших бота)",
              callback_data: "interface",
            },
          ]
        ],
      },
    });
  });
  bot.action("interface", paymentChecker,(ctx) => {
    ctx.reply("оплачено")
  } )
  //payment checker
  bot.action("checkPayment", async (ctx) => {
    const chatId = ctx.chat.id;
    let sql = `SELECT ChatId FROM paid WHERE ChatId = ${chatId}`;
    const [res, _def] = await con.query(sql);
    if (res.length === 0) {
      ctx.reply("Похоже вы не оплатили бота, хотите сделать это сейчас?", {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Да",
                callback_data: "yes",
              },
            ],
          ],
        },
      });
    } else {
      ctx.reply(
        "Вы оплатили бота, и можете пользоватся его функционалом. Спасибо за покупку!"
      );
    }
  });

  bot.action("yes", (ctx) => {
    //to do payment SOONER....
  });
  bot.action("contact", (ctx) => {
    ctx.reply("@Vitaly228");
  });
  bot.action("feedback", (ctx) => {
    ctx.reply("Скоро добавим отзывы....");
  });

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

}
