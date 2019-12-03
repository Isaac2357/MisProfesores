const {mongoose} = require('./mongodb-connect')
const Config = require ('./Config')

let professorSchema = mongoose.Schema({
    pid:{
        type: Number,
        required: true,
        unique: true
    },
    nombre: {
        type:String,
        required:true
    },
    departamento: {
        type: String,
        required: true,
        enum: ["DESI"]
    }
});

professorSchema.statics.getProfessors = function() {
    return Professor.find({});
}

professorSchema.statics.getProfessor = function(pid){
    return Professor.findOne({pid}); 
}

professorSchema.statics.updateProfessor = function(pid, datos){
    return Professor.findOneAndUpdate(
                {pid},
                {$set:datos},
                {new: true}
                );
}

professorSchema.statics.createProfessor = async function(prof){
    let pid = await Config.getNextProfessorId(prof)
    prof.pid = pid;
    let newProf = Professor(prof);
    return newProf.save()
}

let Professor = mongoose.model('professors', professorSchema);

module.exports = Professor;
