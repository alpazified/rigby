import type {
	AutocompleteInteraction,
	ChatInputApplicationCommandData,
	CommandInteraction,
	CommandInteractionOptionResolver,
	EmbedBuilder,
	ModalSubmitInteraction,
	PermissionResolvable,
	UserContextMenuCommandInteraction,
} from 'discord.js';
import { ExtendedClient } from '../structures/Client';

// Logger

export interface LoggerClientOptions {
	timezone: string;
}

export interface LoggerDataOptions {
	source?: 'unhandledRejection' | 'uncaughtException' | 'warning' | any;
	reason?: Error;
	showDate?: boolean;
	space?: boolean;
};

// Command Interaction

export interface commandExcuteOptions {
	client?: ExtendedClient;
	interaction?: CommandInteraction;
	options?: CommandInteractionOptionResolver;
}

export interface autocompleteOptions {
	client?: ExtendedClient;
	interaction?: AutocompleteInteraction;
}

type commandExcuteFunction = (options: commandExcuteOptions) => any;
type autocompleteFunction = (options: autocompleteOptions) => any;

type commandDirectories = 
	| 'utility' 
	| 'info' 
	| 'config' 
	| 'moderation' 
	| 'automod'
	| 'fun';

export type interactionOptions = {
	name: string;
	description?: string;
	directory: commandDirectories;
	cooldown?: number;
	ownerOnly?: boolean;
	permission?: PermissionResolvable;
	botPermission?: PermissionResolvable[];
} & ChatInputApplicationCommandData;

export type commandType = {
	interaction: interactionOptions;
	excute: commandExcuteFunction;
	autocomplete?: autocompleteFunction
};

// Discord chat timestamps

export type DiscordTimestampsNames =
	| 'Short Time'
	| 'Long Time'
	| 'Short Date'
	| 'Long Date'
	| 'Short Date/Time'
	| 'Long Date/Time'
	| 'Relative Time';

export enum discordTimestampUnixs {
	'Short Time' = 't',
	'Long Time' = 'T',
	'Short Date' = 'd',
	'Long Date' = 'D',
	'Short Date/Time' = 'f',
	'Long Date/Time' = 'F',
	'Relative Time' = 'R',
}

// Paginator

export type PaginatorInteractionTypes = CommandInteraction | UserContextMenuCommandInteraction | ModalSubmitInteraction;

export interface paginatorOptions {
	array: any[];
	itemPerPage: number;
	joinWith?: string;
	time: number;
	embed: EmbedBuilder;
	ephemeral?: boolean;
	searchButton: boolean;
}

export interface paginatorStatusOptions {
	totalPages: number;
	currentPage: number;
	slice1: number;
	slice2: number;
}

// Emojis
// Emojis Config

export type EmojisConfigTypes =
	| 'success'
	| 'error'
	| 'attention'
	| 'lastfm'

export interface emojisConfigTypes {
	success: string;
	error: string;
	attention: string;
}

export enum emojisConfigDefaults {
	success = '✅',
	error = '❌',
	attention = '❗️',
}

export type ActionType =
	| 'ban'
	| 'kick'
	| 'timeout'
	| 'reaction mute'
	| 'image mute'
	| 'lockdown'