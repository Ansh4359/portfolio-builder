import mongoose, { Document, Schema } from "mongoose";

export interface IPortfolio extends Document {
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
  templateId: string;
  subdomain?: string;
  deploymentUrl?: string;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const portfolioSchema = new Schema<IPortfolio>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    location: {
      type: String,
    },
    about: {
      type: String,
      default: "",
    },
    skills: [
      {
        type: String,
      },
    ],
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
    templateId: {
      type: String,
      required: true,
    },
    subdomain: {
      type: String,
    },
    deploymentUrl: {
      type: String,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Portfolio = mongoose.model<IPortfolio>(
  "Portfolio",
  portfolioSchema
);
