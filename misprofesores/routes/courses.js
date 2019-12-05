const express = require('express');
const router = express.Router();
const Course = require('../models/Course')
const {auth} = require("../middlewares/auth")
const fields = ["nombre", "departamento", "creditos"];
const updateFields = ["nombre", "departamento", "creditos"];
const departments = ["DESI", "DEL", "DFH", "EAM", "MAF", "PTI", "PES", "HDU"];
const credits = ["4", "6", "8", "16"];

router.route('/')
.get(auth, async (req, res) => {
    try {
        let qpage = req.query.page;
        let qlimit = req.query.limit || 4; // solo si page está especificado
        console.log("qpage", qpage);
        if (qpage != undefined) {
            let page = await Course.find({}, {
                _id: 0,
                couid: 1,
                nombre: 1,
                departamento: 1,
                creditos: 1,
                estatus: 1
            })
            .skip(qpage*qlimit)
            .limit(qlimit)
            res.send(page);
            return;
        }
        let docs = await Course.getCourses();
        if (docs) {
            let mappedDocs = docs.map((course) => formatCourse(course));
            res.send(mappedDocs);
        } else {
            res.status(500).send({error: "Internal server error"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({error: "Internal server error"});
    }
})
.post(auth, async (req, res) => {
    let type = req.tipo;
    if (type == "ADMIN") {
        let data = req.body;
        if (data != undefined && !isEmpty(data)) {
            if (isValidCourse(data)) {
                if (departments.includes(data.departamento)) {
                    if (credits.includes(data.creditos)) {
                        try {
                            let doc = await Course.findOne({nombre: data.nombre});
                            if (doc) {
                                res.statusMessage = `${data.nombre} already exits in the database.`;
                                res.status(406).send({error: `${data.nombre} already exits in the database.`});
                            } else {
                                let post = await Course.createCourse(data);
                                console.log(post);
                                if (post) {
                                    res.statusMessage = "Course created."
                                    res.status(201).send({status: "Course created"});
                                } else {
                                    res.statusCode = 400;
                                    res.send({error: "Database error"});
                                }
                            }
                        } catch (error) {
                            console.log(error);
                            res.status(500);
                            res.statusMessage = "Internal server error";
                            res.send({error: "Internal server error."});
                        }
                    } else {
                        res.statusMessage = `${data.creditos} is an invalid number of credits.`;
                        res.status(406).send({error: `${data.creditos} is an invalid number of credits.`});
                    }
                } else {
                    res.statusMessage = `${data.departamento} is an invalid deparment.`;
                    res.status(406).send({error: `${data.departamento} is an invalid deparment.`});
                }
            } else {
                res.statusMessage = `Invalid payload`;
                res.status(406).send({error: `Invalid payload`});
            }
            
        } else {
            res.statusMessage = `Empty payload`;
            res.status(406).send({error: `Empty payload`});
        }
    } else {  
        res.statusMessage = `User type: ${type} hasn't permissions to perform this action`;
        res.status(403).send({error: `User type: ${type} hasn't permissions to perform this action`});
    }
})  

router.route('/:id')
.delete(auth, async (req, res) => {
    let couid = req.params.id;
    let type = req.tipo;
    if (isNaN(parseInt(couid))) {
        res.statusMessage = `Id must be numeric`;
        res.status(406).send();
        return;
    }
    if (type == "ADMIN") {
        try {
            let course = await Course.findOne({couid});
            if (course) {
                let doc = await Course.findOneAndUpdate({couid}, {estatus: !course.estatus});
                if (doc) {
                    res.statusMessage = "Course estatus updated.";
                    res.send({status: "Course estatus updated."});
                } else {
                    res.status(406);
                    res.statusMessage = "Semething went wrong, estatus not updated.";
                    res.send({error: `Semething went wrong, estatus not updated.`});
                }
            } else {
                res.statusMessage = `${couid} is an invalid course id.`;
                res.status(406).send({error: `${couid} is an invalid course id.`});
            }
        } catch (error) {
            console.log(error);
            res.status(500);
            res.statusMessage = "Internal server error";
            res.send({error: "Internal server error"});
        }
    } else {
        res.statusMessage = `User type: ${type} hasn't permissions to perform this action`;
        res.status(403).send({error: `User type: ${type} hasn't permissions to perform this action`});  
    }

})
.put(auth, async (req, res) => {
    let couid = req.params.id;
    let type = req.tipo;
    if (isNaN(parseInt(couid))) {
        res.statusMessage = `Id must be numeric`;
        res.status(406).send();
        return;
    }
    if (type == "ADMIN") {
        try {
            let course = await Course.findOne({couid});
            if (course) {
                let data = req.body;
                if (data != null && !isEmpty(data)) {
                    if (isValidUpdate(data)) {
                        if(data.nombre != undefined) {
                            let cur = await Course.findOne({nombre: data.nombre})
                            if (cur != null) {
                                let intV = parseInt(course.couid);
                                let intV2 = parseInt(cur.couid);
                                if ((intV-intV2) != 0) {
                                    res.status(406);
                                    res.statusMessage = `${data.nombre} course is already in the database.`
                                    res.send();
                                    return;
                                }
                            }
                        }
                        if (data.departamento != undefined && !departments.includes(data.departamento)) {
                            res.status(406);
                            res.statusMessage = `Department type: ${data.departamento} is invalid.`
                            res.send({error: `Department type: ${data.departamento} is invalid.`});
                        } else if (data.creditos != undefined && !credits.includes(data.creditos)){
                            res.status(406);
                            res.statusMessage = `${data.creditos} is an invalid number of credits.`
                            res.send({error: `${data.creditos} is an invalid number of credits.`});
                        } else {
                            let doc = await Course.updateCourse(couid, data);
                            if (doc) {
                                res.statusMessage = "Course updated"
                                res.status(200).send({status: "Course updated"})
                            } else {
                                res.status(500).send({error: "Internal server error."});
                            }
                        }
                    } else {
                        res.status(406);
                        res.statusMessage = "Invalid payload."
                        res.send({error: "Invalid payload."});
                    }
                } else {
                    res.status(406);
                    res.statusMessage = "Empty payload."
                    res.send({error: "Emmpty payload"});
                }
            } else {
                res.statusMessage = `${couid} is an invalid course id.`;
                res.status(406).send({error: `${couid} is an invalid course id.`});
            }
        } catch (error) {
            console.log(error);
            res.status(500);
            res.statusMessage = "Internal server error";
            res.send({error: "Internal server error"});
        }
    } else {
        res.statusMessage = `User type: ${type} hasn't permissions to perform this action`;
        res.status(403).send({error: `User type: ${type} hasn't permissions to perform this action`});  
    }

})
.get(auth, async (req, res) => {
    let couid = req.params.id;
    console.log(parseInt(couid));
    if (isNaN(parseInt(couid))) {
        res.statusMessage = `Id must be numeric`;
        res.status(406).send();
        return;
    }
    try {
        let doc = await Course.getCourse(couid);
        console.log(doc);
        if (doc) {
            let course = formatCourse(doc);
            console.log(course);
            res.send(course);
        } else {
            res.statusMessage = `${couid} is an invalid course id.`;
            res.status(406).send(`${couid} is an invalid course id.`);
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({error: "Internal server error"});
    }
});

function formatCourse(course) {
    let c = {};
    const fields = ["couid",
                    "nombre",
                    "departamento",
                    "creditos"];
                    
    for (let key in course) {
        if (fields.includes(key)) {
            c[key] = course[key];
        }
    }
    return c;
}

function isValidCourse(course) {
    if (course != null) {
        let validFields = 0;
        for (let key in course) {
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

function isValidUpdate(course) {
    if (course != null) {
        for (let key in course) {
            if (!updateFields.includes(key)) {
                return false;
            }
        }
        return true
    }
    return false;
}

module.exports = router;