const {mongoose} = require('./mongodb-connect')
const Config = require ('./Config')

let userSchema = mongoose.Schema({
    uid:{
        type: Number,
        required: true,
        unique: true
    },
    nombre: {
        type:String,
        required:true
    },
    correo: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    tipo:{
        type: String,
        required: true,
        enum: ["ADMIN", "PROF", "ALUMN"]
    },
    imagen:{
        type: String,
        required: true
    },
    favProfesores:[{
        type: Number,
        required: true
    }],
    favCursos:[{
        type: Number,
        required: true
    }],
    idRelacion:[{
        type: Number,
        required: true
    }]
});

userSchema.statics.getUsers = function() {
    return User.find({}, {favProfesores: 1,
                            favCursos: 1,
                            idRelacion: 1,
                            nombre: 1,
                            correo: 1,
                            password: 1,
                            tipo: 1,
                            imagen: 1,
                            uid: 1,
                            _id: 0});
}

userSchema.statics.getUser = function(correo){
    return User.findOne({correo}, {favProfesores: 1,
                                    favCursos: 1,
                                    idRelacion: 1,
                                    nombre: 1,
                                    correo: 1,
                                    password: 1,
                                    tipo: 1,
                                    uid: 1,
                                    imagen: 1,
                                    _id: 0}); 
    return User.find({});
}

userSchema.statics.getUser = function(correo){
    return User.findOne({correo}); 

}
userSchema.statics.getUseruid = function(uid){
    return User.findOne({uid}); 
}

userSchema.statics.createUser = async function(usr){
    let uid = await Config.getNextUserId();
    console.log("create usr", uid);
    usr.uid = uid;
    let newUser = User(usr);
    return newUser.save()
}

userSchema.statics.updateUser = function(correo, datos){
    return User.findOneAndUpdate(
                {correo},
                {$set:datos},
                {new: true}
                );
}

let User = mongoose.model('users', userSchema);

module.exports = User;
