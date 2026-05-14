import { Schema, model, Document, Types } from 'mongoose';

export interface IGBPLocation extends Document {
  connectionId: Types.ObjectId;
  userId: Types.ObjectId;
  googleLocationId: string;
  businessName: string;
  address?: string;
  phone?: string;
  website?: string;
  categories: string[];
  description?: string;
  isVerified: boolean;
  profileScore: number;
  lastSyncedAt?: Date;
  createdAt: Date;
}

const GBPLocationSchema = new Schema<IGBPLocation>({
  connectionId:     { type: Schema.Types.ObjectId, ref: 'GBPConnection' },
  userId:           { type: Schema.Types.ObjectId, ref: 'User' },
  googleLocationId: { type: String, required: true },
  businessName:     { type: String, required: true },
  address:          { type: String },
  phone:            { type: String },
  website:          { type: String },
  categories:       [{ type: String }],
  description:      { type: String },
  isVerified:       { type: Boolean, default: false },
  profileScore:     { type: Number, default: 0 },   // 0-100 AI audit score
  lastSyncedAt:     { type: Date },
  createdAt:        { type: Date, default: Date.now }
});

export const GBPLocation = model<IGBPLocation>('GBPLocation', GBPLocationSchema);
