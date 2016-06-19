'use strict';

// module.exports = {
//   type: String
// //, get: require('./../quarks/toUpper-quark')
// //, set: require('./../quarks/toLower-quark')
// //, validate: require('./../quarks/validate-string-lengthGTE3-quark')
// , validate: require('./../hadrons/nameValidateMongoose')
// , required: true
// //, index: true
// };


const AtomName = 'Name';

module.exports = {
  type: String
, validate: require('./../hadrons/ValidateMongoose')('is' + AtomName)
, required: true
}
