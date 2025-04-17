/*CMD
  command: /set_wallet
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 💸 Withdraw

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

// If the user typed "/cancel", we want to take them to the wallet management
if (message === '/cancel') {
  return smartBot.run({ command: "/set_wallet_cancel" });
}

// Otherwise, we'll treat the message as a wallet address and save it
User.setProp('wallet_address', message);

