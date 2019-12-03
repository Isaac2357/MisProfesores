let mongoose = require('mongoose');
let config = require('./config.json');

let mongodb = `mongodb+srv://${config.dbuser}:${config.dbpsw}@cluster0-joqix.mongodb.net/${config.dbname}?retryWrites=true&w=majority`;
mongoose.connect(mongodb, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Connected to database");
}).catch((err)=>{
    console.log("Not connected to database", err);
});

module.exports = {mongoose}