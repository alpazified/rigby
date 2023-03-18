import { ApplicationCommandOptionType } from "discord.js";
import { interactionOptions } from "../../typings";

export const settingsCommand = {
    name: 'settings',
    description: 'Configure your guild\'s server settings.',
    directory: 'config',
    cooldown: 30000,
    permission: 'ManageGuild',
    options: [
        {
            name: 'view',
            description: 'View your guild\'s server configuration.',
            type: ApplicationCommandOptionType.Subcommand
        },
        {
            name: 'reset',
            description: 'Reset your guild\'s server configuration.',
            type: ApplicationCommandOptionType.Subcommand
        },
    ]
} as interactionOptions;