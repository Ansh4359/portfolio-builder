import mongoose, { Document, Schema } from "mongoose";

export interface IAITemplate extends Document {
  userId: mongoose.Types.ObjectId;
  prompt: string;
  name: string;
  html: string;
  createdAt: Date;
}

const aiTemplateSchema = new Schema<IAITemplate>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    prompt: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    html: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const AITemplate = mongoose.model<IAITemplate>(
  "AITemplate",
  aiTemplateSchema
);
