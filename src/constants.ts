export const errorMessages = {
    generic: {
        userNotInGuild: "The selected user is not in the guild."
    },
    moderation: {
        userHierarchyError: "You can\'t {action} **{user_tag}**.",
        userNotActionable: "I can\'t {action} **{user_tag}**.",
    },
    permission: {
        notGuildOwner: "Only the server owner can use this command."
    }
};

export const moderationMessages = {
    kick: {
        userKicked: "{mod_mention}: **{user_tag}** has been kicked from the server. | {reason}"
    },
    ban: {
        userBanned: "{mod_mention}: **{user_tag}** has been banned from the server. | {reason}"
    }
}