import { antipingCommand } from "./automod/antiping";
import { boomerangCommand } from "./fun/boomerang";
import { banCommand } from "./moderation/ban";
import { kickCommand } from "./moderation/kick";
import { reactionMuteCommand } from "./moderation/reactionmute";
import { botinfoCommand } from "./utility/botinfo";
import { casesCommand } from "./utility/cases";
import { fakePermsCommand } from "./utility/fakeperms";
import { settingsCommand } from "./utility/settings";
import { setupCommand } from "./utility/setup";

export const interactions = {
    antiping: antipingCommand,
    ban: banCommand,
    botInfo: botinfoCommand,
    boomerang: boomerangCommand,
    cases: casesCommand,
    fakePerms: fakePermsCommand,
    kick: kickCommand,
    reactionmute: reactionMuteCommand,
    settings: settingsCommand,
    setup: setupCommand
};