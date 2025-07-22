import e from "express";
import { addComment, del1comment, get1comment, getAllComments, update1comment } from "../controllers/commentcontroller.js";
import authorize from "../middlewares/authorize.js";
const router = e.Router();

router.get("/", getAllComments);
router.get("/:id", get1comment);
router.post("/:postid", authorize(["admin","user"]) ,addComment);
router.put("/:id", update1comment);
router.delete("/:id", del1comment);

export default router;
// This code defines the routes for handling comments in an Express application.
// It imports the necessary modules and functions, sets up the router, and defines the routes for
// creating, reading, updating, and deleting comments.