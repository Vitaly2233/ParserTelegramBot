let bot;
let con;
//import { link } from "./set-connections.js";

export function setCommands() {
	bot = link.bot;
	con = link.connection;
	bot.on("message", (msg) => {
		console.log(msg.from.username, " Said: ", msg.text);
	});
	bot.onText(/\/commands/, (msg) => {
		bot.sendMessage(msg.chat.id, "Вот список команд: ", {
			reply_markup: {
				inline_keyboard: [
					[
						{
							text: "Оплата бота/проверить оплату: ",
							callback_data: "payment",
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
					userInterface();
				} else {
					//add new user bot to user database
					con.query(
						`SELECT ChatId FROM botusers WHERE ChatId = '${ChatId}'`,
						(err, result) => {
							if (err) throw err;
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
							} else if (msg.text !== "/commands") {
								bot.sendMessage(
									ChatId,
									"Вы не оплатили тариф бота, откройте список команд, и выберите нужную опцию"
								);
							}
						}
					);
				}
			}
		);
	});

	//for callbacks on commands===========================================
	bot.on("callback_query", (query) => {
		if (query.data === "payment") {
			con.query(
				`SELECT Tag FROM paid WHERE Tag = '${query.from.username}'`,
				(err, result) => {
					if (err) throw err;
					if (result[0] === undefined) {
						bot.sendMessage(
							query.from.id,
							"С вашего телеграм аккаунта небыло найдено текущего оплаченого тарифа, хотите сделать это сейчас?",
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
							"Вы уже оплатили услуги бота, поэтому можее использовать функционал по полной) \n Если у вас возникнут вопросы можете связатся с разработчиком.\n Также вы можете оставить отзыв об этом боте открыв список команд и нажать 'Оставить отзыв'."
						);
					}
				}
			);
		}
		if (query.data === "contact") {
			bot.sendMessage(query.from.id, "@Vitaly228");
		}
		if (query.data === "yes") {
			//To done payment

			//FOR TESTING
			con.query(
				`INSERT INTO paid VALUES ('${query.from.username}', '0000')`,
				(err, res) => {
					if (err) bot.sendMessage(query.from.id, "Can't add");
					else bot.sendMessage(query.from.id, "Added");
				}
			);
		}
	});

	function userInterface() {}
}
