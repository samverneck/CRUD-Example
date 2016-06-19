const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchemaMolecule = {

    name: require('./../atoms/name')
  , email: require('./../atoms/email')

};

//console.log(new Schema(userSchemaMolecule));
module.exports = new Schema(userSchemaMolecule);
