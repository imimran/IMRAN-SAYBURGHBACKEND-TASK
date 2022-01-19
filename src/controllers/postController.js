import Post from "../models/post";
import { authUser } from "../middlewares/tokenAuth";
import Tag from "../models/tag";

//get all post
const getAllPost = async (req, res) => {
  const posts = await Post.find({})
    .populate("authorId", "name")
    .populate("tags", "name");
  return res.json(posts);
};

//create post
const addPost = async (req, res) => {
  const data = req.body;
  const tags = req.body.tags;
  const token = req.cookies["accessToken"];
  let auth_user = await authUser(token);
  console.log("auth_user", auth_user);
  console.log("data", data);

  let itemArr;
  itemArr = [];

  //assign tag or create new tag
  for (let i = 0; i < tags.length; i++) {
    let item = tags[i];
    console.log("item", item);

    const foundTag = await Tag.findOne({ name: item });
    if (!foundTag) {
      const newTagItem = new Tag({
        name: item,
      });
      const items = await newTagItem.save();

      itemArr.push(items._id);
    } else {
      itemArr.push(foundTag._id);
    }
  }

  console.log("arrs", itemArr);
// create post
  const newPost = new Post({
    title: data.title,
    description: data.description,
    authorId: auth_user._id,
    tags: itemArr,
  });

  const post = await newPost.save();

  return res.status(201).json(post);
};


//update post by author
const updatePost = async (req, res) => {
  const data = req.body;
  const tags = req.body.tags;
  const token = req.cookies["accessToken"];
  let auth_user = await authUser(token);
  console.log("auth_user", auth_user._id);
  const postId = req.params.postId;

  //find post
  const foundPost = await Post.findOne({ _id: postId });

  if (!foundPost) {
    return res.json({ msg: "No Post Found" });
  }

//find author
  const foundAuthorPost = await Post.findOne({ authorId: auth_user._id });

  if (!foundAuthorPost) {
    return res.json({ msg: "You do not have permission." });
  }

  let itemArr;
  itemArr = [];

   //create new tag or assign tag to post
  for (let i = 0; i < tags.length; i++) {
    let item = tags[i];
    console.log("item", item);

    const foundTag = await Tag.findOne({ name: item });
    if (!foundTag) {
      const newTagItem = new Tag({
        name: item,
      });
      const items = await newTagItem.save();

      itemArr.push(items._id);
    } else {
      itemArr.push(foundTag._id);
    }
  }

  console.log("arrs", itemArr);

  const query = foundPost._id;

  const updateData = {
    title: data.title,
    description: data.description,
    authorId: auth_user._id,
    tags: itemArr,
  };

  const options = { new: true, omitUndefined: true };
  const updatePost = await Post.findOneAndUpdate(query, updateData, options);
  return res.json({ msg: "Update Successfully" });
};


//delete post by author
const deletePost = async (req, res) => {
  const token = req.cookies["accessToken"];
  let auth_user = await authUser(token);
  console.log("auth_user", auth_user._id);
  const postId = req.params.postId;

  const foundPost = await Post.findOne({ _id: postId });
  if (!foundPost) {
    return res.json({ msg: "No Post Found" });
  }

//find author
  const foundAuthorPost = await Post.findOne({ authorId: auth_user._id });
  if (!foundAuthorPost) {
    return res.json({ msg: "You do not have permission." });
  }

  await Post.findByIdAndRemove({ _id: postId });
  return res.json({ msg: "Post Delete Successfuly" });
};

export default {
  getAllPost,
  addPost,
  updatePost,
  deletePost,
};
