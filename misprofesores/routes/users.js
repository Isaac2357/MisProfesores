const express = require('express');
const router = express.Router();
const User = require('../models/User')
const {auth} = require("../middlewares/auth")
const fields = ["nombre", "correo", "password", "tipo"];
const updateFields = ["nombre", "password", "tipo"];
const types = ["ADMIN", "PROF", "ALUMN"];

router.route('/')
.get( auth, async (req, res) => {
    try {
        let usrs = await User.getUsers();
        if (usrs != null) {
            let mappedUsrs = usrs.map((user) => {
                let usr = {};
                const fields = ["favProfesores",
                                "favCursos",
                                "idRelacion",
                                "nombre",
                                "correo",
                                "password",
                                "tipo",
                                "uid"];
                                
                for (let key in user) {
                    if (fields.includes(key)) {
                        usr[key] = user[key];
                    }
                }
                return usr;
            });
            res.send(mappedUsrs);
        } else {
            res.status(400);
            res.statusMessage = "Internal error."
            res.send();
        }
    } catch (error) {
        res.status(400);
        res.statusMessage = "Internal error."
        res.send();
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
                    let usr = await User.getUser(data.correo);
                    if (usr != null) {
                        res.status(406);
                        res.statusMessage = `User with email: ${data.correo} already exists in the database.`
                        res.send();
                    } else {
                        if (!types.includes(data.tipo)) {
                            res.status(406);
                            res.statusMessage = `User type: ${data.tipo} is invalid.`
                            res.send();
                        } else {
                            data.favProfesores = [];
                            data.favCursos = [];
                            data.idRelacion = [];
                            let doc = await User.createUser(data);
                            if (doc) {
                                res.status(201);
                                res.statusMessage = "User created"
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
});

router.route('/:email')
.delete(auth, async (req, res) => {
    let type = req.tipo;
    if (type != null && type == "ADMIN") {
        let correo = req.params.email;
            if (correo != undefined) {
                try {
                    let usr = await User.getUser(correo);
                    if (usr != null) {
                        let doc = await User.findOneAndDelete({correo});
                        if (doc) {
                            res.statusMessage = "User deleted.";
                            res.send();
                        } else {
                            res.status(406);
                            res.statusMessage = "Semething went wrong, user not deleted.";
                            res.send();
                        }
                    } else {
                        res.status(406);
                        res.statusMessage = "User doesn't exist in the database.";
                        res.send();
                    }
                } catch (error) {
                    console.log(error);
                    res.status(500);
                    res.statusMessage = "Internal server error";
                    res.send();
                }
            } else {
                res.status(406);
                res.statusMessage = "Missing params."
                res.send();
            }
    } else {
        res.status(403);
        res.statusMessage = `User type: ${type} hasn't permissions to perform this action`;
        res.send();
    }
})
.put(auth, async (req, res) => {
    let type = req.tipo;
    if (type != null && type == "ADMIN") {
        let correo = req.params.email;
            if (correo != undefined) {
                try {
                    let usr = await User.getUser(correo);
                    if (usr != null) {
                        let data = req.body;
                        if (data != null && !isEmpty(data)) {
                            if (isValidUpdate(data)) {
                                if (data.tipo != undefined && !types.includes(data.tipo)) {
                                    res.status(406);
                                    res.statusMessage = `User type: ${data.tipo} is invalid.`
                                    res.send();
                                } else {
                                    let doc = await User.updateUser(correo, data);
                                    if (doc) {
                                        res.status(200).send()
                                    } else {
                                        res.status(500).send();
                                    }
                                }
                            } else {
                                res.status(406);
                                res.statusMessage = "Invalid payload."
                                res.send();
                            }
                        } else {
                            res.status(406);
                            res.statusMessage = "Empty payload."
                            res.send();
                        }
                    } else {
                        res.status(406);
                        res.statusMessage = "User doesn't exist in the database.";
                        res.send();
                    }
                } catch (error) {
                    console.log(error);
                    res.status(500);
                    res.statusMessage = "Internal server error";
                    res.send();
                }
            } else {
                res.status(406);
                res.statusMessage = "Missing params."
                res.send();
            }
    } else {
        res.status(403);
        res.statusMessage = `User type: ${type} hasn't permissions to perform this action`;
        res.send();
    }
})
.get(auth, async (req, res) => {
    let correo = req.params.email;
        if (correo != undefined) {
            try {
                let usr = await User.getUser(correo);
                if (usr != null) {
                    res.send(usr);
                } else {
                    res.status(406);
                    res.statusMessage = "User doesn't exist in the database.";
                    res.send();
                }
            } catch (error) {
                console.log(error);
                res.status(500);
                res.statusMessage = "Internal server error";
                res.send();
            }
        } else {
            res.status(406);
            res.statusMessage = "Missing params."
            res.send();
        }
});

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

function isValidUpdate(user) {
    if (user != null) {
        for (let key in user) {
            if (!updateFields.includes(key)) {
                return false;
            }
        }
        return true
    }
    return false;
}

module.exports = router