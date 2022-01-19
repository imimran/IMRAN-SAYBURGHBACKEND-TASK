import mongoose, { Schema } from "mongoose";

//post model
const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "tags",
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("posts", PostSchema);

export default Post;
