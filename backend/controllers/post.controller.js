import sharp from "sharp";
import cloudinary from "../utils/cloudinarySetup.js";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { Comment } from "../models/comment.model.js";

export const createPost = async (req, res) => {
  try {
    const { caption } = req.body;
    const image = req.file;
    const authorId = req.id;
    if (!image) {
      return res.status(404).json({
        message: "Image is required",
        success: false,
      });
    }
    // image upload
    const optimizedImageBuffer = await sharp(image.buffer)
      .resize({ width: 800, height: 800, fit: "inside" })
      .toFormat("jpeg", { quality: 80 })
      .toBuffer();
    // buffer to datauri
    const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString(
      "base64"
    )}`;
    const cloudResponse = await cloudinary.uploader.upload(fileUri);
    const post = await Post.create({
      caption,
      image: cloudResponse.secure_url,
      author: authorId,
    });
    const user = await User.findById(authorId);
    if (user) {
      user.posts.push(post._id);
      await user.save();
    }
    await post.populate({ path: "author", select: "-password" });
    return res.status(200).json({
      message: "Post created successfully",
      success: true,
      post,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllPosts = async (_, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({ path: "author", select: "username,profilePicture" })
      .populate({
        path: "comments",
        sort: { createdAt: -1 },
        populate: {
          path: "author",
          select: "username, profilePicture",
        },
      });
    return res.status(200).json({
      posts,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUserPost = async (req, res) => {
  try {
    const authorId = req.id;
    const posts = await Post.find({ author: authorId })
      .sort({ createdAt: -1 })
      .populate({ path: "author", select: "username,profilePicture" })
      .populate({
        path: "comments",
        sort: { createdAt: -1 },
        populate: {
          path: "author",
          select: "username,profilePicture",
        },
      });

    return res.status(200).json({
      posts,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = async (req, res) => {
  try {
    const likeKrneWalaUser = req.id;
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ message: "Post not found", success: false });
    }
    // like logic
    await post.updateOne({ $addToSet: { likes: likeKrneWalaUser } });
    await post.save();

    // Implement socket io for real time notifications

    return res.status(200).json({
      message: "Post liked",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const dislikePost = async (req, res) => {
  try {
    const likeKrneWalaUser = req.id;
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
        success: false,
      });
    }
    // dislike logic
    await post.updateOne({ $pull: { likes: likeKrneWalaUser } });
    await post.save();

    // implement socket io for real time notifications

    return res.status(200).json({
      message: "Post disliked",
      super: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const commentKarneWaleUserKiId = req.id;
    const { text } = req.body;
    if (!text) {
      return res.status(404).json({
        message: "Text is required",
        success: false,
      });
    }
    const post = await Post.findById(postId);
    const comment = await Comment.create({
      text,
      author: commentKarneWaleUserKiId,
      post: postId,
    }).populate({
      path: "author",
      select: "username,profilePicture",
    });
    post.Comments.push(comment._id);
    await post.save();

    return res.status(200).json({
      message: "Comment created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getComments = async (req, res) => {
  try {
    const postId = req.params.id;
    const comments = await Comment.find({ post: postId }).populate(
      "author",
      "username,profilePicture"
    );
    if (!comments) {
      return res.status(404).json({
        message: "No comments found for this Post",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    console.log(error);
  }
};
