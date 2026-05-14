import { Schema, model, Document } from 'mongoose';

export interface IScheduledJob extends Document {
  type: string;
  payload: any;
  runAt: Date;
  status: 'PENDING' | 'RUNNING' | 'DONE' | 'FAILED';
  attempts: number;
  error?: string;
  createdAt: Date;
}

const ScheduledJobSchema = new Schema<IScheduledJob>({
  type:         { type: String, required: true }, // 'POST_PUBLISH' | 'REVIEW_REPLY' | 'PROFILE_SYNC'
  payload:      { type: Schema.Types.Mixed },      // job data
  runAt:        { type: Date, required: true },
  status:       { type: String, enum: ['PENDING', 'RUNNING', 'DONE', 'FAILED'], default: 'PENDING' },
  attempts:     { type: Number, default: 0 },
  error:        { type: String },
  createdAt:    { type: Date, default: Date.now }
});

export const ScheduledJob = model<IScheduledJob>('ScheduledJob', ScheduledJobSchema);
