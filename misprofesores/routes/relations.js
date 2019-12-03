const express = require('express');
const router = express.Router();
const Relation = require('../models/Relation')
const User = require('../models/User')
const {auth} = require("../middlewares/auth")


router.route('/')
.get(auth, async (req, res) => {
    let profesor = req.query.idProfesor;
    if (profesor != undefined) {
        try {
            let docs = await Relation.find({idProfesor: profesor}, { idProfesor: 1, 
                                                                    idCurso: 1,
                                                                    periodo: 1,
                                                                    year: 1,
                                                                    rid: 1, 
                                                                    _id: 0 });
            if (docs) {
                res.send(docs);
            } else {
                res.status(406).send({error: "Error relations not found."});
            }
        } catch (error) {
            console.log(error);
            res.status(500).send();
        }
    }   
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