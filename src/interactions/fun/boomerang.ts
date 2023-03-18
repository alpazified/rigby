import { ApplicationCommandType } from "discord.js";
import { interactionOptions } from "../../typings";

export const boomerangCommand = {
    name: 'boomerang',
    description: 'Throw a boomerang and timeout whoever it hits!',
    type: ApplicationCommandType.ChatInput,
    cooldown: 50000,
    directory: 'fun',
    permission: 'ManageMessages',
    botPermission: ['ModerateMembers', 'ReadMessageHistory']
} as interactionOptions;