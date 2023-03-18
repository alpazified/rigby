import { Command } from '../../structures/Command';
import { interactions } from '../../interactions';
import { CommandInteraction, GuildMember, User } from 'discord.js';
import { createCase } from '../../functions/cases/createCase';
import { sendPunishmentLog } from '../../functions/utility/sendLogs';
import { ExtendedClient } from '../../structures/Client';

async function banUser(interaction: CommandInteraction, client: ExtendedClient, member: User, reason: string) {
    await interaction.guild.bans.create(member, { reason: `[${reason}] - ${interaction.user.tag}`});
    await interaction.reply({ embeds: [client.embeds.success(client.constants.moderationMessages.ban.userBanned
        .replace('{mod_mention}', interaction.user.toString())
        .replace('{user_tag}', member.tag)
        .replace('{reason}', reason)    
        )] })
};

export default new Command({
    interaction: interactions.ban,
    excute: async ({ client, interaction, options }) => {
        const member = options.getUser('member') as User;
        const guildMember = options.getMember('member') as GuildMember;
        const reason = options.getString('reason') || 'No reason provided';
        const author = interaction.member as GuildMember;

        if (!member) {
            return interaction.reply({ embeds: [client.embeds.attention(client.constants.errorMessages.generic.userNotInGuild)] })
        } else {
            if (!guildMember) {
                await banUser(interaction, client, member, reason)
            } else {
                if (interaction.guild.ownerId !== interaction.user.id) {
                    if (guildMember?.roles?.highest?.rawPosition >= author?.roles?.highest?.rawPosition) {
                        return interaction.reply({ embeds: [client.embeds.attention(client.constants.errorMessages.moderation.userHierarchyError
                            .replace('{action}', 'ban')
                            .replace('{user_tag}', guildMember.user.tag)    
                        )], ephemeral: true })
                    }
                }

                if (!guildMember.bannable) {
                    return interaction.reply({ embeds: [client.embeds.attention(client.constants.errorMessages.moderation.userNotActionable
                        .replace('{action}', 'ban')
                        .replace('{user_tag}', guildMember.user.tag)    
                    )], ephemeral: true })
                }
                await banUser(interaction, client, member, reason)
                const modCase = await createCase(interaction.guild, author, 'ban', reason, null, member);
                return await sendPunishmentLog(interaction.guild, author, member, reason, modCase, 'ban')
            }
        }
    },
});