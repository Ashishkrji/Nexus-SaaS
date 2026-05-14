import { Schema, model, Document, Types } from 'mongoose';

export interface IProject extends Document {
  name: string;
  status: 'ACTIVE' | 'PAUSED' | 'ARCHIVED';
  environment: 'PRODUCTION' | 'STAGING' | 'DEVELOPMENT';
  deploys: number;
  branch: string;
  url?: string;
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>({
  name: { type: String, required: true },
  status: { type: String, enum: ['ACTIVE', 'PAUSED', 'ARCHIVED'], default: 'ACTIVE' },
  environment: { type: String, enum: ['PRODUCTION', 'STAGING', 'DEVELOPMENT'], default: 'DEVELOPMENT' },
  deploys: { type: Number, default: 0 },
  branch: { type: String, default: 'main' },
  url: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export const Project = model<IProject>('Project', ProjectSchema);
