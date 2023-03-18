import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
import { interactionOptions } from "../../typings";

export const casesCommand = {
    name: 'cases',
    description: 'View moderation cases in your server.',
    directory: 'utility',
    type: ApplicationCommandType.ChatInput,
    cooldown: 8000,
    permission: 'ManageMessages',
    options: [
        {
            name: 'moderator',
            description: 'The moderator the cases belong to.',
            type: ApplicationCommandOptionType.User,
        },
        {
            name: 'punished_user',
            description: 'The user punished in the cases.',
            type: ApplicationCommandOptionType.User
        },
        {
            name: 'type',
            description: 'The type of cases you want to display.',
            type: ApplicationCommandOptionType.String,
            choices: [
                { name: 'ban', value: 'ban' },
                { name: 'kick', value: 'kick' },
                { name: 'timeout', value: 'timeout' },
                { name: 'reaction mute', value: 'reaction mute' },
                { name: 'image mute', value: 'image mute' },
                { name: 'channel lock', value: 'channel lock' },
                { name: 'channel unlock', value: 'channel unlock' },
                { name: 'lockdown', value: 'lockdown' }
            ]
        },
        {
            name: 'reason',
            description: 'The reason attached to the case.',
            type: ApplicationCommandOptionType.String,
            max_length: 300
        }
    ]
} as interactionOptions;