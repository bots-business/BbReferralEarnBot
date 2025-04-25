/*CMD
  command: /claim_bonus
  help:
  need_reply: false
  auto_retry_time:
  folder: 🏠 Menu
  answer:
  keyboard:
  aliases:
  group:
CMD*/

const intervalHours  = Number(config.BONUS_INTERVAL) || 24;    // hours
const bonusAmount    = Number(config.BONUS_AMOUNT)  || 5;      // money
const currency       = config.CURRENCY             || "USD";

function onEnding() {
  balance.add(bonusAmount);
  smartBot.add({ bonus: bonusAmount, interval: intervalHours });
  smartBot.run({ command: "bonus:received" });
  return true;
}

function onWaiting(waitSec) {
  const hoursRemaining = Math.ceil(waitSec / 3600);
  smartBot.add({ remaining: hoursRemaining });
  smartBot.run({ command: "bonus:alreadyClaimed" });
}

Libs.CooldownLib.user.watch({
  name: "DailyBonus",
  time: intervalHours * 3600, // in seconds
  onEnding:   onEnding,
  onWaiting:  onWaiting
});