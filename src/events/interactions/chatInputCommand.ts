import { Collection, Colors, CommandInteractionOptionResolver, EmbedBuilder, GuildMember, PermissionResolvable, Snowflake } from 'discord.js';
import { client } from '../..';
import { Event } from '../../structures/Event';
import { fakePermObject } from '../../typings/models';
const cooldown = new Collection<string, number>();

function validateFakePerms(fakePerms: Array<fakePermObject>, roles: Array<Snowflake>, perm: PermissionResolvable) {
    if (!fakePerms || !fakePerms[0]) {
        return false
    }
    const fakePerm = roles.find(el => fakePerms.some(fElement => fElement.roleID === el));
	
    return fakePerms.find((r) => r.roleID == fakePerm).permissions?.includes(perm) ? true : false;
  }

export default new Event('interactionCreate', async (interaction) => {
	if (!interaction.inGuild()) return;
	if (!interaction.inCachedGuild()) return;
	const guild = client.guildConfigs.find((g) => g.guildID == interaction.guild.id);

	if (interaction.isChatInputCommand()) {
		const member = interaction.member as GuildMember;
		const command = client.commands.get(interaction.commandName);

		if (!member) return;
		if (!command)
			return interaction.reply({
				embeds: [
					{
						description: `No commands were found matching \`/${interaction.commandName}\``,
						color: Colors.Red,
					},
				],
				ephemeral: true,
			});
		
		if (interaction.commandName !== 'setup' && !guild) {
			return interaction.reply({ embeds: [client.embeds.attention('This guild is not set up yet. Have a server admin set it up by running </setup:1083194569342066770>.')]})
		}

		if (command.interaction.ownerOnly && interaction.guild.ownerId !== interaction.user.id) {
			return interaction.reply({ embeds: [client.embeds.attention(client.constants.errorMessages.permission.notGuildOwner)], ephemeral: true })
		}
		// Permission Check	
		const userRoles = interaction.member.roles.cache.map((r) => { return r.id} );
		if (!member.permissions.has(command.interaction.permission) && !validateFakePerms(guild.fakePerms, userRoles, command.interaction.permission))
			return interaction.reply({
				embeds: [client.embeds.attention(`You're missing the **${command.interaction.permission.toString().toLowerCase()}** permission.`)],
				ephemeral: true,
			});
		if (command.interaction.botPermission?.some((perm) => !interaction.guild.members.me.permissions.has(perm)))
			return interaction.reply({
				embeds: [client.embeds.attention(`I'm missing the **${command.interaction.botPermission.toString().toLowerCase()}** permission.`)],
				ephemeral: true,
			});
		// Cooldowns
		if (cooldown.has(`${command.interaction.name}${interaction.user.id}`)) {
			// const cooldownRemaining = ~~(
			// 	+cooldown.get(`${command.interaction.name}${interaction.user.id}`) - +Date.now()
			// );
			const cooldownEmbed = new EmbedBuilder()
				.setColor(Colors.Red)
				.setDescription(`Please wait before using this again.`);

			return interaction.reply({ embeds: [cooldownEmbed], ephemeral: true });
		};

		await command.excute({
			client: client,
			interaction: interaction,
			options: interaction.options as CommandInteractionOptionResolver,
		});

		if (command.interaction.cooldown) {
			cooldown.set(
				`${command.interaction.name}${interaction.user.id}`,
				Date.now() + command.interaction.cooldown
			);
			setTimeout(() => {
				cooldown.delete(`${command.interaction.name}${interaction.user.id}`);
			}, command.interaction.cooldown);
		};
	};
});