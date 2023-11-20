const express = require('express');
const router =express.Router()
const client = require('./Connecction');
// const { ObjectId } = require('mongodb');
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
router.get('/',async(req,res)=>{
    const data = await client.db('Project-HM').collection('Appointment').find({}).toArray();
    res.send(data)
});
router.get('/:empid',async(req,res)=>{
    const {empid}=req.params;
    const data = await client.db('Project-HM').collection('Appointment').find({empid}).toArray();
    res.send(data)
});
router.post('/appoitment',async function(req,res){
    try {
        const count = await client.db('Project-HM').collection('Appointment').find({}).toArray();
        let newUser ={
            empid:`HM${count.length+1}`, 
            name:req.body.name,
            age:req.body.age,
            email:req.body.email,
            causeofvisit:req.body.causeofvisit,
            date:req.body.date,
            time:req.body.time
        };
        if(
            await client
            .db("Project-HM")
            .collection("Appointment")
            .findOne({email:req.body.email})
        ){
            res.send("already user")
        }
        else{
            await client
            .db("Project-HM")
            .collection("Appointment")
            .insertOne(newUser)
        
        res.send("Added")
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "annieganeshraj@gmail.com",
              pass: "dawz itoi dbjf acsq",
            },
          });
          const mailOptions = {
            from: "annieganeshraj@gmail.com",
            to: req.body.email,
            subject: "Med care hospital",
            html: `<h1>Hello ${newUser.name}</h1>,<h1>This is from Health Care hospital</h1>,<h1>This is your appointment id:<span style="color:red">${newUser.empid} <p>Your appointment have been successfully booked</p></span>.</h1>`,
          };
    
          transporter.sendMail(mailOptions, (emailErr) => {
            if (emailErr) {
              // res.send("Error sending email");
              console.log("error", emailErr);
            } else {
              res.status(200).send("Email sent successfully");
            }
          });
    }
    }
    catch(error){
        res.send(error)   
        console.log(error)
    }
})
module.exports=router
