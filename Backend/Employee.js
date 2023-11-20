const express = require('express');
const router =express.Router()
const client = require('./Connecction');
const { ObjectId } = require('mongodb');
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser');

// const { ObjectId } = require("mongodb");
router.use(bodyParser.json());
router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

router.get('/E',async(req,res)=>{
    const data = await client.db('Project-HM').collection('Employee details').find({}).toArray();
    res.send(data)
});
router.get('/:hmid',async(req,res)=>{
    const {hmid}=req.params;
    const data = await client.db('Project-HM').collection('Employee details').find({hmid}).toArray();
    res.send(data)
});
router.post('/emp',async function(req,res){
    try {
        const count = await client.db('Project-HM').collection('Employee details').find({}).toArray();
        let emp ={
            hmid:`HM${count.length+1}`,
            name:req.body.name,
            DOB:req.body.DOB,
            email:req.body.email,
            mobile:req.body.mobile,
            bloodgroup:req.body.bloodgroup,
            employeerole:req.body.employeerole,
            gender:req.body.gender,
            adress:req.body.adress,
            password:"admin123"  
        }
        await client.db('Project-HM').collection('Employee details').insertOne(emp);   
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
          html: `<h1>Welcome ${emp.name}</h1>,
        <h1>your role ${emp.employeerole}</h1>
        <h1>This is from Med Care hospital</h1>,<h1>This is your Employer id:<span style="color:red">${emp.hmid}</span><br></br></h1>
        <h1>your password <span style="color:red">${emp.password}</span></h1>
        <p>Dont Share your password </p>`,
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
    catch(err){
        res.send("CantAdd")
    }
})
router.put("/edit/:hmid", async (req, res) => {
  const { hmid } = req.params;

  try {
    const data = await client
      .db("Project-HM")
      .collection("Employee details")
      .updateOne(
        { hmid: hmid },
        // { $set: { obj } }
        {
          $set: {
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            mobile: req.body.mobile,
          },
        }
      );

    res.send(data);
    console.log("updated");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
router.post("/leave", async (req, res) => {
    try {
      let obj = {
        name: req.body.name,
        hmid: req.body.hmid,
        reson: req.body.reson,
        fromdate: req.body.fromdate,
        todate: req.body.todate,
      };
  
      await client.db("Project-HM").collection("Leave").insertOne(obj);
      res.send("data posted");
    } catch (error) {
      console.log(error);
      res.send("post err");
    }
  });
module.exports=router
