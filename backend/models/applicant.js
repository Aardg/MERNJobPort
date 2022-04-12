const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },

    language: [{
        type: String
    } 
    ],

    applied: {
      type: Number,
      required: true,
      default: 0
    },

    accepted: {
      type: Number,
      required: true,
      default: 0
      //0 for no, 1 for yes
    },

    institutename: [{
      type: String,
      default: "montfort"
    }],

    startyear: [{
      type: Number,
      default: 2020
    }],

    endyear: [{
      type: Number,
      default: 2021
    }]
  });
  
module.exports = User = mongoose.model("applicant", UserSchema);