/*CMD
  command: /set_wallet
  help:
  need_reply: true
  auto_retry_time:
  folder: 💸 Withdraw
  answer:
  keyboard:
  aliases:
  group:
CMD*/

// Exit if no message is provided
if (!message) return;

// Clean up the chat by deleting the user's message
Api.deleteMessage({ message_id: request.message_id });

// If the user typed "/cancel", we want to take them to the wallet management
if (message === '/cancel') {
  return smartBot.run({ command: "/set_wallet_cancel" });
}

// Otherwise, we'll treat the message as a wallet address and save it
User.setProp('wallet_address', message);
