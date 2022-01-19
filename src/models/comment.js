import mongoose, { Schema } from "mongoose";


//comment model
const CommentSchema = new Schema(
  {
    comment: {
      type: String,
      required: true,
    },

    postId: {
      type: Schema.Types.ObjectId,
      ref: "posts",
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("comments", CommentSchema);

export default Comment;
