const link = require("../Connections/set-connections")

module.exports = async function chekPayment(ctx, next) {
  const chatId = ctx.chat.id
  const {bot: bot, DBcon: con} = link.connections;
  let sql = `SELECT ChatId FROM paid WHERE ChatId = ${chatId}`
  const [res, _def] = await con.query(sql);
  if (res.length === 0) {
    return ctx.reply("Вы не оплатили услуги бота");
  }
  next();
}