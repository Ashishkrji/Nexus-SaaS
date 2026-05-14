import { Schema, model, Document, Types } from 'mongoose';

export interface IGBPConnection extends Document {
  userId: Types.ObjectId;
  googleEmail: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
  connectionMethod: 'OAUTH' | 'FORM' | 'SERVICE_ACCOUNT';
  isActive: boolean;
  createdAt: Date;
}

const GBPConnectionSchema = new Schema<IGBPConnection>({
  userId:           { type: Schema.Types.ObjectId, ref: 'User', required: true },
  googleEmail:      { type: String, required: true },  // must match user.email
  accessToken:      { type: String, required: true },  // encrypted AES-256
  refreshToken:     { type: String, required: true },  // encrypted AES-256
  expiresAt:        { type: Date, required: true },
  connectionMethod: { type: String, enum: ['OAUTH', 'FORM', 'SERVICE_ACCOUNT'] },
  isActive:         { type: Boolean, default: true },
  createdAt:        { type: Date, default: Date.now }
});

export const GBPConnection = model<IGBPConnection>('GBPConnection', GBPConnectionSchema);
