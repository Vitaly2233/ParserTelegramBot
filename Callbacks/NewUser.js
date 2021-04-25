const paymentChecker = require("../Middlewares/paymentChecker")
const actionController = require("../Conntrollers/Actions")
const link = require("../Connections/set-connections");


module.exports = async function setCallbacks() {
	const bot = link.connections.bot;

	bot.action("yes", await actionController.acceptPayment);
	bot.action("interface", paymentChecker, await actionController.interface)
	bot.action("checkPayment", await actionController.checkPayment);
	bot.action("contact", await actionController.sendContact);
	bot.action("feedback", await actionController.sendFeedback);

}
