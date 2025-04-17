/*CMD
  command: @
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 🔩 SmartBot Core

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// Fetch configuration from admin panel
const config = AdminPanel.getPanelValues('configuration');

// Default user-related values
let balance = null;
let pendingBalance = null;
let wallet_address = null;
let available_balance = 0;

// Load user-specific values only if user exists
if (user) {
  balance = Libs.ResourcesLib.userRes('balance');
  pendingBalance = Libs.ResourcesLib.userRes('pending_balance');
  wallet_address = User.getProp('wallet_address');
  available_balance = balance.value();
}

// Prepare SmartBot parameters
let smartBotParams = {
  currency: config?.CURRENCY,
  ...(user && {
    balance: balance.value(),
    pending_balance: pendingBalance.value(),
    available_balance,
    wallet_address: wallet_address || "Not set"
  })
};

// Initialize SmartBot
let smartBot = new SmartBot({
  debug: false,
  params: smartBotParams
});

// Admin check
function isAdmin(telegramId) {
  let admins = (config.ADMIN_IDS || "")
    .split(",")
    .map(id => id.trim());
  return admins.includes(String(telegramId));
}

// Restrict access to Admin folder
if (command?.folder === "🔐 Admin") {
  if (command?.name !== "/send_broadcast" && (!user || !isAdmin(user.telegramid))) {
    return smartBot.run({
      command: "/sendMessage",
      options: {
        tgid: user?.telegramid,
        message: smartBot.fill("{notAdminMessage}")
      }
    });
  }
  // User is authorized — allow admin commands
}

