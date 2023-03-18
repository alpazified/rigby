import { Guild, GuildMember, User } from "discord.js";
import { caseModel } from "../../models/caseSchema";
import { ActionType } from "../../typings";
import { getCaseNumber } from "./getCaseNumber";

export async function createCase(guild: Guild, moderator: GuildMember, action: ActionType, reason: string, _duration: string, _affectedMember: User) {
    const caseNumber = await getCaseNumber(guild.id) + 1;
    await new caseModel({
        guildID: guild.id,
        moderatorID: moderator.user.id,
        action: action,
        timestamp: Date.now(),
        reason: reason,
        caseNum: caseNumber,
        duration: _duration,
        affectedMemberUserID: _affectedMember.id,
        affectedMemberUserTag: _affectedMember.tag
    }).save();
    return caseNumber;
}