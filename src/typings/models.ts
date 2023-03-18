import { PermissionResolvable, type Snowflake } from "discord.js";
import { ActionType } from ".";

export type fakePermObject = {
    roleID: Snowflake;
    permissions?: PermissionResolvable[]
}

export type GuildConfigType = {
    guildID: Snowflake;
    automod: {
        ruleID: Snowflake;
        antiping: boolean;
    };
    logsID: Snowflake;
    roles: {
        reactionMute?: Snowflake;
        imageMute?: Snowflake
    };
    fakePerms: Array<fakePermObject>
};

export type CaseType = {
    guildID: Snowflake;
    moderatorID: Snowflake;
    action: ActionType;
    timestamp: Snowflake;
    reason: string;
    caseNum: number;
    duration?: string
    affectedMemberUserID: Snowflake;
    affectedMemberUserTag: string    
}