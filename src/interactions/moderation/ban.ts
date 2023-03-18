import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
import { interactionOptions } from "../../typings";

export const banCommand = {
    name: 'ban',
    description: 'ban a user from your guild.',
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    permission: 'BanMembers',
    botPermission: ['BanMembers'],
    options: [
        {
            name: 'member',
            description: 'User you want to ban from your guild.',
            type: ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: 'reason',
            description: 'Reason for banning the user from your guild.',
            type: ApplicationCommandOptionType.String,
            max_length: 300,
            required: false
        },
    ]
} as interactionOptions;