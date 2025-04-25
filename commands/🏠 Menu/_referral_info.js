/*CMD
  command: /referral_info
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 🏠 Menu
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

// Generate the user's unique referral link
const referralLink = RefLib.getLink();

// Retrieve referral stats
const referralEarnings = ResLib.userRes('referral_earnings').value();
const referralCount = RefLib.getRefCount();
const referralBonus = Number(config.REFERRAL_REWARD) || 10;

// Prepare referral data for SmartBot
smartBot.add({
  referral_link: referralLink,
  referral_count: referralCount.toString(),
  referral_earnings: referralEarnings.toString(),
  referral_bonus: referralBonus
});

