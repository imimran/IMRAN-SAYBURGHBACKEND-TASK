import * as yup from "yup";

export const createCommentSchema = yup.object().shape({
  comment: yup.string().required("Comment is required"),
  postId: yup.string().required("PostId is required"),

});