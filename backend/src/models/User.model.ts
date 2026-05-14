import { Schema, model, Document, Types } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password?: string;
  name?: string;
  avatar?: string;
  plan: 'FREE' | 'PRO' | 'BUSINESS' | 'AGENCY';
  role: 'USER' | 'ADMIN';
  tenantId: string;
  emailVerified: boolean;
  verifyToken?: string;
  resetToken?: string;
  apiRequestsThisMonth: number;
  lastUsageReset: Date;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  email:         { type: String, required: true, unique: true },
  password:      { type: String },           // hashed, null if Google login
  name:          { type: String },
  avatar:        { type: String },           // local path
  plan:          { type: String, enum: ['FREE', 'PRO', 'BUSINESS', 'AGENCY'], default: 'FREE' },
  role:          { type: String, enum: ['USER', 'ADMIN'], default: 'USER' },
  tenantId:      { type: String, required: true },
  emailVerified: { type: Boolean, default: false },
  verifyToken:   { type: String },
  resetToken:    { type: String },
  apiRequestsThisMonth: { type: Number, default: 0 },
  lastUsageReset:       { type: Date, default: Date.now },
  createdAt:     { type: Date, default: Date.now }
});

export const User = model<IUser>('User', UserSchema);
