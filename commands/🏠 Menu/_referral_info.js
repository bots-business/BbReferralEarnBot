/*CMD
  command: /referral_info
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

const referralLink = RefLib.getLink();
const referralEarnings = Libs.ResourcesLib.userRes('referral_earnings').value();
const referralCount = RefLib.getRefCount();
const referralBonus = parseInt(config.REFERRAL_REWARD) || 10; // bonus for each referral

smartBot.add({
  referral_link: referralLink,
  referral_count: String(referralCount),
  referral_earnings: String(referralEarnings),
  referral_bonus: referralBonus
});

