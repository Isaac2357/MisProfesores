const {mongoose} = require('./mongodb-connect')
const Config = require ('./Config')

let commentSchema = mongoose.Schema({
    comid:{
        type: Number,
        required: true,
        unique: true
    },
    puntaje: {
        type:Number,
        required: true
    },
    comentario: {
        type: String,
        required: true,
    },  
    likes: {
        type: Number,
        required: true
    },
    dislikes: {
        type: Number,
        required: true
    },
    idUsuario: {
        type: Number,
        required: true
    },
    idRelacion: {
        type: Number,
        required: true
    }
});

commentSchema.statics.getComments = function() {
    return Comment.find({});
}

commentSchema.statics.getComment = function(comid){
    return Comment.findOne({comid}); 
}

commentSchema.statics.updateComment = function(comid, datos){
    return Comment.findOneAndUpdate(
                {comid},
                {$set:datos},
                {new: true}
                );
}

commentSchema.statics.createComment = async function(comm){
    let comid = await Config.getNextCommentId()
    comm.comid = comid;
    let newComm = Comment(comm);
    return newComm.save()
}

let Comment = mongoose.model('comments', commentSchema);

module.exports = Comment;
