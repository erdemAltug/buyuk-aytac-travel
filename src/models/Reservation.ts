import mongoose, { Document, Schema, Types } from 'mongoose';

export type ReservationStatus =
  | 'new'
  | 'contacted'
  | 'confirmed'
  | 'cancelled'
  | 'completed';

export type ReservationSource = 'web' | 'whatsapp' | 'phone' | 'admin';

export interface IReservation extends Document {
  userId?: Types.ObjectId;
  tourId?: Types.ObjectId;
  tourSlug: string;
  tourName: string;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  adultCount: number;
  childCount: number;
  status: ReservationStatus;
  notes?: string;
  source: ReservationSource;
  createdAt: Date;
  updatedAt: Date;
}

const ReservationSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    tourId: {
      type: Schema.Types.ObjectId,
      ref: 'Tour',
    },
    tourSlug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    tourName: {
      type: String,
      required: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    adultCount: {
      type: Number,
      default: 1,
      min: 0,
    },
    childCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'confirmed', 'cancelled', 'completed'] as ReservationStatus[],
      default: 'new',
    },
    notes: {
      type: String,
      trim: true,
    },
    source: {
      type: String,
      enum: ['web', 'whatsapp', 'phone', 'admin'] as ReservationSource[],
      default: 'web',
    },
  },
  { timestamps: true }
);

let Reservation: mongoose.Model<IReservation>;

if (mongoose.models && mongoose.models.Reservation) {
  Reservation = mongoose.models.Reservation as mongoose.Model<IReservation>;
} else {
  Reservation = mongoose.model<IReservation>('Reservation', ReservationSchema);
}

export default Reservation;
