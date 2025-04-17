/*CMD
  command: /history
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

// Template for each individual withdrawal
const withdrawalTemplate = "🔹 *Withdrawal #{index}:*\n⏰ *Time:* {time}\n💸 *Amount:* {amount}\n📌 *Status:* {status}";

// Retrieve user-specific withdrawal history
const history = Bot.getProp("withdraw_history-" + user.telegramid, []);

// If no history, alert user
if (history.length === 0) {
  return smartBot.run({
    command: "/alert",
    options: {
      message: smartBot.fill("{noHistoryMessage}")
    }
  });
}

// Limit to first 10 entries (most recent first)
const latest = history.slice(0, 10);

// Format each withdrawal into a readable string
const withdrawalsText = latest.map((item, index) => {
  return withdrawalTemplate
    .replace("{index}", index + 1)
    .replace("{time}", new Date(parseInt(item.id.replace("wd_", ""))).toLocaleString())
    .replace("{amount}", item.amount)
    .replace("{status}",
      item.status === "pending" ? "🔄 Pending" :
      item.status === "approved" ? "✅ Approved" :
      "❌ Rejected"
    );
}).join("\n\n");

// Save final values to use in a message template
smartBot.add({
  count: latest.length,
  withdrawals: withdrawalsText
});

