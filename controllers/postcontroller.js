import Post from "../models/post.js"; 
import bcrypt from "bcryptjs";

const createPost = async (req, res) => {
  try {
    const { title, snippet, content } = req.body;

    if (!title || !snippet || !content || !req.file) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const image = {
      url: req.file.path,
      filename: req.file.filename
    };

    const newPost = await Post.create({
      title,
      snippet,
      content,
      image,
      author: req.user.id
    });

    res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating post", error });
  }
};

const getAllPosts = async (req, res) => {
    const myPosts = await Post.find().populate({
        path: "comments",
        select: "comment"
    }).populate({
        path: "author",
        select: "fullname email"
    });

    if (!myPosts) {
        return res.status(404).json({ message: "No posts found" });
    }
    res.status(200).json(myPosts);
}

const get1post = async (req,res)=>{
    let {id} = req.params;

    const onePost = await Post.findById(id).populate({
      path:"author",
      select:"fullname email"
    })

    if (!onePost) return res.status(404).json ({message:"No post found"});

    res.status(200).send(onePost)
}

 const del1post = async (req,res) => {
    let {id} = req.params;

    const deletedPost = await Post.findByIdAndDelete(id);

    if(!deletedPost) return res.status(404).json({message:"No post found"});

    res.status(200).json({message: "Post deleted successfuly"})
 }

 const update1post = async (req,res) => {
    let {id} = req.params;
    let newData = req.body;

    const updatedPost = await Post.findByIdAndUpdate(id, newData, {new: true});

    if(!updatedPost) return res.status(404).json({message:"No post found"});

    res.status(200).json({message: "Post updated successfuly", updatedPost});
 }

export{
  getAllPosts,
  get1post,
  del1post,
  update1post,
  createPost
}