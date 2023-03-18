import { Command } from '../../structures/Command';
import { interactions } from '../../interactions';

export default new Command({
    interaction: interactions.antiping,
    excute: async ({ client, interaction, options }) => {
        const subcommand = options.getSubcommand();
        const guild = client.guildConfigs.find((guild) => guild.guildID == interaction.guild.id);

        switch (subcommand) {
            case 'add':
                if (!guild.automod.ruleID) {
                    
                }
                break;
        }
    }
})