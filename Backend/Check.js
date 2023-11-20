const express = require("express");
const router = express.Router();
const client = require("./Connecction");
// const { ObjectId } = require("mongodb");

router.get("/check", async (req, res) => {
  const data = await client
    .db("Project-HM")
    .collection("checktime")
    .find({})
    .toArray();

  res.send(data);
  console.log("data show");
});
router.post("/checkpost/:hmid", async (req, res) => {
  const { hmid } = req.params;
  let obj = {
    empid: hmid,
    // checkintime: req.body.checkintime,
    checkindate: req.body.checkindate,
    // checkouttime: req.body.checkouttime,
    // checkoutdate: req.body.checkoutdate,
    hour: req.body.hour,
  };

  try {
    const data = await client
      .db("Project-HM")
      .collection("checktime")
      .insertOne(obj);

    res.send(data);
    console.log("updated");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router;
