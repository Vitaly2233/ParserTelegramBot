const link = require("./Connections/set-connections")
const setCommands = require("./Commands/NewUser")
//function for starting asynchronous functions from other files
async function a() {
  await link.set;
  await setCommands();

}
a()