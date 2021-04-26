const link = require("../Connections/set-connections")
const parser = require("../Code/Parserbot");

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
		const {bot: bot, DBcon: con} = link.connections;
		const SqlGetLots = `SELECT * FROM trackinguser WHERE UserChatId = ${ctx.chat.id}`;
		const [res, _def] = await con.query(SqlGetLots);
		if (res.length === 0) {
			ctx.reply("Кажется у вас нету еще ни одного лота, чтобы добавить новый, введите сылку на пользователя за которым хотите следить правильный формат на подобии 'https://funpay.ru/users/9999999/'")
		}
	}

	async addBotuserLot(ctx) {
		const con = link.connections.DBcon;
		const url = ctx.message.text;
		const res = await parser.addUserToDb(url);
		switch (res) {
			case false:
				return ctx.reply("Вы ввели неправильную сылку на пользователя, правильный формат на подобии 'https://funpay.ru/users/9999999/'");
		}
		const insertLotToBotuser = `INSERT INTO trackinguser VALUES(${ctx.chat.id}, '${res}')`;
		await con.query(insertLotToBotuser);
	}
}


module.exports = new Actions();