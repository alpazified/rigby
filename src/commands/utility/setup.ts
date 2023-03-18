// import { AutoModerationRuleEventType, AutoModerationRuleTriggerType } from "discord.js";
import { interactions } from "../../interactions";
import { guildConfigModel } from "../../models/guildConfiguration";
import { Command } from "../../structures/Command";

export default new Command({
    interaction: interactions.setup,
    excute: async({ client, interaction }) => {
        await interaction.deferReply({ ephemeral: false });

        await interaction.editReply({ embeds: [{ description: 'Setting up roles. (1/2)', color: client.cc.default }] })
        const reactionRole = await interaction.guild.roles.create({ name: 'reaction muted', mentionable: false, hoist: false, permissions: [], reason: 'Setting up rigby roles.' });
        
        const channels = (await interaction.guild.channels.fetch()).map((r) => { return r; });
        for (const channel of channels) {
            await channel.permissionOverwrites.create(reactionRole, {
                AddReactions: false,
                UseExternalEmojis: false,
                UseExternalStickers: false,
            }).catch(() => { });
        };
        
        await interaction.editReply({ embeds: [{ description: 'Setting up roles. (2/2)', color: client.cc.default }] })
        const imagesRole = await interaction.guild.roles.create({ name: 'image muted', mentionable: false, hoist: false, permissions: [], reason: 'Setting up rigby roles.' });
        
        for (const channel of channels) {
            await channel.permissionOverwrites.create(imagesRole, {
                AttachFiles: false
            });
        };
        await interaction.editReply({ embeds: [{ description: 'Creating automod settings.', color: client.cc.default }]});
        // const automodRule = await interaction.guild.autoModerationRules.create({ name: 'rigby automod', eventType: AutoModerationRuleEventType.MessageSend, triggerType: AutoModerationRuleTriggerType.Keyword, actions: { type: AutoModerationActionType.BlockMessage} });
        
        await interaction.editReply({ embeds: [{ description: 'Setting up logging.', color: client.cc.default }] });
        const loggingChannel = await interaction.guild.channels.create({ name: 'rigby-logs', type: 0, permissionOverwrites: [{ deny: ['ViewChannel', 'SendMessages',], id: interaction.guild.roles.everyone.id }] })
        
        await interaction.editReply({ embeds: [client.embeds.success('**rigby** has been set up and is now ready for use.' )] });
        const model = await new guildConfigModel({
            guildID: interaction.guild.id,
            logsID: loggingChannel.id,
            roles: {
                reactionMute: reactionRole.id,
                imageMute: imagesRole.id
            }
        }).save();
        return client.guildConfigs.set(interaction.guild.id, model);

    }
})