/*CMD
  command: /support_request
  help:
  need_reply: true
  auto_retry_time:
  folder: 🆘 Support
  answer:
  keyboard:
  aliases:
  group:
CMD*/

// Exit if no message is provided
if (!message) return;

// Clean up the chat by deleting the user's message
Api.deleteMessage({ message_id: request.message_id });

// If the user typed "/cancel", direct them to the cancel menu
if (message === '/cancel') {
  return smartBot.run({ command: '/cancel' });
}

// Convert ADMIN_IDS string to an array and filter out empty values
const adminIds = (config.ADMIN_IDS || "")
  .split(",")
  .map(id => id.trim())
  .filter(Boolean);

// Send support request to each admin, if any
if (adminIds.length > 0) {
  adminIds.forEach(adminTelegramId => {
    smartBot.run({
      command: 'admin:supportRequest',
      options: {
        user_id: user.telegramid,
        support_message: message,
        admin_telegramid: adminTelegramId
      }
    });
  });
}
