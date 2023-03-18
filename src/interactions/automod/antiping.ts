import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
import { interactionOptions } from "../../typings";

export const antipingCommand = {
    name: 'antiping',
    description: 'Manage your antiping settings in this guild.',
    type: ApplicationCommandType.ChatInput,
    cooldown: 15000,
    permission: 'ManageGuild',
    botPermission: ['ManageGuild'],
    options: [
        {
            name: 'add',
            description: 'Add a user to the antiping list.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'user',
                    description: 'User to be added to the antiping list.',
                    type: ApplicationCommandOptionType.User,
                    required: true
                }
            ]
        },
        {
            name: 'view',
            description: 'View all users on the antiping list.',
            type: ApplicationCommandOptionType.Subcommand
        },
        {
            name: 'remove',
            description: 'Remove a user from the antiping list.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'user',
                    description: 'User to be removed from the antiping list.',
                    type: ApplicationCommandOptionType.User,
                    required: true
                }
            ]
        }
    ]
} as interactionOptions;