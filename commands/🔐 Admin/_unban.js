/*CMD
  command: /unban
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

// Split the command parameters to extract the target user ID
const parts = params.split(" ");
const targetId = parts[0];

let response;
const tgid = user?.telegramid;

if (!targetId) {
  response = "⚠️ Please provide a Telegram ID to unban.\n\nExample:\n`/unban 123456789`";
} else {
  // Unblock the chat for the target user
  Bot.unblockChat(targetId);
  response = `✅ User \`${targetId}\` has been *unbanned* and unblocked from chatting.`;
}

smartBot.run({
  command: "/sendMessage",
  options: {
    tgid,
    message: response
  }
});

