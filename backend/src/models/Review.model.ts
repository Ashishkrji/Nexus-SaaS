import { Schema, model, Document, Types } from 'mongoose';

export interface IReview extends Document {
  locationId: Types.ObjectId;
  googleId: string;
  authorName?: string;
  authorPhoto?: string;
  rating: number;
  comment?: string;
  sentiment?: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';
  sentimentScore?: number;
  replyText?: string;
  replyStatus: 'PENDING' | 'APPROVED' | 'POSTED';
  repliedAt?: Date;
  postedAt?: Date;
  isUrgent: boolean;
}

const ReviewSchema = new Schema<IReview>({
  locationId:   { type: Schema.Types.ObjectId, ref: 'GBPLocation' },
  googleId:     { type: String, unique: true },
  authorName:   { type: String },
  authorPhoto:  { type: String },
  rating:       { type: Number, min: 1, max: 5 },
  comment:      { type: String },
  sentiment:    { type: String, enum: ['POSITIVE', 'NEUTRAL', 'NEGATIVE'] },
  sentimentScore: { type: Number },             // 0-1 confidence
  replyText:    { type: String },
  replyStatus:  { type: String, enum: ['PENDING', 'APPROVED', 'POSTED'], default: 'PENDING' },
  repliedAt:    { type: Date },
  postedAt:     { type: Date },
  isUrgent:     { type: Boolean, default: false }  // negative + no reply
});

export const Review = model<IReview>('Review', ReviewSchema);
