import mongoose, { Document, Schema, Types } from 'mongoose';

export type UserRole = 'user' | 'admin';

export interface IUser extends Document {
  email: string;
  passwordHash?: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: UserRole;
  isActive: boolean;
  emailVerified: boolean;
  wishlist: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: false,
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
      trim: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'] as UserRole[],
      default: 'user',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    wishlist: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tour',
      },
    ],
  },
  { timestamps: true }
);

let User: mongoose.Model<IUser>;

if (mongoose.models && mongoose.models.User) {
  User = mongoose.models.User as mongoose.Model<IUser>;
} else {
  User = mongoose.model<IUser>('User', UserSchema);
}

export default User;
