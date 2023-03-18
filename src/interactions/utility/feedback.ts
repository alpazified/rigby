import { ApplicationCommandType } from "discord.js";
import { interactionOptions } from "../../typings";

export const feedbackCommand = {
    name: 'feedback',
    description: 'Provide feedback about rigby to the bot developers.',
    type: ApplicationCommandType.ChatInput,
    cooldown: 300000
} as interactionOptions;