/*CMD
  command: /claim_bonus
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 🏠 Menu

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

const lastBonusTime = User.getProp("last_bonus_time");
const interval = parseInt(config.BONUS_INTERVAL) || 24; // in hours
const now = new Date().getTime();

const bonusAmount = parseInt(config.BONUS_AMOUNT) || 5;
const currency = config.CURRENCY || "USD";

let bonusText;

if (!lastBonusTime || now - lastBonusTime >= interval * 60 * 60 * 1000) {
  // Eligible for bonus
  balance.add(bonusAmount);
  User.setProp("last_bonus_time", now, "number");

  smartBot.add({ bonus: bonusAmount, interval });
  bonusText = smartBot.fill("{bonusReceived}");
} else {
  // Not yet eligible
  const nextClaim = lastBonusTime + interval * 60 * 60 * 1000;
  const remaining = Math.ceil((nextClaim - now) / (60 * 60 * 1000)); // in hours

  smartBot.add({ remaining });
  bonusText = smartBot.fill("{bonusAlreadyClaimed}");
}

smartBot.add({ bonusText });

