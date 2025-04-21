const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema({
  firstName: String,
  middleName: String,
  lastName: String,
  phone: String,
  email: String,
  education: String,
  college: String,
  address: String
});

module.exports = mongoose.model('Admission', admissionSchema);
