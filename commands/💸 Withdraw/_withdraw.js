/*CMD
  command: /withdraw
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 💸 Withdraw

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// Wallet address is already defined in the "@" command, so we check if it's missing
if (!wallet_address) {
  return smartBot.run({
    command: "/manage_wallet"
  });
}
