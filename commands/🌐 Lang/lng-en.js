/*CMD
  command: lng-en
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 🌐 Lang

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

const currentLang = "🇺🇸 English";

// Language configuration object
const LANG = {
  "commands": {
    "/start": {
      "alias": "#/button/changeLanguage",
      "text": "*🌐 Choose your preferred language*\n\n_Current language:_ *{curLang}*",
      "inline_buttons": "#/keyboard/selectlanguage"
    },
    "/joining": {
      "edit": true,
      "text": "🔔 *Join Required Channels*\n\nTo continue using the bot, please make sure you've joined all the channels listed below:\n\n{notJoinedChats}",
      "inline_buttons": [[{ "text": "✅ I've Joined – Continue", "command": "/joining check" }]]
    },
    "/menu": {
      "edit": true,
      "text": "🎉 *Welcome to Our Referral Bot!* \n\nStart earning {currency} by referring friends and unlocking rewards! 🚀\n\nSelect an option below to track your earnings, claim bonuses, and grow your rewards! 💰",
      "inline_buttons": "#/keyboard/userMenu"
    },
    "/balance": {
      "edit": true,
      "text": "💰 *Your Wallet Balance*\n\n🔹 Total Balance: *{balance} {currency}*\n✅ Available for Withdrawal: *{available_balance} {currency}*\n⏳ Pending Withdrawal: *{pending_balance} {currency}*\n\n🚀 Invite friends and watch your balance grow!",
      "inline_buttons": "#/keyboard/userMenu"
    },
    "/claim_bonus": {
      "edit": true,
      "text": "{bonusText}",
      "inline_buttons": "#/keyboard/userMenu"
    },
    "/referral_info": {
      "edit": true,
      "text": "👥 *Your Referral Stats*\n\n🔗 *Your Link:* `{referral_link}`\n\n👤 *Total Referrals:* {referral_count}\n💰 *Earnings from Referrals:* {referral_earnings} {currency}\n\n🎉 *Earn {referral_bonus} {currency}* for each user who joins using your referral link!\n\n📢 Share your link and keep earning!",
      "inline_buttons": "#/keyboard/userMenu"
    },
    "/manage_wallet": {
      "edit": true,
      "text": "💼 *Manage Wallet*\n\nHere you can set or update your wallet address for withdrawals.\n\n🔐 *Current Wallet:* `{wallet_address}`",
      "inline_buttons": [
        [
          { "text": "✏️ Update Wallet", "command": "/update_wallet" },
          { "text": "🔙 Back to Menu", "command": "/menu" }
        ]
      ]
    },
    "/update_wallet": {
      "edit": true,
      "text": "💼 *Update Wallet Address*\n\n📝 Send your new wallet address. It will be used for *withdrawals* — make sure it’s correct.\n\n❌ Click /cancel to stop.",
      "run": { "command": "/set_wallet" },
      "inline_buttons": []
    },
    "/set_wallet": {
      "edit": true,
      "message_id": "{message_id}",
      "text": "✅ *Wallet Updated!*\n\nYour new address has been saved successfully.",
      "inline_buttons": "#/keyboard/backToWallet"
    },
    "/set_wallet_cancel": {
      "edit": true,
      "message_id": "{message_id}",
      "text": "✅ *Wallet Update Cancelled!*\n\nNo changes were made to your wallet address.",
      "inline_buttons": "#/keyboard/backToWallet"
    },
    "/cancel": {
      "edit": true,
      "message_id": "{message_id}",
      "text": "🚫 *Request Cancelled!*\n\nNo worries — we’ve stopped the current process for you.\n\nYou can explore other options from the menu anytime!",
      "inline_buttons": "#/keyboard/backToMenu"
    },
    "/alert": {
      "alert": "{message}"
    },
    "/sendMessage": {
      "chat_id": "{tgid}",
      "text": "{message}"
    },
    "/editMessage": {
      "edit": true,
      "message_id": "{message_id}",
      "text": "{message}",
      "inline_buttons": "#/keyboard/backToMenu"
    },
    "/faq": {
      "edit": true,
      "text": "❓ *Support Center*\n\nHere are answers to some common questions:\n\n💰 *How do I withdraw?*\nGo to *Manage Wallet* to set your address, then tap *Withdraw* from the menu.\n\n🎁 *How do I claim bonus?*\nTap *Bonus* in the menu once every few hours to claim your reward.\n\n👥 *How do referrals work?*\nShare your referral link. You earn a bonus when someone joins and uses the bot.\n\nNeed more help? Tap below to contact support.",
      "inline_buttons": [
        [{ "text": "📨 Contact Support", "command": "/support" }],
        [{ "text": "🔙 Back to Menu", "command": "/menu" }]
      ]
    },
    "/support": {
      "edit": true,
      "text": "📨 *Contact Support*\n\nIf you didn't find your answer in the FAQ, our team is here to help!\n\nPlease describe your issue clearly, and we'll get back to you as soon as possible.\n\nYou can click /cancel if you changed your mind.",
      "run": { "command": "/support_request" }
    },
    "/support_request": {
      "edit": true,
      "message_id": "{message_id}",
      "text": "✅ *Message Sent!*\n\nThanks for reaching out — our support team has received your message.\n\nWe'll get back to you shortly. Please be patient!",
      "inline_buttons": "#/keyboard/backToMenu"
    },
    "/statistics": {
      "edit": true,
      "text": "📊 *Bot Performance Overview*\n━━━━━━━━━━━━━━━\n\n👥 *Total Users:* {total_users}\n\n🏆 *Top Referrals:*\n{top_referrals}\n━━━━━━━━━━━━━━━\n⏱ _Statistics refresh automatically in real-time._",
      "inline_buttons": "#/keyboard/userMenu"
    },
    "/history": {
      "edit": true,
      "text": "*📝 Your Last {count} Withdrawals:*\n\n{withdrawals}\n\n✨ _If you need any help, feel free to ask!_",
      "inline_buttons": "#/keyboard/backToMenu"
    },
    "/withdraw": {
      "edit": true,
      "text": "💸 *Withdrawal Request*\n\n🧾 *Your Balance:* {balance} {currency}\n\nPlease enter the amount you'd like to withdraw below.\n\nIf you change your mind, just tap /cancel.",
      "run": { "command": "acceptWithdrawAmount" }
    },
    "admin:withdrawRequest": {
      "chat_id": "{admin_channel}",
      "text": "🔔 *New Withdrawal Request!*\n\n👤 *User ID:* {user_id}\n💰 *Requested Amount:* {amount} {currency}\n👛 *Withdrawal Wallet:* {wallet_address}\n\n⚖️ _Please review the request and take action below:_",
      "inline_buttons": [
        [{ "text": "✅ Approve", "callback_data": "/approve_withdraw true {user_id} {withdrawId}" }, { "text": "❌ Reject", "callback_data": "/approve_withdraw false {user_id} {withdrawId}" }]
      ]
    },
    "admin:withdrawResponse": {
      "edit": true,
      "text": "🔧 *Withdrawal {status}* for User ID: {userId}.\n💵 Amount: {amount} {currency}\n⏱ *Time:* {time}",
      "inline_buttons": []
    },
    "/admin": {
      "text": "🔧 *Admin Commands*:\n\n1️⃣ /ban [user_id] - Ban a user.\n2️⃣ /unban [user_id] - Unban a user.\n3️⃣ /broadcast - Reply to the message you want to send to all users."
    },
    "acceptWithdrawAmount": {
      "edit": true,
      "message_id": "{message_id}",
      "text": "✅ *Your withdrawal request has been submitted!*\n\n💰 *Amount:* {amount} {currency}\n👛 *Wallet:* {wallet_address}\n\n⏳ Please wait while our team reviews and processes your request. You will be notified once it's approved or rejected.",
      "inline_buttons": "#/keyboard/backToMenu",
      "dialogErrors": {
        "invalid": "❌ *Oops! Invalid Amount!*\n{amount} isn’t a valid number.\n\nThat doesn’t look right—try again with a proper number (max: {balance}).",
        "zero": "⚠️ *No Funds Available!*\nYour balance is currently zero.\n\nYou’ll need to earn some funds first—referring friends is a great way to start! 😉",
        "notEnough": "❌ *Insufficient Funds!*\nYou entered {amount}, but your balance is only {balance}.\n\nTry again with an amount that’s within your available balance.",
        "small": "❌ *Amount Too Small!*\n{amount} is below the minimum withdrawal limit.\n\nTry again with an amount between *{minimum_withdraw}* and *{balance}*.",
        "big": "❌ *Amount Too Large!*\n{amount} exceeds the maximum withdrawal limit.\n\nTry again with an amount no more than *{balance}*.",
        "notInteger": "❌ *Whole Numbers Only!*\n{amount} isn’t a whole number.\n\nTry again using a valid integer amount (no decimals)."
      }
    }
  },
  "titles": {
    "curLang": currentLang,
    "notJoinedChatsError": "⚠️ Please join all required channels to continue.\n\nWait a few seconds after joining, then try again.",
    "bonusReceived": "🎉 *Congrats! Bonus Received!*\n\n💸 You’ve earned *{bonus} {currency}* just for showing up!\n⏰ Next bonus in *{interval} hours*.\n\n👥 Invite friends, earn more — it’s that simple!",
    "bonusAlreadyClaimed": "⏳ *Bonus Already Claimed!*\n\n🕒 You need to wait *{remaining} hours* before claiming again.\n\n📢 Don’t wait idle — share your referral link and keep earning!",
    "adminMessage": "📬 *New Support Request*\n\n👤 *User ID:* {user_id}\n\n📝 *Message:* {message}",
    "noHistoryMessage": "⚠️ No Withdrawal History Yet! \n\nYou haven’t made any withdrawals yet. Once you do, your history will appear here.",
    "notAdminMessage": "⛔ Access Denied!\n\nThis action is restricted to administrators only.",
    "userWithdrawNotification": "👋 Hello! Your withdrawal request of *{amount} {currency}* has been {status}. 💸",
    "announcementTemplate": "📢 *Withdrawal Processed!* \n\n👤 *User ID:* {userId}\n💵 *Amount:* {amount} {currency}\n⏱ *Time:* {time}",
    "newReferralMessage": "🎉 *New Referral!*\n\nYour friend just joined and you've earned *{reward}* {currency}!"
  },
  "types": {
    "button": {
      "cancel": "❌ Cancel"
    },
    "keyboard": {
      "returnBack": [
        [{ "text": "⬅️ Go Back", "command": "{command}" }]
      ],
      "backToMenu": [
        [{ "text": "⬅️ Back to Menu", "command": "/menu" }]
      ],
      "backToWallet": [
        [{ "text": "💼 Back to Wallet", "command": "/manage_wallet" }]
      ],
      "selectlanguage": [
        [
          { "text": "🇺🇸 English", "command": "setLng en" },
          { "text": "🇪🇸 Spanish", "command": "setLng es" }
        ]
      ],
      "userMenu": [
        [{ "text": "💰 Balance", "command": "/balance" }],
        [{ "text": "🎁 Bonus", "command": "/claim_bonus" }, { "text": "📊 Referrals", "command": "/referral_info" }],
        [
          { "text": "💵 Withdraw", "command": "/withdraw" },
          { "text": "📜 History", "command": "/history" }
        ],
        [{ "text": "💼 Manage Wallet", "command": "/manage_wallet" }],
        [
          { "text": "📈 Statistics", "command": "/statistics" },
          { "text": "❓ Support", "command": "/faq" }
        ]
      ]
    }
  }
}

// Setup language for the bot
smartBot.setupLng("en", LANG);

