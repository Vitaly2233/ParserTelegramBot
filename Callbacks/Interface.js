const link = require("../Connections/set-connections");
const checkPayment = require("../Middlewares/paymentChecker")
const actions = require("../Conntrollers/Actions")

module.exports = async function setInterface() {
	const {bot: bot, DbCon: con} = link.connections;
	bot.action("myLots", checkPayment, actions.myLots);
	bot.on("text",checkPayment, actions.addBotuserLot)
}