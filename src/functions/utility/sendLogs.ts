import { EmbedBuilder, Guild, GuildMember, GuildTextBasedChannel, User } from "discord.js";
import { client } from "../..";
import { ActionType } from "../../typings";

export async function sendPunishmentLog(guild: Guild, moderator: GuildMember, punishedUser: User, reason: string, caseNum: number, type: ActionType, _duration?: string, _expire?: boolean) {
    const guildConfig = client.guildConfigs.find((g) => g?.guildID == guild?.id);
    if (!guildConfig?.logsID) return;
    
    const logChannel = await guild.channels.fetch(guildConfig.logsID) as GuildTextBasedChannel;
    if (!logChannel || !logChannel.permissionsFor(client.user.id).has('SendMessages')) return;

    const logEmbed = new EmbedBuilder()
        .setAuthor({ name: moderator.user.tag, iconURL: moderator.user.displayAvatarURL() })
        .setTitle(`Case #${caseNum} | ${type}`)
        .addFields(
            { name: 'Moderator', value: `${moderator.user.tag}\n**(${moderator.user.id})**`, inline: true },
            { name: 'User', value: `${punishedUser.tag}\n**(${punishedUser.id})**`, inline: true },
            { name: 'Reason', value: reason, inline: false },
        )
        .setColor(client.cc.default)
        .setTimestamp();

    if (_duration) {
        logEmbed.addFields({ name: 'Duration', value: _duration });
    }
    if (_expire) {
        logEmbed.addFields({ name: 'Expired', value: 'True' });
    };

    await logChannel.send({ embeds: [logEmbed] });
};