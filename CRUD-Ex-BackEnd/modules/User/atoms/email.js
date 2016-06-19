'use strict';

// module.exports = {
//   type: String
// //, get: require('./../quarks/toUpper-quark')
// //, set: require('./../quarks/toLower-quark')
// //, validator: require('./../quarks/isEmail-quark')
// , validate: require('./../hadrons/emailValidateMongoose')
// , required: true
// //, index: true
// };


const AtomName = 'Email';

module.exports = {
  type: String
, validate: require('./../hadrons/ValidateMongoose')('is' + AtomName)
, required: true
}
