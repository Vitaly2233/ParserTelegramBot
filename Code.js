import { makeCon, link } from "./set-connections.js";
import { setCommands } from "./bot-commands.js";

await makeCon();

setCommands();
