const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

//Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//Load User model
const User = require("../../models/User");
const Applicant = require("../../models/applicant");
const Recruiter = require("../../models/recruiter");
const Offer = require("../../models/offer");
const Application = require("../../models/application");


// @route POST api/users/register
// @desc Register user
// @access Public

router.post("/register", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);// Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
    console.log(req.body);
    User.findOne({ email: req.body.email })
    .then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    }
    else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isRecruiter: req.body.isRecruiter
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });

      if (req.body.isRecruiter === "applicant" || req.body.isRecruiter == "Applicant") {
        const newApplicant = new Applicant({
          name: req.body.name,
          email: req.body.email,
          language: [], 
          applied: 0,
          accepted: 0
        });
        newApplicant
          .save()
          .then()
      }
      else {
        const newRecruiter = new Recruiter({
          name: req.body.name,
          email: req.body.email
        });
        newRecruiter
          .save()
          .then()
      }
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public


router.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  
  const email = req.body.email;
  const password = req.body.password;
  
  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }// Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
          role: user.isRecruiter,
          email: user.email
        };
        
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

router.post("/showallOffers", async(req,res) => {
  Offer.find((err,offers) => {
    // console.log(err);
    if (err) {
      console.log(err);
    }
    else {
      res.json(offers);
    } 
  })
});

router.post("/getdata", async(req,res) => {
  Applicant.findOne({email: req.body.email}, (err,user) => {
    if(err){
      console.log(err)
    }
    else {
      res.json(user)
    }
  })
})

router.post("/completeProfile", (req,res) => {
  Applicant.findOne({email: req.body.email}).then(user => {
     newApplicant = new Applicant(user)
     console.log("backend se hun");
     req.body.institutename.map((data,ind) => (newApplicant.institutename.push(data)));
     req.body.startyear.map((data,ind) => (newApplicant.startyear.push(data)));
     req.body.endyear.map((data,ind) => (newApplicant.endyear.push(data))); 
     req.body.language.map((data,ind) => (newApplicant.language.push(data))); 
     const id = newApplicant._id
     Applicant.findByIdAndUpdate(id, newApplicant, {new: true}, function(err, newApplicant){
      if(err)
      {
        console.log(err,"ererereref");
        res.status(400).send(err);
      }
      else {
        console.log("ho gaya"); 
        res.send(newApplicant);
        Applicant.findOne({email: req.body.email}).then(user => {
          newApplicant=user;
        });
        console.log(newApplicant)
      }
    })
     
  });
  Application.find({applicantemail: req.body.email}, (err,applications) => {
    req.body.institutename.map((data,ind) => (applications.map((application, index) => application.applicantinstitute.push(data))));
    req.body.startyear.map((data,ind) => (applications.map((application, index) => application.applicantstartyear.push(data))));
    req.body.endyear.map((data,ind) => (applications.map((application, index) => application.applicantendyear.push(data))));
    req.body.language.map((data,ind) => (applications.map((application, index) => application.applicantlanguage.push(data))));
    applications.map((application, index) =>application.save())
  })
})

router.post("/apply", (req,res) =>{
  console.log("api mein jaa rha hai");
  console.log(req.body);

  Application.findOne({recruiteremail: req.body.recruiteremail, applicantemail: req.body.applicantemail, jobname: req.body.jobname})
     .then(application => {
       if(application){
         console.log("kitni bar karoge")
         return res.status(400).json({ email: "Already Applied" });
       }
       else {
         const newapplication = new Application({
           jobname: req.body.jobname,
           applicantname: req.body.applicantname,
           applicantemail: req.body.applicantemail,
           recruitername: req.body.recruitername,
           recruiteremail: req.body.recruiteremail,
           applicantlanguage: req.body.applicantlanguage,
           applicantinstitute: req.body.applicantinstitute,
           applicantstartyear: req.body.applicantstartyear,
           applicantendyear: req.body.applicantendyear,
           maxno: req.body.maxno, 
           shortlisted: 0,
           accepted: 0
         });
         newapplication.save()
           .then()
           .catch()
       }
     })
});

router.post("/showmyapplications", (req,res) => {
  Application.find({applicantemail: req.body.email}, (err,applications) => {
    // console.log(err);
    if (err) {
      console.log(err);
    }
    else {
      res.json(applications);
    } 
  })

});



module.exports = router;