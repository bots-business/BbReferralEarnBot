/*CMD
  command: /broadcast
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 🔐 Admin

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// Admin check has already been done in the master command (`@`), so no need to repeat here.

// Check if the message is a reply and if the message ID and chat ID are valid
const message_id = request?.reply_to_message?.message_id;
const chat_id = request?.reply_to_message?.chat?.id;

if (!message_id || !chat_id) {
  // Return a message to the admin if no reply was provided
  return smartBot.run({
    command: "/sendMessage",
    options: {
      tgid: user?.telegramid,
      message: "⚠️ Please reply to a message in order to broadcast."
    }
  });
}

Bot.runAll({
  command: "/send_broadcast",
  for_chats: "private-chats",
  on_create: "/broadcast_created",
  options: {
    chat_id,
    message_id
  }
});
