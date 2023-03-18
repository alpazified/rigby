import { Command } from '../../structures/Command';
import { interactions } from '../../interactions';
import { GuildMember } from 'discord.js';
import { createCase } from '../../functions/cases/createCase';

export default new Command({
    interaction: interactions.reactionmute,
    excute: async ({ client, interaction, options }) => {
        const guildUser = interaction.member as GuildMember;
        const member = options.getMember('member') as GuildMember;
        const reason = options.getString('reason') || 'No reason provided';
        const guild = client.guildConfigs.find((g) => g.guildID == interaction.guild.id);
        if (!member) {
            return await interaction.reply({ embeds: [client.embeds.error(client.constants.errorMessages.generic.userNotInGuild)], ephemeral: true })
        } else {
            await interaction.deferReply()
            let skip = false;
            if (interaction.user.id == interaction.guild.ownerId) {
                skip = true;
            }
            if (!skip) {
                if (member.roles.highest >= guildUser.roles.highest) {
                    return await interaction.editReply({ embeds: [client.embeds.attention('You cannot moderate a user with a role higher than or equal to your highest role.')] })
                };
            };
            if (!member.moderatable) {
                return await interaction.editReply({ embeds: [client.embeds.error('I don\'t have permission to moderate this user.')] })
            }
            if (member.roles.cache.find((r) => r.id == guild.roles.reactionMute)) {
                return await interaction.editReply({ embeds: [{ description: `${member.user.tag} is already reaction muted.`, color: client.cc.default }]  })
            }
            await member.roles.add(guild.roles.reactionMute, `[${reason}] - ${interaction.user.tag}`).catch(async (e) => {
                console.log(e)
                return await interaction.editReply({ embeds: [client.embeds.attention('An error occured when attempting to run this command.')] })
            });
            await interaction.editReply({ embeds: [client.embeds.success(`Removed **${member.user.tag}** reaction permissions.`)] });
            return await createCase(interaction.guild, guildUser, 'reaction mute', reason, 'Indefinite', member.user);
        }
    }
});