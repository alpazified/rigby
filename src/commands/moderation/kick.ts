import { Command } from '../../structures/Command';
import { interactions } from '../../interactions';
import { GuildMember } from 'discord.js';
import { createCase } from '../../functions/cases/createCase';
import { sendPunishmentLog } from '../../functions/utility/sendLogs';

export default new Command({
    interaction: interactions.kick,
    excute: async ({ client, interaction, options }) => {
        const member = options.getMember('member') as GuildMember;
        const reason = options.getString('reason') || 'No reason provided';
        const author = interaction.member as GuildMember;
        if (!member) {
            return interaction.reply({ embeds: [client.embeds.error(client.constants.errorMessages.generic.userNotInGuild)] });
        } else {
            let check = true;
            if (interaction.user.id == interaction.guild.ownerId) check = false;
            if (check) {
                if (member.roles.highest.position >= author.roles.highest.position) {
                    return interaction.reply({ embeds: [client.embeds.attention(client.constants.errorMessages.moderation.userHierarchyError
                        .replace('{action}', 'kick')
                        .replace('{user_tag}', member.user.tag)
                    )], ephemeral: true });
                };
            };
            if (!member.kickable) {
                return interaction.reply({ embeds: [client.embeds.attention(client.constants.errorMessages.moderation.userNotActionable
                    .replace('{action}', 'kick')
                    .replace('{user_tag}', member.user.tag))], ephemeral: true })
            };
            await member.kick(`[${reason}] - ${interaction.user.tag}`);
            await interaction.reply({ embeds: [client.embeds.success(client.constants.moderationMessages.kick.userKicked
                .replace('{mod_mention}', interaction.user.toString())
                .replace('{reason}', reason)
                .replace('{user_tag}', member.user.tag)
                )] });
            const modCase = await createCase(interaction.guild, author, 'kick', reason, null, member.user);
            return await sendPunishmentLog(interaction.guild, author, member.user, reason, modCase, 'kick');   
        }
    }
})