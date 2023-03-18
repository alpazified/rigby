import { Schema, model, SchemaTypes } from 'mongoose';
import { type GuildConfigType } from '../typings/models';

const schema = new Schema({
    guildID: { type: SchemaTypes.String, required: true },
    logsID: { type: SchemaTypes.String, required: false },
    automod: {
        ruleID: { type: SchemaTypes.String, required: false },
        antiping: { type: SchemaTypes.Boolean, required: false },
    },
    fakePerms: { type: SchemaTypes.Array, required: false }, 
    roles: {
        reactionMute: { type: SchemaTypes.String, required: false },
        imageMute: { type: SchemaTypes.String, required: false } 
    }
}, { versionKey: false });

export const guildConfigModel = model<GuildConfigType>('guildConfig', schema);
