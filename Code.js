const link = require("./Connections/set-connections")
const setCommandsForNew = require("./Commands/NewUser")
const setActionsForNew = require("./Callbacks/NewUser")
const setInterface = require("./Callbacks/Interface")
const setParser = require("./Code/Parserbot")

// to start asynchronous doing functions
async function a() {
	await link.set();
	await setCommandsForNew();
	await setActionsForNew();
	await setInterface();
	await setParser.setCon();
	await setParser.addToDb("https://funpay.ru/lots/offer?id=5264482");
}

a()