import { Client, Collection, ClientEvents, GatewayIntentBits, Partials, ActivityType } from 'discord.js';
import { commandType } from '../typings';
import { Event } from './Event';
import { readdirSync } from 'fs';
import { cc, clientEmbeds } from '../functions/other/client';
import { connect } from 'mongoose';
import { logger } from '../logger';
import { Config } from './Config';
import * as constants from '../constants';
import { GuildConfigType } from '../typings/models';
import { guildConfigModel } from '../models/guildConfiguration';

export class ExtendedClient extends Client {
	public commands: Collection<string, commandType> = new Collection();
	public embeds = clientEmbeds;
	public cc = cc;
	public config = new Config();
	public debugMode = false;
	public constants = constants;
	public guildConfigs: Collection<string, GuildConfigType> = new Collection();

	constructor() {
		super({
			intents: [
				GatewayIntentBits.AutoModerationConfiguration,
				GatewayIntentBits.AutoModerationExecution,
				GatewayIntentBits.Guilds,
				GatewayIntentBits.MessageContent
			],
			partials: [
				Partials.GuildMember,
				Partials.Message
			],
			presence: {
				status: 'online',
				activities: [{
					type: ActivityType.Listening,
					name: 'your fav nightcore sped up slowed down reverb 8d edit audio 1 hour version'
				}]
			},
			failIfNotExists: true,
			allowedMentions: { repliedUser: false },
		});
		this.born();
	}
	
	private async born() {
		// Connecting to MongoDB
		const mongoDBConnection = process.env.MONGO_URL;
		if (!mongoDBConnection) return;
		await connect(mongoDBConnection, { dbName: 'rigbyMod' }).then(() => { logger.info('MongoDB Connected', { showDate: false }) });
		await this.registerModules();
		await this.login(process.env.DISCORD_TOKEN).then(() => {
			this.handlerErrors();
		});
		(await guildConfigModel.find()).forEach((g) => {
			this.guildConfigs.set(g.guildID, g)
		});
	}

	private async importFiles(filePath: string) {
		return (await import(filePath))?.default;
	}

	// Registers commands and events if called. */
	private async registerModules() {
		// Commands
		console.log('Registering commands...');
		for (const category of readdirSync(`${__dirname}/../commands`)) {
			for (const fileName of readdirSync(`${__dirname}/../commands/${category}`)) {
				const filePath = `${__dirname}/../commands/${category}/${fileName}`;
				const command: commandType = await this.importFiles(filePath.toString());

				this.commands.set(command.interaction.name, command);
			}
		}
		console.log('Registered commands');

		// Events
		console.log('Registering events...');
		for (const category of readdirSync(`${__dirname}/../events`)) {
			if (category.endsWith('.ts') || category.endsWith('.js')) {
				const filePath = `${__dirname}/../events/${category}`;
				const event: Event<keyof ClientEvents> = await this.importFiles(filePath.toString());
				this.on(event.event, event.run);
			} else {
				for (const fileName of readdirSync(`${__dirname}/../events/${category}`)) {
					const filePath = `${__dirname}/../events/${category}/${fileName}`;
					const event: Event<keyof ClientEvents> = await this.importFiles(filePath.toString());
					this.on(event.event, event.run);
				}
			}
		}
		console.log('Registered events');
	}

	// Handles process errors and exits if called.
	private handlerErrors() {
		process.on('unhandledRejection', (reason: Error) => {
			console.log('\n' + reason.stack);
		});
		process.on('uncaughtException', (reason: Error) => {
			console.log('\n' + reason.stack);
		});
		process.on('warning', (reason: Error) => {
			console.log('\n' + reason.stack);
		});
		process.on('disconnect', () => {
			this.destroy();
		});
		process.on('beforeExit', () => {
			this.destroy();
		});
		process.on('exit', () => {
			this.destroy();
		});
	}
}
