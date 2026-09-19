import mongoose, { Document, Schema, Types } from 'mongoose';

export type ReviewStatus = 'pending' | 'approved' | 'rejected';

export interface IReview extends Document {
  userId: Types.ObjectId;
  tourId: Types.ObjectId;
  rating: number;
  comment: string;
  status: ReviewStatus;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tourId: {
      type: Schema.Types.ObjectId,
      ref: 'Tour',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'] as ReviewStatus[],
      default: 'pending',
    },
  },
  { timestamps: true }
);

ReviewSchema.index({ userId: 1, tourId: 1 }, { unique: true });

let Review: mongoose.Model<IReview>;

if (mongoose.models && mongoose.models.Review) {
  Review = mongoose.models.Review as mongoose.Model<IReview>;
} else {
  Review = mongoose.model<IReview>('Review', ReviewSchema);
}

export default Review;
