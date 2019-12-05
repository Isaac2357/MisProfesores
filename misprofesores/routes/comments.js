const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const {auth} = require("../middlewares/auth");


router.route('/')
.get(auth, async (req, res) => {
    let relacion = req.query.idRelacion;
    let usuario = req.query.idUsuario;
    if (relacion != undefined) {
        try {
            let docs = await Comment.find({idRelacion: relacion}, { puntaje: 1, 
                                                                    comentario: "",
                                                                    likes: 1,
                                                                    dislikes: 1,
                                                                    idUsuario: 1,
                                                                    idRelacion: 1,
                                                                    comid: 1, 
                                                                    _id: 0 });
            if (docs) {
                res.send(docs);
            } else {
                res.status(406).send({error: "Error comments not found."});
            }
        } catch (error) {
            console.log(error);
            res.status(500).send();
        }
    } 
    else if (usuario != undefined) {
        try {
            let docs = await Comment.find({idUsuario: usuario}, { puntaje: 1, 
                                                                    comentario: "",
                                                                    likes: 1,
                                                                    dislikes: 1,
                                                                    idUsuario: 1,
                                                                    idRelacion: 1,
                                                                    comid: 1, 
                                                                    _id: 0 });
            if (docs) {
                res.send(docs);
            } else {
                res.status(406).send({error: "Error comments not found."});
            }
        } catch (error) {
            console.log(error);
            res.status(500).send();
        }
    }  
    try {
        let docs = await Comment.getComments();
        if (docs) {
            let mappedDocs = docs.map((comment) => formatComment(comment));
            res.send(mappedDocs);
        } else {
            res.status(500).send()
        }
    } catch (error) {
        console.log(error);
        res.status(400).send();
    }
})
/* .get(auth, async (req, res) => {
    let usuario = req.query.idUsuario;
    if (usuario != undefined) {
        try {
            let docs = await Relation.find({idUsuario: usuario}, { puntaje: 1, 
                                                                    comentario: "",
                                                                    likes: 1,
                                                                    dislikes: 1,
                                                                    idUsuario: 1,
                                                                    idRelacion: 1,
                                                                    comid: 1, 
                                                                    _id: 0 });
            if (docs) {
                res.send(docs);
            } else {
                res.status(406).send({error: "Error comments not found."});
            }
        } catch (error) {
            console.log(error);
            res.status(500).send();
        }
    }   
    try {

        let docs = await Comment.getComments();
        if (docs) {
            res.send(docs);
        } else {
            res.status(500).send()
        }
    } catch (error) {
        console.log(error);
        res.status(400).send();
    }
}) */

.post(auth, async (req, res) => { //NO LO SUPE HACER
    let data = req.body;
        if (data != undefined && !isEmpty(data)) {
            try {
                let post = await Comment.createComment(data);
                    console.log(post);
                    if (post) {
                        res.statusMessage = "Comment created."
                        res.status(201).send();
                    } else {
                        res.statusCode = 400;
                        res.send();
                    }
            } catch (error) {
                console.log(error);
                res.status(500);
                res.statusMessage = "Internal server error";
                res.send();
            }
        } else {
            res.statusMessage = `Empty payload`;
            res.status(406).send();
        }
});  

router.route("/:id")
.delete(auth, async (req, res) => {
    res.send("comments delete");
})
.put(auth, async (req, res) => {
    res.send("comments put");
})
/* .get(auth, async (req, res) => {
    res.send("comments get");
}); */


router.route('/:id')
.get(auth, async (req, res) => {
    let comid = req.params.id;
    console.log(parseInt(comid));
    if (isNaN(parseInt(comid))) {
        res.statusMessage = `Id must be numeric`;
        res.status(406).send();
        return;
    }
    try {
        let doc = await Comment.getComment(comid);
        console.log(doc);
        if (doc) {
            let comment = formatComment(doc);
            console.log(comment);
            res.send(comment);
        } else {
            res.statusMessage = `${comid} is an invalid comment id.`;
            res.status(406).send();
        }
    } catch (error) {
        console.log(error);
        res.status(400).send()
    }
});

function formatComment(comment) {
    let c = {};
    const fields = ["puntaje",
                    "comentario",
                    "likes",
                    "dislikes",
                    "idUsuario",
                    "idRelacion",
                    "comid"];
                    
    for (let key in comment) {
        if (fields.includes(key)) {
            c[key] = comment[key];
        }
    }
    return c;
}

function isEmpty(payload) {
    for(let key in payload) {
        if(payload.hasOwnProperty(key))
            return false;
    }
    return true;  
}

module.exports = router;
