import Comment from "../models/comment.js";
import Post from "../models/post.js";
import User from "../models/user.js"; 

const addComment = async (req, res) => {
  try {
    const { comment } = req.body;
    let { postid } = req.params;

    if (!postid) {
      return res.status(400).json({ message: "Post ID is required" });
    }

    if (!comment) {
      return res.status(400).json({ message: "Comment cannot be empty" });
    }

    let checkPost = await Post.findById(postid);
    let checkUser = await User.findById(req.user.id);

    if(!checkPost) return res.status(404).json({message:"Post not found"})

    const newComment = await Comment.create({
      comment,
      post: checkPost._id,
      author: req.user.id, // Assuming req.user is set by authentication middleware
    });

    checkPost.comments.push(newComment._id);
    await checkPost.save();

    checkUser.comments.push(newComment._id);
    await checkUser.save();

    res.status(201).json({message:"Comment added successfully"});

  } catch (error) {
    res.status(500).json({ message: "Error creating comment", error });
    console.log(error)
  }
};

const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments", error });
  }
};

const get1comment = async (req, res) => {
  const { id } = req.params;

  try {
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comment", error });
  }
};

const update1comment = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;

  if (!comment) {
    return res.status(400).json({ message: "Comment cannot be empty" });
  }

  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { comment },
      { new: true }
    );
    if (!updatedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: "Error updating comment", error });
  }
};

const del1comment = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedComment = await Comment.findByIdAndDelete(id);
    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: "Error deleting comment", error });
  }
};

export { addComment, getAllComments, get1comment, update1comment, del1comment };
// This code defines a set of functions to handle CRUD operations for comments in a MongoDB database using Mongoose.
// The functions include adding a comment, retrieving all comments, retrieving a single comment by ID,
// updating a comment by ID, and deleting a comment by ID.
