import { Schema, model, Document, Types } from 'mongoose';

export interface IDomain extends Document {
  name: string;
  status: 'HEALTHY' | 'WARNING' | 'ERROR';
  sslStatus: 'VALID' | 'EXPIRING' | 'EXPIRED';
  dnsStatus: 'VERIFIED' | 'UNVERIFIED';
  provider: string;
  userId: Types.ObjectId;
}

const DomainSchema = new Schema<IDomain>({
  name: { type: String, required: true },
  status: { type: String, enum: ['HEALTHY', 'WARNING', 'ERROR'], default: 'HEALTHY' },
  sslStatus: { type: String, enum: ['VALID', 'EXPIRING', 'EXPIRED'], default: 'VALID' },
  dnsStatus: { type: String, enum: ['VERIFIED', 'UNVERIFIED'], default: 'UNVERIFIED' },
  provider: { type: String, default: 'Cloudflare' },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export const Domain = model<IDomain>('Domain', DomainSchema);
