/*CMD
  command: /broadcast
  help:
  need_reply: false
  auto_retry_time:
  folder: 🔐 Admin
  answer:
  keyboard:
  aliases:
  group:
CMD*/

// Admin check is already handled in the master command (@), no need to check again here

// Extract message and chat details from the replied message
const message_id = request?.reply_to_message?.message_id;
const chat_id = request?.reply_to_message?.chat?.id;

if (!message_id || !chat_id) {
  // If the admin didn't reply to a message, show a clear instruction
  return smartBot.run({
    command: "/sendMessage",
    options: {
      tgid: user.telegramid,
      message: "⚠️ Please reply to a message you want to broadcast to users."
    }
  });
}

// Trigger broadcast to all private chats
Bot.runAll({
  command: "/send_broadcast",
  for_chats: "private-chats",
  on_create: "/broadcast_created",
  options: {
    chat_id,
    message_id
  }
});

