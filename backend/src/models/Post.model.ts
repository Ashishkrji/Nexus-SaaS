import { Schema, model, Document, Types } from 'mongoose';

export interface IPost extends Document {
  locationId: Types.ObjectId;
  userId: Types.ObjectId;
  type: 'WHATS_NEW' | 'OFFER' | 'EVENT' | 'PRODUCT';
  title?: string;
  body: string;
  imageUrl?: string;
  ctaType?: string;
  ctaUrl?: string;
  scheduledAt?: Date;
  publishedAt?: Date;
  status: 'DRAFT' | 'SCHEDULED' | 'PUBLISHED' | 'FAILED';
  aiGenerated: boolean;
  failReason?: string;
}

const PostSchema = new Schema<IPost>({
  locationId:   { type: Schema.Types.ObjectId, ref: 'GBPLocation' },
  userId:       { type: Schema.Types.ObjectId, ref: 'User' },
  type:         { type: String, enum: ['WHATS_NEW', 'OFFER', 'EVENT', 'PRODUCT'] },
  title:        { type: String },
  body:         { type: String, required: true },
  imageUrl:     { type: String },               // local path /uploads/...
  ctaType:      { type: String },
  ctaUrl:       { type: String },
  scheduledAt:  { type: Date },
  publishedAt:  { type: Date },
  status:       { type: String, enum: ['DRAFT', 'SCHEDULED', 'PUBLISHED', 'FAILED'], default: 'DRAFT' },
  aiGenerated:  { type: Boolean, default: false },
  failReason:   { type: String }
});

export const Post = model<IPost>('Post', PostSchema);
