/*CMD
  command: /ban
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
  response = "⚠️ Please provide a Telegram ID to ban.\n\nExample:\n`/ban 123456789`";
} else {
  // Block the chat for the target user
  Bot.blockChat(targetId);
  response = `🚫 User \`${targetId}\` has been *banned* and blocked from chatting.`;
}

smartBot.run({
  command: "/sendMessage",
  options: {
    tgid,
    message: response
  }
});

