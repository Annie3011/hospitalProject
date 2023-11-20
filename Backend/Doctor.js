const express = require('express');
const router =express.Router()
const client = require('./Connecction');
const { ObjectId } = require('mongodb');
router.get('/add',async(req,res)=>{
    const data = await client.db('Project-HM').collection('Doctorinfo').find({}).toArray();
    res.send(data)
});
router.post('/',async function(req,res){
    try {
        let doc ={
            name:req.body.name,
            age:req.body.age,
            email:req.body.email,
            causeofvisit:req.body.causeofvisit,
            BP:req.body.BP,
            temp:req.body.temp,
            height:req.body.height,
            weight:req.body.weight,
            bmi:req.body.bmi,
            scandetails:req.body.scandetails,
            days:req.body.days, 
            nextvisit:req.body.nextvisit,
            tabletname:req.body.tabletname
        }
        await client.db('Project-HM').collection('Doctorinfo').insertOne(doc);   
        res.send("Added")
    }
    catch(err){
        res.send("CantAdd")
    }
})
module.exports=router
