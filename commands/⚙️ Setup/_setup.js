/*CMD
  command: /setup
  help:
  need_reply: false
  auto_retry_time:
  folder: ⚙️ Setup
  answer:
  keyboard:
  aliases:
  group:
CMD*/


Bot.sendMessage("⚠️ Setup command NOT executed. See /setup code for details.");
// after setup you need to comment this line:
return

// Define supported languages for the bot
const languages = [ 'en', 'es' ];

// Run language setup commands for each language
let cmdName;
for (let i in languages) {
  cmdName = "lng-" + languages[i];
  Bot.run({ command: cmdName });
}

// Admin panel configuration schema
const adminPanelConfig = {
  title: "🔧 Customize Your Bot",
  description: "Set your bot's preferences and configurations here.",
  index: 0,
  icon: "settings",
  button_title: "Save Settings",
  fields: [
    {
      name: "CURRENCY",
      title: "Currency",
      description: "Set the currency used in the bot (e.g., USD, BTC).",
      type: "string",
      placeholder: "Enter currency (e.g., USD)",
      value: "USDT" // Default currency
    },
    {
      name: "REFERRAL_REWARD",
      title: "Referral Reward",
      description: "Set the reward given for each successful referral.",
      type: "integer",
      placeholder: "Enter reward amount",
      value: 10 // Default referral reward
    },
    {
      name: "ADMIN_CHANNEL",
      title: "Admin Channel",
      description: "Set the admin channel for bot updates and notifications.",
      type: "string",
      placeholder: "Enter channel username or ID"
    },
    {
      name: "ANNOUNCEMENT_CHANNEL",
      title: "Announcement Channel",
      description: "Set the channel where bot announcements will be made.",
      type: "string",
      placeholder: "Enter announcement channel username or ID"
    },
    {
      name: "ADMIN_IDS",
      title: "Admin IDs",
      description: "Enter the admin user IDs (comma separated) that will have special privileges.",
      type: "string",
      placeholder: "Enter admin IDs (e.g., 123456, 789012)"
    },
    {
      name: "BONUS_AMOUNT",
      title: "Bonus Amount",
      description: "Set the amount of bonus users will receive.",
      type: "integer",
      placeholder: "Enter bonus amount",
      value: 5 // Default bonus amount
    },
    {
      name: "BONUS_INTERVAL",
      title: "Bonus Interval",
      description: "Set the interval for users to receive bonuses (in hours).",
      type: "integer",
      placeholder: "Enter interval in hours",
      value: 24 // Default bonus interval (in hours)
    },
    {
      name: "MIN_WITHDRAWAL",
      title: "Minimum Withdrawal",
      description: "Set the minimum amount that can be withdrawn.",
      type: "integer",
      placeholder: "Enter minimum withdrawal amount",
      value: 10 // Minimum withdrawal amount
    },
    {
      name: "MAX_WITHDRAWAL",
      title: "Maximum Withdrawal",
      description: "Set the maximum amount that can be withdrawn.",
      type: "integer",
      placeholder: "Enter maximum withdrawal amount",
      value: 1000 // Maximum withdrawal amount
    }
  ]
};

// Register the configuration panel
AdminPanel.setPanel({
  panel_name: 'configuration',
  data: adminPanelConfig
});

// Initialize the membership checker (for required channel joins, etc.)
Libs.MembershipChecker.setup();

// Final setup message
Bot.sendMessage("✅ Setup panel created successfully.\n\n⚠️ Please go to the Bots.Business app and configure the Admin Panel *before using the bot* to avoid any errors.");
