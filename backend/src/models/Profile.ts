import mongoose, { Document, Schema } from "mongoose";

export interface IProfile extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  title: string;
  email: string;
  phone?: string;
  location?: string;
  about: string;
  skills: string[];
  experience: {
    company: string;
    role: string;
    period: string;
    description: string;
  }[];
  education: {
    school: string;
    degree: string;
    period: string;
  }[];
  projects: {
    name: string;
    description: string;
    url?: string;
    tech: string[];
  }[];
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  resumeFileName?: string;
  resumeParsedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const profileSchema = new Schema<IProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    name: { type: String, default: "" },
    title: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String },
    location: { type: String },
    about: { type: String, default: "" },
    skills: [{ type: String }],
    experience: [
      {
        company: String,
        role: String,
        period: String,
        description: String,
      },
    ],
    education: [
      {
        school: String,
        degree: String,
        period: String,
      },
    ],
    projects: [
      {
        name: String,
        description: String,
        url: String,
        tech: [String],
      },
    ],
    socials: {
      github: String,
      linkedin: String,
      twitter: String,
      website: String,
    },
    resumeFileName: { type: String },
    resumeParsedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

export const Profile = mongoose.model<IProfile>("Profile", profileSchema);
