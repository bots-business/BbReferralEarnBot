/*CMD
  command: /approve_withdraw
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 💸 Withdraw

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let parts = params.split(" ");
let approved = parts[0] === "true";
let userId = parts[1];
let withdrawId = parts[2];

// Check if the current user is an admin
if (!isAdmin(user.telegramid)) {
  return smartBot.run({
    command: "/alert",
    options: {
      message: smartBot.fill("{notAdminMessage}")
    }
  });
}

// Retrieve withdrawal history for the target user
let history = Bot.getProp("withdraw_history-" + userId) || [];

// Find the specific withdrawal record by ID
let record = history.find(r => r.id === withdrawId);
if (!record) return; // No matching record — bail out

// Update the withdrawal status based on admin action
record.status = approved ? "approved" : "rejected";

// Save the updated history
Bot.setProp({
  name: "withdraw_history-" + userId,
  value: history,
  type: "json"
});

let amount = record.amount;
let statusMessage = approved ? "✅ Approved" : "❌ Rejected";
let time = new Date().toLocaleString();

// Load the target user's balances using anotherUserRes
let userBalance = Libs.ResourcesLib.anotherUserRes("balance", userId);
let userPendingBalance = Libs.ResourcesLib.anotherUserRes("pending_balance", userId);

// Always remove the amount from the pending balance
userPendingBalance.remove(amount);

// If rejected, refund the user by adding it back to their balance
if (!approved) {
  userBalance.add(amount);
}

// Set context for message placeholders
smartBot.add({
  userId,
  amount,
  status: statusMessage,
  time
});

// Notify the user
smartBot.run({
  command: "/sendMessage",
  options: {
    tgid: userId,
    message: smartBot.fill("{userWithdrawNotification}")
  }
});

// Confirm to the admin
smartBot.run({
  command: "admin:withdrawResponse"
});

// Send public announcement only if approved
let announcementChannel = config.ANNOUNCEMENT_CHANNEL;
if (approved && announcementChannel) {
  smartBot.run({
    command: "/sendMessage",
    options: {
      tgid: announcementChannel,
      message: smartBot.fill("{announcementTemplate}")
    }
  });
}

