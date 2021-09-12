const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

router.get("/", async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ["id", "username"],
                },
            ],
            order: [["createdAt", "DESC"]],
        });

        const posts = postData.map((post) => post.get({ plain: true }));
        //package it so that the 1st is along
        const packagedPosts = [];
        let currentPackage = [];
        for (let i = 0; i < posts.length; i++) {
            if (i == 0) {
                currentPackage.push(posts[i]);
                packagedPosts.push(currentPackage);
                currentPackage = [];
            } else {
                currentPackage.push(posts[i]);
            }
            //if i is odd or if 1 or less left
            if (i % 2 == 0 || posts.length - i <= 1) {
                if (currentPackage.length != 0) {
                    packagedPosts.push(currentPackage);
                }
                currentPackage = [];
            }
        }
        console.log(packagedPosts);
        res.render("index", {
            loggedIn: req.session.loggedIn,
            loggedInUserData: req.session.loggedInUserData,
            posts: packagedPosts,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
