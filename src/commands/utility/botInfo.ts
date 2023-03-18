import { Command } from '../../structures/Command';
import { interactions } from '../../interactions';
import { EmbedBuilder } from 'discord.js';

export default new Command({
    interaction: interactions.botInfo,
    excute: async ({ client, interaction }) => {
        const serverCount = await (await client.shard.fetchClientValues('guilds.cache.size')).reduce((acc: number, guildCount: number) => acc + guildCount, 0);
        const infoEmbed = new EmbedBuilder()
            .setAuthor({ name: `${client.user.username} stats`, iconURL: client.user.displayAvatarURL() })
            .addFields(
                { name: 'Servers', value: `${serverCount}` },
                { name: 'Ping', value: `${client.ws.ping} ping` }
            )
            .setColor(client.cc.default)
        interaction.reply({ embeds: [infoEmbed] });
    }
});