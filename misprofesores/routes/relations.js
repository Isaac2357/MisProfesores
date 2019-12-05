const express = require('express');
const router = express.Router();
const Relation = require('../models/Relation')
const User = require('../models/User')
const types = ["ADMIN", "PROF", "ALUMN"];

const {auth} = require("../middlewares/auth")
const fields = ["rid",
                "idProfesor",
                "idCurso",
                "periodo",
                "year"];



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

.post(auth, async (req, res) => {
    let type = req.tipo;
    if (type != undefined && type == "ADMIN") {
        let data = req.body;
        if (data != null && !isEmpty(data)) {
            if (!isValidRelation(data)) {
                res.status(406);
                res.statusMessage = "Invalid payload."
                res.send();
            } else {
                try {
                    let usr = await Relation.getRelationP(data.idProfesor);
                    let usr1 = await Relation.getRelationP(data.idCurso);

                    
                    console.log("rel",usr);
                    if (usr && usr1) {
                        res.status(406);
                        res.statusMessage = `Usuario con id: ${data.idProfesor} existe.`
                        res.send();
                    } else {
                        console.log("data",data);
                        let prof = await User.getUseruid(data.idProfesor);
                        console.log(prof);
                        if (prof==undefined || prof.tipo!="PROF") {
                            res.status(406);
                            res.statusMessage = `User type: ${prof.tipo} is invalid.`
                            res.send();
                        } else {
                            let doc = await Relation.createRelation(data);
                            if (doc) {
                                res.status(201);
                                res.statusMessage = "Relacion creada"
                                res.send();
                            } else {
                                res.statusCode = 400;
                                res.send();
                            }
                            
                        }
                    }
                } catch (error) {
                    console.log(error);
                    res.status(500);
                    res.statusMessage = "Internal server error";
                    res.send();
                }
            }   
        } else {
            res.status(406);
            res.statusMessage = "Empty payload."
            res.send();
        }

    } else {
        res.status(403);
        res.statusMessage = `User type: ${type} hasn't permissions to perform this action`;
        res.send();
    }

    } 
)

.delete(auth, async (req, res) => {
    res.send("relations delete");
})
.put(auth, async (req, res) => {
    res.send("relations put");
});

function isValidRelation(user) {
    if (user != null) {
        let validFields = 0;
        for (let key in user) {
            if (!fields.includes(key)) {
                return false;
            } else {
                validFields++;
            }
        }
        return validFields == fields.length
    }
    return false;
}
function isEmpty(payload) {
    for(let key in payload) {
        if(payload.hasOwnProperty(key))
            return false;
    }
    return true;  
}
module.exports = router;