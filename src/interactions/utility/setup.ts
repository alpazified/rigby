import { interactionOptions } from "../../typings";

export const setupCommand = {
    name: 'setup',
    description: 'Setup rigby in your server.',
    directory: 'utility',
    permission: 'ManageGuild',
    cooldown: 600000,
    botPermission: ['ManageRoles', 'ManageChannels']
} as interactionOptions;