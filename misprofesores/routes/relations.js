const express = require('express');
const router = express.Router();
const Relation = require('../models/Relation')
const {auth} = require("../middlewares/auth")


router.route('/')
.get(auth, async (req, res) => {
    res.send("relations get");
})
.post(auth, async (req, res) => {
    res.send("relations post");
})
.delete(auth, async (req, res) => {
    res.send("relations delete");
})
.put(auth, async (req, res) => {
    res.send("relations put");
});

module.exports = router;