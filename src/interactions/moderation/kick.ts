import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
import { interactionOptions } from "../../typings";

export const kickCommand = {
    name: 'kick',
    description: 'Kick a user from your guild.',
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    permission: 'KickMembers',
    botPermission: ['KickMembers'],
    options: [
        {
            name: 'member',
            description: 'User you want to kick from your guild.',
            type: ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: 'reason',
            description: 'Reason for kicking the user from your guild.',
            type: ApplicationCommandOptionType.String,
            max_length: 300,
            required: false
        },
    ]
} as interactionOptions;