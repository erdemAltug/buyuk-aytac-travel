import mongoose, { Document, Schema } from 'mongoose';

export interface IPollOption {
  optionId: string;
  label: string;
  description?: string;
  image?: string;
  votes: number;
}

export interface ITourPoll extends Document {
  title: string;
  subtitle?: string;
  isActive: boolean;
  options: IPollOption[];
  endsAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const PollOptionSchema = new Schema<IPollOption>(
  {
    optionId: { type: String, required: true },
    label: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    votes: { type: Number, default: 0 },
  },
  { _id: false }
);

const TourPollSchema = new Schema<ITourPoll>(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    isActive: { type: Boolean, default: true },
    options: { type: [PollOptionSchema], required: true },
    endsAt: { type: Date },
  },
  { timestamps: true }
);

const TourPollVoteSchema = new Schema(
  {
    pollId: { type: Schema.Types.ObjectId, ref: 'TourPoll', required: true },
    voterKey: { type: String, required: true },
    optionId: { type: String, required: true },
  },
  { timestamps: true }
);

TourPollVoteSchema.index({ pollId: 1, voterKey: 1 }, { unique: true });

let TourPoll: mongoose.Model<ITourPoll>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let TourPollVote: mongoose.Model<any>;

if (mongoose.models?.TourPoll) {
  TourPoll = mongoose.models.TourPoll as mongoose.Model<ITourPoll>;
} else {
  TourPoll = mongoose.model<ITourPoll>('TourPoll', TourPollSchema);
}

if (mongoose.models?.TourPollVote) {
  TourPollVote = mongoose.models.TourPollVote;
} else {
  TourPollVote = mongoose.model('TourPollVote', TourPollVoteSchema);
}

export { TourPollVote };
export default TourPoll;
