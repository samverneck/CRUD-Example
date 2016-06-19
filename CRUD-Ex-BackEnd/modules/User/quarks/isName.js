'use strict';

module.exports = (value) => {
  const isEmpty = require('./isEmpty')(value);
  const isString = require('./isString')(value);
  const isNameLength = require('./isNameLength')(value);

  // if(isEmpty) return false;
  // if(!isString) return false;
  // if(!isNameLength) return false;

  if(isEmpty || !isString || !isNameLength) return false;

  return true;


}
