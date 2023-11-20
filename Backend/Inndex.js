const express = require("express");
const cors = require("cors");
const app=express()
const port=3002
app.use(express.json());
const Appointment = require('./Appointment')
const Doctor = require('./Doctor')
const employee = require('./Employee')
const check = require('./Check')
// const Login = require('./Login')
app.use(cors());
app.use('/Appointment',Appointment)
app.use('/Doctor',Doctor)
app.use('/Employee',employee)
app.use('/ch',check)
// app.use('/Login',Login)
app.listen(port,()=>{
    console.log(`hello ${port}`)
})