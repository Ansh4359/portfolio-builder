import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  firebaseUid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  tier: "free" | "pro";
  tierUpdatedAt?: Date;
  portfoliosLimit: number;
  deploymentsLimit: number;
  emailPreferences: {
    milestones: boolean;
    marketing: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    firebaseUid: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      default: "",
    },
    photoURL: {
      type: String,
    },
    tier: {
      type: String,
      enum: ["free", "pro"],
      default: "free",
    },
    tierUpdatedAt: {
      type: Date,
    },
    portfoliosLimit: {
      type: Number,
      default: 10,
    },
    deploymentsLimit: {
      type: Number,
      default: 3,
    },
    emailPreferences: {
      milestones: { type: Boolean, default: true },
      marketing: { type: Boolean, default: true },
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<IUser>("User", userSchema);
