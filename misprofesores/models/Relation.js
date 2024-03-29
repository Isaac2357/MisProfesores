const {mongoose} = require('./mongodb-connect')
const Config = require ('./Config')

let relationsSchema = mongoose.Schema({
    rid:{
        type: Number,
        required: true,
        unique: true
    },
    idProfesor: {
        type:Number,
        required: true
    },
    idCurso: {
        type: Number,
        required: true
    },  
    periodo: {
        type: String,
        required: true,
        enum: ["P", "O", "V"]
    },
    year: {
        type: Number,
        required: true
    }
});

relationsSchema.statics.getRelations = function() {
    return Relation.find({},  { idProfesor: 1, 
                                idCurso: 1,
                                periodo: 1,
                                year: 1,
                                rid: 1, 
                                _id: 0 });
}

relationsSchema.statics.getRelation = async function(rid){
    return await Relation.findOne({rid}); 
}
relationsSchema.statics.getRelationP =  function(idProfesor){
    return  Relation.findOne({idProfesor}); 
}

relationsSchema.statics.updateRelation = function(rid, datos){
    return Relation.findOneAndUpdate(
                {rid},
                {$set:datos},
                {new: true}
                );
}

relationsSchema.statics.createRelation = async function(rel){
    let rid = await Config.getNextRelationId()
    rel.rid = rid;
    let newRel = Relation(rel);
    return newRel.save()
}

let Relation = mongoose.model('relations', relationsSchema);

module.exports = Relation;