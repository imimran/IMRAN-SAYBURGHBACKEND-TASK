import Comment from "../models/comment";
import logger from "../logger";
import { authUser } from "../middlewares/tokenAuth";
import Post from "../models/post";


//create coment by auth user
const addComment = async (req, res) => {
  const data = req.body;
  const token = req.cookies["accessToken"];
  let auth_user = await authUser(token);
  console.log("auth_user", auth_user);
  console.log("data", data);

  //find post
  const foundPost = await Post.findOne({ _id: data.postId })
  if(!foundPost){
      return res.json({ msg: "No Post Found"})
  }
//new comment create
  const newComment = new Comment({
    comment: data.comment,
    postId: data.postId,
    authorId: auth_user._id,
  });

  const comment = await newComment.save();

  return res.status(201).json(comment);
};

export default {
  addComment,
};
