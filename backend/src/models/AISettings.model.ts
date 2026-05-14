import { Schema, model, Document, Types } from 'mongoose';

export interface IAISettings extends Document {
  userId: Types.ObjectId;
  defaultProvider: string;
  preferredModel: string;
  customKeys: {
    openai?: string;
    anthropic?: string;
    gemini?: string;
    grok?: string;
  };
  autoReply: boolean;
  replyTone: 'professional' | 'friendly' | 'formal';
  language: string;
}

const AISettingsSchema = new Schema<IAISettings>({
  userId:           { type: Schema.Types.ObjectId, ref: 'User', unique: true },
  defaultProvider:  { type: String, default: 'nvidia' },
  preferredModel:   { type: String, default: '' },
  customKeys: {
    openai:     { type: String },   // encrypted
    anthropic:  { type: String },   // encrypted
    gemini:     { type: String },   // encrypted
    grok:       { type: String }    // encrypted
  },
  autoReply:    { type: Boolean, default: false },
  replyTone:    { type: String, enum: ['professional', 'friendly', 'formal'], default: 'professional' },
  language:     { type: String, default: 'en' }
});

export const AISettings = model<IAISettings>('AISettings', AISettingsSchema);
