/*CMD
  command: /unban
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
const unbanUserId = params;

// Response will be sent back to the admin
let response;
const adminId = user?.telegramid;

if (!unbanUserId) {
  // Show help message if no ID is provided
  response = "⚠️ Please provide a Telegram ID to unban.\n\nExample:\n`/unban 123456789`";
} else {
  // Unban the user by unblocking their chat
  Bot.unblockChat(unbanUserId);
  response = `✅ User has been *unbanned* and unblocked from chatting.`;
}

// Send the result message to the admin
smartBot.run({
  command: "/sendMessage",
  options: {
    tgid: adminId,
    message: response
  }
});

