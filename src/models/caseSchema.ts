import { Schema, model, SchemaTypes } from 'mongoose';
import { type CaseType } from '../typings/models';

const schema = new Schema({
    guildID: { type: SchemaTypes.String, required: true },
    caseNum: { type: SchemaTypes.Number, required: true },
    moderatorID: { type: SchemaTypes.String, required: true },
    action: { type: SchemaTypes.String, required: true },
    timestamp: { type: SchemaTypes.String, required: true },
    reason: { type: SchemaTypes.String, required: true },
    duration: { type: SchemaTypes.String, required: false },
    affectedMemberUserID: { type: SchemaTypes.String, required: false },
    affectedMemberUserTag: { type: SchemaTypes.String, required: false },    
}, { versionKey: false });

export const caseModel = model<CaseType>('case', schema);
