/*CMD
  command: /statistics
  help:
  need_reply: false
  auto_retry_time:
  folder: 🏠 Menu
  answer:
  keyboard:
  aliases:
  group:
CMD*/

// Get the total number of users (or 0 if it hasn't been set yet)
const totalUsers = Bot.getProp("total_users", 0);

// Get the list of users who referred others
const topList = RefLib.getTopList();
const topReferrers = topList.get(); // This gives an array of top referrers

// Emojis for the top 3 referrers
const medals = ["🥇", "🥈", "🥉"];

// This will store the final leaderboard text
let topRefText = "";

// Loop through the top 10 referrers and format the display
for (let i = 0; i < topReferrers.length && i < 10; i++) {
  const ref = topReferrers[i]; // The current referrer in the list
  const position = medals[i] || `${i + 1}.`; // Use medal for top 3, else number

  // Create a line with their Telegram profile and number of referrals
  topRefText += `${position} [${ref.user.telegramid}](tg://user?id=${ref.user.telegramid}) — ${ref.value} referrals\n`;
}

// If no one has referred anyone yet, show a default message
if (topRefText === "") {
  topRefText = "_No referrals yet._";
}

// Pass the total users and top referral list to SmartBot for message templates
smartBot.add({
  total_users: totalUsers.toString(),
  top_referrals: topRefText
});

