/*CMD
  command: /approve_withdraw
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 💸 Withdraw
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

// Parse input params: [approved, userId, withdrawId]
const [approvedFlag, userId, withdrawId] = params.split(" ");
const approved = approvedFlag === "true";

// Only admins are allowed to perform this action
if (!isAdmin(user.telegramid)) {
  return smartBot.run({
    command: "admin:alertAccessDenied"
  });
}

// Retrieve the user's withdrawal history
let history = Bot.getProp("withdraw_history-" + userId, []);

// Find the specific withdrawal entry by ID
let record = history.find(r => r.id === withdrawId);
if (!record) return; // Nothing to process if not found

// Update the record status
record.status = approved ? "approved" : "rejected";

// Save the updated history
Bot.setProp({
  name: "withdraw_history-" + userId,
  value: history,
  type: "json"
});

// Handle the user's balances
const amount = record.amount;
const userBalance = ResLib.anotherUserRes("balance", userId);
const userPending = ResLib.anotherUserRes("pending_balance", userId);

// Always deduct from pending balance
userPending.remove(amount);

// If rejected, refund the amount back to balance
if (!approved) {
  userBalance.add(amount);
}

// Set values for template rendering
smartBot.add({
  userId,
  amount,
  status: approved ? "✅ Approved" : "❌ Rejected",
  time: new Date().toLocaleString()
});

// Notify the user about the decision
smartBot.run({
  command: "withdraw:notifyUser",
  options: {
    user_telegramid: userId
  }
});

// Confirm the action to the admin
smartBot.run({
  command: "admin:withdrawResponse"
});

// If approved and a public channel is configured, send announcement
const announcementChannel = config.ANNOUNCEMENT_CHANNEL;
if (approved && announcementChannel) {
  smartBot.run({
    command: "withdraw:postAnnouncement",
    options: {
      channel_id: announcementChannel
    }
  });
}

