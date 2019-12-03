const express = require('express');
const router = express.Router();
const Relation = require('../models/Relation')
const User = require('../models/User')
const types = ["ADMIN", "PROF", "ALUMN"];

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
.post(auth, async (req, res) => {
    let type = req.tipo;
    if (type != undefined && type == "ADMIN") {
        let data = req.body;
        if (data != null && !isEmpty(data)) {
            if (!isValidUser(data)) {
                res.status(406);
                res.statusMessage = "Invalid payload."
                res.send();
            } else {
                try {
                    let usr = await Relation.getRelation(data.idProfesor);
                    if (usr != null) {
                        res.status(406);
                        res.statusMessage = `User with id: ${data.idProfesor} already exists in the database.`
                        res.send();
                    } {

                            let doc = await Relation.createRelation(data);
                            if (doc) {
                                res.status(201);
                                res.statusMessage = "Relacion Creada"
                                res.send();
                            } else {
                                res.statusCode = 400;
                                res.send();
                            }
                            
                        }
                    }
                 catch (error) {
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

    } 
})

.delete(auth, async (req, res) => {
    res.send("relations delete");
})
.put(auth, async (req, res) => {
    res.send("relations put");
});

function formatRelation(relacion) {
    let c = {};
    const fields = ["rid",
                    "idProfesor",
                    "idCurso",
                    "periodo",
                    "year"];
                    
    for (let key in relacion) {
        if (fields.includes(key)) {
            c[key] = relacion[key];
        }
    }
    return c;
}
function isValidUser(user) {
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