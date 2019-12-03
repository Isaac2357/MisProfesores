const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment')
const {auth} = require("../middlewares/auth")


router.route('/')
.get(auth, async (req, res) => {
    res.send("comments get");
})
.post(auth, async (req, res) => {
    res.send("comments post");
});

router.route("/:id")
.delete(auth, async (req, res) => {
    res.send("comments delete");
})
.put(auth, async (req, res) => {
    res.send("comments put");
})
.get(auth, async (req, res) => {
    res.send("comments get");
});

module.exports = router;
