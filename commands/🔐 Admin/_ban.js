/*CMD
  command: /ban
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 🔐 Admin
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

// Admin validation is already handled in the master command (@), no need to check again here

// Directly extract the Telegram ID from the params
const banUserId = params;

// Default response to the command issuer (admin)
let response;
const adminId = user?.telegramid;

if (!banUserId) {
  // Show usage help if no ID provided
  response = "⚠️ Please provide a Telegram ID to ban.\n\nExample:\n`/ban 123456789`";
} else {
  // Ban the user by blocking their chat
  Bot.blockChat(banUserId);
  response = `🚫 User has been *banned* and blocked from chatting.`;
}

// Send the result message to the admin
smartBot.run({
  command: "/sendMessage",
  options: {
    tgid: adminId,
    message: response
  }
});

