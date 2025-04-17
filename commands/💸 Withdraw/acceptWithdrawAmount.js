/*CMD
  command: acceptWithdrawAmount
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

// Clean up the chat by deleting the user's message
Api.deleteMessage({ message_id: request.message_id });

// If the user typed "/cancel", take them to the cancel menu
if (message === '/cancel') {
  return smartBot.run({ command: "/cancel" });
}

// Get user's withdrawal history (saved globally by user ID)
let history = Bot.getProp("withdraw_history-" + user.telegramid) || [];

let smartAmountDialog = new SmartAmountDialog({
  min: config.MIN_WITHDRAWAL || 10,
  max: config.MAX_WITHDRAWAL || 100,
  curValue: balance.value(),
  onlyInteger: true,
  skipZero: false,
  smart_bot: smartBot,
  dialogErrors: smartBot.curCommand.dialogErrors
});

const isValidAmonut = smartAmountDialog.accept(message);

// Store basic values for later use
smartBot.add({
  amount: message,
  minimum_withdraw: config.MIN_WITHDRAWAL || 10
});

if (isValidAmonut !== true) {
  // If amount is invalid, show appropriate error
  smartBot.run({
    command: "/editMessage",
    options: {
      message: smartBot.fill(isValidAmonut)
    }
  });
  return;
}

// Deduct from balance and add to pending balance
balance.remove(smartAmountDialog.amount);
pendingBalance.add(smartAmountDialog.amount);

// Generate unique withdrawal ID using timestamp
let withdrawId = "wd_" + new Date().getTime();

// Create new withdrawal record
let record = {
  id: withdrawId,
  amount: smartAmountDialog.amount,
  status: "pending"
};

// Add new record to top of withdrawal history
history.unshift(record);

// Save updated withdrawal history globally (using user ID key)
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

