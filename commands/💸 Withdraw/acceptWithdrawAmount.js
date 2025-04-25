/*CMD
  command: acceptWithdrawAmount
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

// If the user typed "/cancel", direct them to the cancel menu
if (message === '/cancel') {
  return smartBot.run({ command: '/cancel' });
}

// Load user's withdrawal history or initialize it
let history = Bot.getProp("withdraw_history-" + user.telegramid, []);

// Setup the SmartAmountDialog for input validation
let smartAmountDialog = new SmartAmountDialog({
  min: config.MIN_WITHDRAWAL || 10,
  max: config.MAX_WITHDRAWAL || 100,
  curValue: balance.value(),
  onlyInteger: true,
  skipZero: false,
  smart_bot: smartBot,
  dialogErrors: smartBot.curCommand.dialogErrors
});

// Validate the user's input
const isValidAmount = smartAmountDialog.accept(message);

// Store amount and minimum withdrawal limit for future use in message templates
smartBot.add({
  amount: message,
  minimum_withdraw: config.MIN_WITHDRAWAL || 10
});

if (isValidAmount !== true) {
  // This is expected to be pre-filled with SmartBot dialog errors,
  // but currently isn't, so i manually call smartBot.fill().
  // This is a known issue and will be reported as a bug.
  return smartBot.run({
    command: "/editMessage",
    options: {
      message: smartBot.fill(isValidAmount)
    }
  });
}

// Process the withdrawal: deduct from balance, add to pending
const withdrawalAmount = smartAmountDialog.amount;
balance.remove(withdrawalAmount);
pendingBalance.add(withdrawalAmount);

// Create a unique withdrawal ID
const withdrawId = "wd_" + Date.now();

// Add the new record to user's withdrawal history
const newRecord = {
  id: withdrawId,
  amount: withdrawalAmount,
  status: "pending"
};

history.unshift(newRecord); // Add to top
Bot.setProp({
  name: "withdraw_history-" + user.telegramid,
  value: history,
  type: "json"
});

// Notify admin with withdrawal request
smartBot.run({
  command: "admin:withdrawRequest",
  options: {
    withdrawId,
    user_id: user.telegramid,
    admin_channel: config.ADMIN_CHANNEL
  }
});

