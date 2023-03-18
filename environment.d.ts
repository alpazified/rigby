declare global {
	namespace NodeJS {
		interface ProcessEnv {
			DISCORD_TOKEN: string;
			CLIENT_ID: string;
			GUILD_ID: string;
			MONGO_URL: string;
			LASTFM_API_KEY: string;
			LASTFM_SHARED_SECRET: string;	
		}
	}
}

export {};