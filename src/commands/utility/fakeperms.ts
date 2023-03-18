import { Command } from '../../structures/Command';
import { interactions } from '../../interactions';
import { ActionRowBuilder, ComponentType, PermissionResolvable, StringSelectMenuBuilder } from 'discord.js';
import { GuildConfigType } from '../../typings/models';
import { guildConfigModel } from '../../models/guildConfiguration';

export default new Command({
    interaction: interactions.fakePerms,
    excute: async ({ client, interaction, options }) => {
        try {

        
        const subcommand = options.getSubcommand();
        const role = options.getRole('role');
        const fakePerm = client.guildConfigs.find((g) => g.guildID == interaction.guild.id)?.fakePerms.find((r) => r.roleID == role.id);

        switch (subcommand) {
            case 'view':
                if (!fakePerm) {
                    return interaction.reply({ embeds: [client.embeds.attention(`${role.toString()} doesn\'t have any fake perms configured.`)], ephemeral: true })
                }
                break;
            case 'edit':
                const permissionRow = new ActionRowBuilder<StringSelectMenuBuilder>()
                .addComponents([
                        new StringSelectMenuBuilder()
                            .setCustomId('cltr-permissions')
                            .setMinValues(1)
                            .setMaxValues(7)
                            .setPlaceholder('Set permissions for @' + role.name)
                            .setOptions(
                                { default: fakePerm?.permissions?.includes('Administrator'), label: 'Administrator', value: 'Administrator' },
                                { default: fakePerm?.permissions?.includes('ManageGuild'), label: 'Manage Server', value: 'ManageGuild' },
                                { default: fakePerm?.permissions?.includes('ManageChannels'), label: 'Manage Channels', value: 'ManageChannels' },
                                { default: fakePerm?.permissions?.includes('BanMembers'), label: 'Ban Members', value: 'BanMembers' },
                                { default: fakePerm?.permissions?.includes('KickMembers'), label: 'Kick Members', value: 'KickMembers' },
                                { default: fakePerm?.permissions?.includes('ModerateMembers'), label: 'Moderate Members', value: 'ModerateMembers' },
                                { default: fakePerm?.permissions?.includes('ManageMessages'), label: 'Manage Messages', value: 'ManageMessages' },
                            ),
                    ]);
                const response = await interaction.reply({ embeds: [client.embeds.info(`Choose the fake permissions that you want to assign to ${role.toString()}.`)], components: [permissionRow] });
                const filter = i => i.user.id == interaction.user.id;
                const collector = response.createMessageComponentCollector({ filter: filter, componentType: ComponentType.StringSelect, time: 30000 });
                collector.on('collect', async (c) => {
                    await c.update({ embeds: [client.embeds.info(`Added **${c.values.join(', ')}** to ${role.toString()}.`)], components: [] })
                    const guild = client.guildConfigs.find((g) =>  g.guildID == interaction.guild.id);
                    const rolePos = guild.fakePerms.indexOf({ roleID: role.id })
                    if (rolePos != -1) {
                        guild.fakePerms[rolePos] = { roleID: role.id, permissions: c.values as PermissionResolvable[] }
                    } else {
                        guild.fakePerms.push({ roleID: role.id, permissions: c.values as PermissionResolvable[] })
                    }
                    const updatedGuild: GuildConfigType = {
                        guildID: interaction.guild.id, 
                        logsID: guild.logsID,
                        automod: guild.automod,
                        fakePerms: guild.fakePerms,
                        roles: guild.roles

                    };
                    await guildConfigModel.findOneAndUpdate({ guildID: interaction.guild.id }, { $set: { fakePerms: guild.fakePerms}})
                    client.guildConfigs.set(interaction.guild.id, updatedGuild);
                });
                collector.on('end', async () => {
                    await interaction.editReply({ components: [] });
                })

                break;
            default:
                break;
            }
        } catch (err) {
            console.log(err)
        }
    }
})