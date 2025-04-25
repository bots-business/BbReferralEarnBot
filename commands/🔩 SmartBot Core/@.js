/*CMD
  command: @
  help:
  need_reply: false
  auto_retry_time:
  folder: 🔩 SmartBot Core
  answer:
  keyboard:
  aliases:
  group:
CMD*/

// Load configuration from the admin panel
const config = AdminPanel.getPanelValues('configuration');

// Default user-related values
let balance = null;
let pendingBalance = null;
let walletAddress = null;
let availableBalance = 0;

// Load values only if user exists
if (user) {
  balance = ResLib.userRes('balance');
  pendingBalance = ResLib.userRes('pending_balance');
  walletAddress = User.getProp('wallet_address');
  availableBalance = balance.value();
}

// Prepare SmartBot parameters
const smartBotParams = {
  currency: config?.CURRENCY,
  ...(user && {
    balance: balance.value(),
    pending_balance: pendingBalance.value(),
    available_balance: availableBalance,
    wallet_address: walletAddress || "Not set"
  })
};

// Initialize SmartBot instance
let smartBot = new SmartBot({
  debug: false,
  params: smartBotParams
});

// Check if a Telegram ID belongs to an admin
function isAdmin(telegramId) {
  const admins = (config.ADMIN_IDS || "")
    .split(",")
    .map(id => id.trim());
  return admins.includes(String(telegramId));
}

// Restrict access to admin commands
if (command?.folder === "🔐 Admin") {
  const isBroadcast = command?.name === "/send_broadcast";
  const isAuthorized = user && isAdmin(user.telegramid);

  if (!isBroadcast && !isAuthorized) {
    return smartBot.run({
      command: 'admin:accessDenied',
      options: {
        user_telegramid: user?.telegramid
      }
    });
  }

  // Admin is authorized — continue with admin commands
}

