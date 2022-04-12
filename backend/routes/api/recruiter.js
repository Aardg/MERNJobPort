const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");


// job offer validation
const validateOfferInput = require("../../validation/offer");

//Load Offer model

const Applicant = require("../../models/applicant");
const Recruiter = require("../../models/recruiter");
const Offer = require("../../models/offer");
const Application = require("../../models/application");



// @route POST api/users/register
// @desc Register user
// @access Public

router.post("/addJob", (req, res) => {
  const { errors, isValid } = validateOfferInput(req.body);// Check validation
  if (!isValid) { 
    console.log(errors);  
    return res.status(400).json(errors);
  }
  console.log(req.body);
  Offer.findOne({creatorEmail: req.body.creatorEmail, name: req.body.name}).then(offer => {
    if (offer) {
      return res.status(400).json({ name: "Job with same title already posted" });
    }
    else {
      const newOffer = new Offer({
        name: req.body.name,
        creatorEmail: req.body.creatorEmail,
        creatorName: req.body.creatorName,
        duration: req.body.duration,
        maxno: req.body.maxno,
        accepted: req.body.accepted,
        type: req.body.type,
        validtill: req.body.validtill,
        salary: req.body.salary,
        tags: req.body.tags
      });
      newOffer
        .save()
        .then(offer => res.json(offer))
        .catch(err => console.log(err))
    }
  });
});

router.post("/showmyOffers", async(req,res) => {
  Offer.find({"creatorEmail" : req.body.email}, (err,offers) => {
    // console.log(err);
    if (err) {
      console.log(err);
    }
    else {
      res.json(offers);
    } 
  })
});

router.post("/deleteOffer", (req,res) =>{
  var id = req.body.id;
  console.log("ye to id hai")
  console.log(req.body)
  console.log(id);
  Offer.findByIdAndDelete(id, function (err){
    if(err){
      console.log(err)
    }
    else {
      console.log("delete ho gaya")
    }
  });
});

router.post("/showreceived", (req,res) => {
  Application.find({recruiteremail: req.body.email}, (err,applications) => {
    // console.log(err);
    if (err) {
      console.log(err);
    }
    else {
      console.log(applications)
      res.json(applications);
    } 
  })

});

router.post("/accept", (req,res) => {
  console.log("ye api mein aaya ", req.body)
  Application.findOne({recruiteremail: req.body.recruiteremail,
     applicantemail: req.body.applicantemail,
      jobname: req.body.jobname}, (err, application) => {
        if (err) {
          console.log(err);
        }
        else {
          application.accepted=1;
          application.maxno=application.maxno;
          console.log("backend mein")
          application.save();
        }
      })
  Offer.findOne({name: req.body.jobname, creatorEmail: req.body.recruiteremail}, (err, offer) => {
    offer.accepted=offer.accepted+1;
    offer.save();
  })
  Applicant.findOne({email: req.body.applicantemail}, (err,applicant) => {
    applicant.accepted=1;
    applicant.save();
  })
})

router.post("/shortlist", (req,res) => {
  console.log("ye api mein aaya ", req.body)
  Application.findOne({recruiteremail: req.body.recruiteremail,
     applicantemail: req.body.applicantemail,
      jobname: req.body.jobname}, (err, application) => {
        if (err) {
          console.log(err);
        }
        else {
          application.shortlisted=1;
          console.log("backend mein")
          application.save();
        }
      })
})

router.post("/reject", (req,res) => {
  console.log("ye api mein aaya ", req.body)
  Application.findOne({recruiteremail: req.body.recruiteremail,
     applicantemail: req.body.applicantemail,
      jobname: req.body.jobname}, (err, application) => {
        if (err) {
          console.log(err);
        }
        else {
          application.accepted=-1;
          console.log("backend mein")
          application.save();
        }
      })
})


module.exports = router;