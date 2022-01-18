import mongoose, { Schema } from "mongoose";


const TagSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Tag = mongoose.model("tags", TagSchema);

export default Tag;