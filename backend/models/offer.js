const mongoose = require("mongoose");
const { stringify } = require("qs");
const Schema = mongoose.Schema;

const OfferSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    creatorEmail: {
      type: String,
      required: true
    },

    creatorName: {
      type: String,
      required: true
    },
    
    duration: {
        type: Number,
        required: true,
        default: 0
    },
    maxno: {
        type: Number,
        required: true,
    },

    tags: [{
      type: String
    }
    ],

    type: {
      type: String,
      required: true
    },

    accepted: {
        type: Number,
        required: true,
        default: 0
    },

    salary: {
      type: Number,
      required: true
    },

    validtill: {
      type: Date,
      required: true
    }
    
  });
  
module.exports = offer = mongoose.model("offers", OfferSchema);