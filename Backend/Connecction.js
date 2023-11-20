const {MongoClient}= require('mongodb');
const url = "mongodb://localhost:27017";
let client={}
try{
    client= new MongoClient(url,{useNewUrlParser:true, useUnifiedTopology:true});
    console.log('Database Connected');
}
catch(err){
    console.log(err)
    console.log("Error in connection")
}
module.exports=client;