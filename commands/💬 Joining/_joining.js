/*CMD
  command: /joining
  help:
  need_reply: false
  auto_retry_time:
  folder: 💬 Joining
  answer:
  keyboard:
  aliases:
  group:
CMD*/

// Get a list of channels the user still needs to join
const notJoinedChats = Libs.MembershipChecker.getNotJoinedChats();

// Check if the user is already a member of all required channels
const isUserMember = Libs.MembershipChecker.isMember();

// Helper function for handling non-members
function handleNotMember() {
  if (params === "check") {
    Libs.MembershipChecker.check();
    return smartBot.run({ command: "join:checkFailed" });
  }

  smartBot.add({ notJoinedChats });
}

if (isUserMember) {
  smartBot.run({ command: "/menu edit" });
} else {
  handleNotMember();
}