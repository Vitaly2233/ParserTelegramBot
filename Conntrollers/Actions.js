const link = require("../Connections/set-connections")

class Actions {
	async sendContact(ctx) {
		ctx.reply("@Vitaly228");
	};

	async acceptPayment(ctx) {
		//to do payment---------- LATER
	};

	async checkPayment(ctx) {
		const {bot: bot, DBcon: con} = link.connections;
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
			ctx.reply("Вы оплатили бота, и можете пользоватся его функционалом. Спасибо за покупку!");
		}
	};

	async sendFeedback(ctx) {
		ctx.reply("Скоро добавим отзывы....");
	};

	async interface(ctx) {
		ctx.reply("---Интерфейс---", {
			reply_markup: {
				inline_keyboard: [
					[
						{text: "Мои лоты", callback_data: "myLots"},
					],
				]
			}
		})
	}

	async myLots(ctx) {

	}
}


module.exports = new Actions();