import TelegramBot from "node-telegram-bot-api";
let bot;
export function botCommands(token, con) {
	bot = new TelegramBot(token, { polling: true });
	bot.on("message", (msg) => {
		console.log(msg.from.username, " Said: ", msg.text);
	});
	bot.onText(/\/commands/, async (msg) => {
		await bot.sendMessage(msg.chat.id, "Вот список команд: ", {
			reply_markup: {
				inline_keyboard: [
					[
						{
							text: "Посмотреть оплату: ",
							callback_data: "payment",
						},
						{
							text: "Связаться с разработчиком:",
							callback_data: "contact",
						},
					],
				],
			},
		});
	});

	//chating with bot
	bot.on("message", (msg) => {
		const ChatId = msg.chat.id;
		//checking payment
		con.query(
			`SELECT Tag FROM paid WHERE Tag = '${msg.from.username}'`,
			(err, result) => {
				if (result[0] !== undefined) {
					//if payment is done, go to user interface and speak with bot
				} else {
					//add new user bot to bot database
					con.query(
						`SELECT ChatId FROM botusers WHERE ChatId = '${ChatId}'`,
						(err, result) => {
							if (result[0] === undefined) {
								con.query(
									`INSERT INTO botusers VALUES ('${msg.from.username}', '${ChatId}')`,
									() => {
										if (err) throw err;
										bot.sendMessage(
											ChatId,
											"Добро пожаловать, выберите нужную команду:"
										);
									}
								);
							}
							if (err) throw err;
						}
					);
				}
			}
		);
	});

	//for callbacks on commands===========================================
	bot.on("callback_query", (query) => {
		if (query.data === "payment") {
			//callbacks
			con.query(
				`SELECT Tag FROM paid WHERE Tag = '${query.from.username}'`,
				(err, result) => {
					if (err) throw err;
					if (result[0] === undefined) {
						bot.sendMessage(
							query.from.id,
							"Похоже что вы не оплатили услуги бота, хотите сделать это сейчас?",
							{
								reply_markup: {
									inline_keyboard: [
										[
											{
												text: "Да ",
												callback_data: "yes",
											},
										],
									],
								},
							}
						);
					} else {
						bot.sendMessage(
							query.message.chat.id,
							"Вы уже оплатили услуги бота)"
						);
					}
				}
			);
		}
		if (query.data === "contact") {
			bot.sendMessage(query.from.id, "@Vitaly228");
		}
		if (query.data === "yes") {
			let s = new Date(query.message.date * 1000).toLocaleDateString(
				"en-US"
			);
			con.query(
				`INSERT INTO paid VALUES ('${query.from.username}', '${s}')`,
				() => {
					bot.sendMessage(
						query.message.chat.id,
						"Вы оплатили услуги бота)"
					);
				}
			);
		}
	});
}
