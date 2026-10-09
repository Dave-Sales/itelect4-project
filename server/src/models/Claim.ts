import mongoose, { type Document, Schema } from "mongoose";

export interface IClaim extends Document {
  itemId: mongoose.Types.ObjectId;
  claimedByUserId: mongoose.Types.ObjectId;
  notes?: string;
  claimedAt: Date;
}

const claimSchema = new Schema<IClaim>(
  {
    itemId: {
      type: Schema.Types.ObjectId,
      ref: "Item",
      required: true,
      index: true,
    },
    claimedByUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    claimedAt: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Claim = mongoose.model<IClaim>("Claim", claimSchema);
