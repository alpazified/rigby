import { Command } from '../../structures/Command';
import { interactions } from '../../interactions';
import { caseModel } from '../../models/caseSchema';
import { capitalize } from '../../functions/other/capitalize';
import { EmbedBuilder } from 'discord.js';
import { Paginator } from '../../structures/Paginator';
// import { Paginator } from '../../structures/Paginator';
// import { EmbedBuilder } from 'discord.js';

export default new Command({
    interaction: interactions.cases,
    excute: async ({ client, interaction, options }) => {
        const moderator = options.getUser('moderator');
        const punishedUser = options.getUser('punished_user');
        const type = options.getString('type');
        const reason = options.getString('reason');

        let cases = await caseModel.find({ guildID: interaction.guild.id });
        if (moderator) {
            cases = cases.filter((c) => c.moderatorID == moderator.id)
        }   if (punishedUser) {
            cases = cases.filter((c) => c.affectedMemberUserID == punishedUser.id)
        }   if (type) {
            cases = cases.filter((c) => c.action == type)
        }   if (reason) {
            cases = cases.filter((c) => reason.includes(c.reason))
        }
        const mappedCases = [];
        cases.forEach((c) => {
            mappedCases.push(`**Case #${c.caseNum}**\n**Member:** ${c.affectedMemberUserTag} \`(${c.affectedMemberUserID})\`\n**Action:** ${capitalize(c.action)}\n**Reason**: ${c.reason}`)
        });
        if (mappedCases.length == 0) {
            return interaction.reply({ embeds: [client.embeds.attention(`${interaction.user.toString()}: There are no cases matching this filter.`)]})
        } else if (mappedCases.length <= 4) {
            const casesEmbed = new EmbedBuilder()
                .setAuthor({ name: moderator?.tag || punishedUser?.tag || interaction?.guild?.name || null, iconURL: moderator?.displayAvatarURL() || punishedUser?.displayAvatarURL() || interaction.guild?.iconURL() || null  })
                .setTitle(`Cases for ${moderator?.username|| punishedUser?.username || interaction?.guild?.name}`)
                .setDescription(mappedCases.join('\n\n'))
                .setFooter({ text: `${cases.length == 1 ? `${cases.length} case` : `${cases.length} cases`}`})
                .setColor(client.cc.default);
            return interaction.reply({ embeds: [casesEmbed] })
        } else if (mappedCases.length >= 5) {
            const casesEmbed = new EmbedBuilder()
                .setAuthor({ name: moderator?.tag || punishedUser?.tag || interaction?.guild?.name || null, iconURL: moderator?.displayAvatarURL() || punishedUser?.displayAvatarURL() || interaction.guild?.iconURL() || null  })
                .setTitle(`Cases for ${moderator?.username|| punishedUser?.username || interaction?.guild?.name}`)
                .setDescription('${{array}}')
                .setFooter({ text: 'Page ${{currentPage}}/${{totalPages}} ' + `(${cases.length} cases)` })
                .setColor(client.cc.default);

            const pagination = new Paginator();
            pagination.start(interaction, {
                array: mappedCases,
                itemPerPage: 4,
                joinWith: '\n\n',
                time: 60000,
                embed: casesEmbed,
                searchButton: true
            });
        }
    }
})