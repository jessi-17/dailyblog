const express = require("express");

const router = express.Router();

const {isAuthenticated} = require("../authentication/auth")
const {createPostrouter,createPost,readingpage,deletePost, editPost, editPostContent} = require("../controllers/PostController")


router.get("/createPost",isAuthenticated,createPostrouter)

router.post("/createPost",isAuthenticated,createPost)

router.get("/readpost",readingpage)
// delete user
router.get('/delete',isAuthenticated,deletePost)

// edit usser
router.get("/edit",isAuthenticated,editPost)

router.post("/edit",isAuthenticated,editPostContent)


module.exports = router