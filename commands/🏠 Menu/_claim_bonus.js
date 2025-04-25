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

const lastBonusTime = User.getProp("last_bonus_time");
const now = Date.now();

const intervalHours = Number(config.BONUS_INTERVAL) || 24;
const bonusAmount = Number(config.BONUS_AMOUNT) || 5;
const currency = config.CURRENCY || "USD";
const intervalMs = intervalHours * 60 * 60 * 1000;

let commandName;

if (!lastBonusTime || (now - lastBonusTime) >= intervalMs) {
  // Bonus is available
  balance.add(bonusAmount);
  User.setProp("last_bonus_time", now);

  smartBot.add({ bonus: bonusAmount, interval: intervalHours });
  commandName = "bonus:received";
} else {
  // Bonus not available yet
  const remainingMs = (lastBonusTime + intervalMs) - now;
  const hoursRemaining = Math.ceil(remainingMs / (60 * 60 * 1000));

  smartBot.add({ remaining: hoursRemaining });
  commandName = "bonus:alreadyClaimed";
}

// Show response and stop further execution
return smartBot.run({ command: commandName });
