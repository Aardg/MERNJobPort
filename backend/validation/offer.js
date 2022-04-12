const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateOfferInput(data) {
  let errors = {};
  
  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.creatorEmail = !isEmpty(data.creatorEmail) ? data.creatorEmail : "";
  data.duration = !isEmpty(data.duration) ? data.duration : "";
  data.maxno = !isEmpty(data.maxno) ? data.maxno : "";
  data.accepted = !isEmpty(data.accepted) ? data.accepted : "";
  data.validtill = !isEmpty(data.validtill) ? data.validtill : "";
  data.salary = !isEmpty(data.salary) ? data.salary : "";
  
  // Email checks
  if (Validator.isEmpty(data.creatorEmail)) {
    errors.email = "Email field is required";
  }
  else if (!Validator.isEmail(data.creatorEmail)) {
    errors.email = "Email is invalid";
  }
  
  //name check
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(data.creatorName)) {
    errors.name = "Creator name field is required";
  }

  //duration check
  if (Validator.isEmpty(data.duration)) {
    errors.duration = "duration field is required";
  }
  else if (data.duration <= 0 || data.duration > 6){
      errors.duration = "duration can only be between 0-6 months"
  }

  //acceptedcehck
  if (Validator.isEmpty(data.accepted)) {
    errors.accepted = "enter the candidates already accepted";
  }
  
  //maxno check
  if (Validator.isEmpty(data.maxno)) {
    errors.maxno = "This field is required";
  }

  //date check
  if (Validator.isEmpty(data.validtill)) {
    errors.validtill = "This field is required"
  }
  else if (data.validtill < Date.now()) {
    errors.validtill = "Invalid deadline"

  }

  //salary check
  if (Validator.isEmpty(data.salary)) {
    errors.duration = "Salary field is required";
  }
  else if (data.salary <= 0 ){
      errors.salary = "duration can only be between 0-6 months"
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
};