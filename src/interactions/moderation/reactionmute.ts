import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
import { interactionOptions } from "../../typings";

export const reactionMuteCommand = {
    name: 'reactionmute',
    description: 'Remove a member\'s permission to add reactions.',
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    permission: 'ManageMessages',
    botPermission: ['ManageRoles'],
    options: [
        {
            name: 'member',
            description: 'Member you want to revoke reaction perms from.',
            type: ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: 'reason',
            description: 'Reason for reaction muting this member.',
            type: ApplicationCommandOptionType.String,
            max_length: 300,
            required: false
        }
    ]
} as interactionOptions;