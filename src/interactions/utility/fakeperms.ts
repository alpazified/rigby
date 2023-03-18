import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
import { interactionOptions } from "../../typings";

export const fakePermsCommand = {
    name: 'fakeperms',
    description: 'Manage fake permissions for this guild.',
    type: ApplicationCommandType.ChatInput,
    ownerOnly: true,
    cooldown: 5000,
    options: [
        {
            name: 'view',
            description: 'View the fake permissions assigned to a role.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'role',
                    description: 'The role you want to view.',
                    type: ApplicationCommandOptionType.Role,
                    required: true
                }
            ]
        },
        {
            name: 'edit',
            description: 'Edit the fake permissions assigned to a role',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'role',
                    description: 'Role you want to edit.',
                    type: ApplicationCommandOptionType.Role,
                    required: true
                }
            ]
        }
    ]
} as interactionOptions;