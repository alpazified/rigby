import { ApplicationCommandType } from "discord.js";
import { interactionOptions } from "../../typings";

export const botinfoCommand = {
    name: 'botinfo',
    description: 'View information about rigby.',
    type: ApplicationCommandType.ChatInput,
    cooldown: 5000,
    directory: 'info',
} as interactionOptions;