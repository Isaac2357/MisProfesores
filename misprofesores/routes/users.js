const express = require('express');
const router = express.Router();
const User = require('../models/User')
const {auth} = require("../middlewares/auth")
const fields = ["nombre", "correo", "password", "tipo"];
const updateFields = ["nombre", "password", "tipo"];
const updateFieldsProfile = ["nombre", "imagen"];
const types = ["ADMIN", "PROF", "ALUMN"];

router.route('/')
.get( auth, async (req, res) => {
    let id = req.query.uid;
    if (id != undefined) {
        try {
            let docs = await User.find({uid: id}, { favProfesores: 1, 
                                                    favCursos: "",
                                                    idRelacion: 1,
                                                    nombre: 1,
                                                    correo: 1,
                                                    password: 1,
                                                    tipo: 1,
                                                    uid: 1, 
                                                    _id: 0 });
            if (docs) {
                res.send(docs);
            } else {
                res.status(406).send({error: "Error user not found."});
            }
        } catch (error) {
            console.log(error);
            res.status(500).send();
        }
    } 

    try {
        let usrs = await User.getUsers();
        if (usrs != null) {
            res.send(usrs);
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
                            data.imagen = "https://pngimage.net/wp-content/uploads/2018/05/default-user-profile-image-png-2.png" //default img
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

router.route('/:email/updateprofile')
.put(auth, async (req, res) =>{
    let correo = req.params.email;
        if (correo != undefined) {
            try {
                let usr = await User.getUser(correo);
                if (usr != null) {
                    let data = req.body;
                    if (data != null && !isEmpty(data)) {
                        if (isValidUpdateProfile(data)) {
                            let doc = await User.updateUser(correo, data);
                            if (doc) {
                                res.status(200).send({status: "User profile updated."})
                            } else {
                                res.status(500).send();
                            }
                        } else {
                            res.status(406);
                            res.statusMessage = "Invalid payload."
                            res.send({error: "Invalid payload."});
                        }
                    } else {
                        res.status(406);
                        res.statusMessage = "Empty payload."
                        res.send({error: "Empty payload."});
                    }
                } else {
                    res.status(406);
                    res.statusMessage = "User doesn't exist in the database.";
                    res.send({error: "User doesn't exist in the database."});
                }
            } catch (error) {
                console.log(error);
                res.status(500);
                res.statusMessage = "Internal server error";
                res.send({error: "Internal server error"});
            }
        } else {
            res.status(406);
            res.statusMessage = "Missing params."
            res.send({error: "Missing params."});
        }
});

router.route('/alumn/:email/favcourses')
.post(async (req, res) => {
    res.send(`${req.params.email} post favs courses`);
});

router.route('/alumn/:email/favprof')
.post(async (req, res) =>{
    res.send(`${req.params.email} post favs prof`);
    //validar id
    /// validar tipo usuario
});

router.route('/:id')
.get(auth, async (req, res) =>{
    let id = req.params.id;
    try {
        let doc = await    User.findOne({uid: id});
        console.log(doc);
        if (doc) {
            res.send(doc);
        } else {
            res.status(500).send({error: "Someting went wrong fetching the user."})
        }
    } catch (error) {
        console.log(error);
        res.status(500).send();
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

function isValidUpdateProfile(user) {
    if (user != null) {
        for (let key in user) {
            if (!updateFieldsProfile.includes(key)) {
                return false;
            }
        }
        return true
    }
    return false;
}

function formatUser(user) {
    let c = {};
    const fields = ["favProfesores",
                    "favCursos",
                    "idRelacion",
                    "nombre",
                    "correo",
                    "password",
                    "tipo",
                    "imagen",
                    "uid"];
                    
    for (let key in user) {
        if (fields.includes(key)) {
            c[key] = user[key];
        }
    }
    return c;
}

module.exports = router