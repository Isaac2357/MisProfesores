const express = require('express');
const router = express.Router();
const Professor = require('../models/Professor')
const {auth} = require("../middlewares/auth")


router.route('/')
.get(auth, async (req, res) => {
    res.send("professors get");
})
.post(auth, async (req, res) => {
    res.send("professors post");
});

router.route("/:id")
.delete(auth, async (req, res) => {
    res.send("professors delete");
})
.put(auth, async (req, res) => {
    res.send("professors put");
})
.get(auth, async (req, res) => {
    res.send("professors get");
});

module.exports = router;