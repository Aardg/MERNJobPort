const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Applicationschema = new Schema({
    applicantname: {
      type: String,
      required: true
    },

    jobname: {
        type: String,
        required: true  
    },

    applicantemail: {
      type: String,
      required: true
    },

    recruitername: {
        type: String,
        required: true
      },

    recruiteremail: {
        type: String,
        required: true
    },


    applicantlanguage: [{
        type: String,
    } 
    ],

    applicantinstitute: [{
        type: String,
    }
    ],

    applicantstartyear: [{
        type: Number,
        default: 0
    }],

    applicantendyear: [{
        type: Number,
        default: 0
    }],

    shortlisted: {
      type: Number,
      required: true,
      default: 0
    },

    maxno: {
        type: Number,
        required: true
    },

    accepted: { 
      type: Number,
      required: true,
      default: 0
      //0 for no, 1 for yes
    },

    
  });
  
module.exports = Application = mongoose.model("application", Applicationschema);