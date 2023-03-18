import { Snowflake } from "discord.js";
import { caseModel } from "../../models/caseSchema";

export async function getCaseNumber(guildID: Snowflake) {
    const cases = await caseModel.find({ guildID: guildID });
    return cases.length;
}