import mongoose, { type Document, Schema } from "mongoose";

export interface IItem extends Document {
  title: string;
  category: "Personal Items" | "Documents" | "Electronics" | "Accessories";
  locationFound: string;
  description?: string;
  isResolved: boolean;
  ownerId: mongoose.Types.ObjectId;
}

const itemSchema = new Schema<IItem>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 120,
    },
    category: {
      type: String,
      enum: ["Personal Items", "Documents", "Electronics", "Accessories"],
      required: true,
    },
    locationFound: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 160,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    isResolved: {
      type: Boolean,
      default: false,
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Item = mongoose.model<IItem>("Item", itemSchema);
