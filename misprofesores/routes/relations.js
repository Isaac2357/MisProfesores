const express = require('express');
const router = express.Router();
const Relation = require('../models/Relation')
const User = require('../models/User')
const {auth} = require("../middlewares/auth")


router.route('/')
.get(auth, async (req, res) => {
    try {
        let docs = await Relation.getRelations();
        if (docs) {
            res.send(docs);
        } else {
            res.status(500).send()
        }
    } catch (error) {
        console.log(error);
        res.status(400).send();
    }
})
.post(   async (req, res) => {
    let profId = 2;
    let courseId = 27;

    let doc = await User.findOne({uid: profId, tipo: "PROF"});
    console.log(doc);
    res.send("relations post");
})
.delete(auth, async (req, res) => {
    res.send("relations delete");
})
.put(auth, async (req, res) => {
    res.send("relations put");
});

module.exports = router;