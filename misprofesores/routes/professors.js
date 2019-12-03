const express = require('express');
const router = express.Router();
const User = require('../models/User')
const {auth} = require("../middlewares/auth")


router.route('/')
.get(auth, async (req, res) =>{
    try {
        let docs = await    User.find({tipo: "PROF"});
        console.log(docs);
        if (docs) {
            res.send(docs);
        } else {
            res.status(500).send({error: "Someting went wrong fetching the professors."});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
});

router.route('/:id')
.get(async (req, res) =>{

});

module.exports = router;