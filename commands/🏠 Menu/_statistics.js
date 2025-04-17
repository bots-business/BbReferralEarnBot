/*CMD
  command: /statistics
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 🏠 Menu

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// Get the total number of users, defaulting to 0 if not set
const totalUsers = Bot.getProperty("total_users", 0);

// Fetch the leaderboard of top referrers
const topList = RefLib.getTopList();
const topReferrers = topList.get();

// Define medals for top 3 positions
const medals = ["🥇", "🥈", "🥉"];
let topRefText = "";

// Build the leaderboard text (limit to top 10 users)
for (let i = 0; i < topReferrers.length && i < 10; i++) {
  const ref = topReferrers[i];
  const label = medals[i] || `${i + 1}.`;  // Medal for top 3, then numbers
  topRefText += `${label} [${ref.user.telegramid}](tg://user?id=${ref.user.telegramid}) — ${ref.value} referrals\n`;
}

// If no referrals found, show a friendly message
if (topRefText === "") {
  topRefText = "_No referrals yet._";
}

// Add the referral summary and user count to SmartBot's data
smartBot.add({
  total_users: String(totalUsers),
  top_referrals: topRefText
});

