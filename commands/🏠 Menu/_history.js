/*CMD
  command: /history
  help:
  need_reply: false
  auto_retry_time:
  folder: 🏠 Menu
  answer:
  keyboard:
  aliases:
  group:
CMD*/

// Retrieve user-specific withdrawal history
const history = Bot.getProp(`withdraw_history-${user.telegramid}`, []);

// If no history, alert user
if (!history.length) return smartBot.run({ command: "history:noData" });

// Limit to the most recent 10 entries
const latestWithdrawals = history.slice(0, 10);

// Helper function to format withdrawal time
function formatWithdrawalTime(itemId) {
  const withdrawalTime = new Date(parseInt(itemId.replace("wd_", "")));
  return withdrawalTime.toLocaleString();
}

// Helper function to format withdrawal entry
function formatWithdrawal(item, index) {
  smartBot.add({
    index: index + 1,
    time: formatWithdrawalTime(item.id),
    amount: item.amount,
    status: smartBot.params[item.status] || "❓ Unknown"
  });

  return smartBot.fill(smartBot.params.withdrawalTemplate);
}

// Format all withdrawal entries
const withdrawalsText = latestWithdrawals.map(formatWithdrawal).join("");

// Save final values to use in a message template
smartBot.add({
  count: latestWithdrawals.length,
  withdrawals: withdrawalsText
});

