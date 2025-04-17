/*CMD
  command: /support_request
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 🆘 Support

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// If no message is provided, we don't need to do anything
if (!message) return;

// First, let's clean up the chat by deleting the user's message
Api.deleteMessage({ message_id: request.message_id });

// If the user typed "/cancel", we want to take them to the cancel menu
if (message === '/cancel') {
  return smartBot.run({ command: "/cancel" });
}

smartBot.add({ message, user_id: user.telegramid });

// Fill the admin message template
const adminMessage = smartBot.fill("{adminMessage}");

// Check if config.ADMIN_IDS is null or empty
if (config.ADMIN_IDS) {
  // Convert the ADMIN_IDS string to an array of numbers
  const adminIds = config.ADMIN_IDS.split(",").map(id => id.trim());

  // Send the message to each admin
  adminIds.forEach(admin => {
    Api.sendMessage({
      chat_id: admin,
      text: adminMessage,
      parse_mode: 'Markdown'
    });
  });
}
