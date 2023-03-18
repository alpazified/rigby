import { EmbedBuilder, GuildTextBasedChannel } from "discord.js";
import { client } from "../..";
import { Event } from "../../structures/Event";

export default new Event('autoModerationActionExecution', async (action) => {
    const guild = client.guildConfigs.find((g) => g.guildID == action.guild.id);
    if (guild.automod.antiping && action.ruleId == guild.automod.ruleID) {
        const channel = await action.guild.channels.fetch(action.channelId) as GuildTextBasedChannel;
        const noticeEmbed = new EmbedBuilder()
            .setDescription(`<@${action.userId}> - You can\'t ping ${action.matchedContent}`)
            .setColor('#2F3136');
        await channel.send({ embeds: [noticeEmbed] });
    };
});