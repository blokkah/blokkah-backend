//This Class Takes

 
//checkAccess(userId, Action, Resource) => return TRUE OR FALSE

const AccessControl = require('accesscontrol');
const PermissionService = require("./permission.service.js");
const ApiError = require("../utils/errors/ApiError.js");
const httpStatus = require('http-status');
const { check } = require('prisma');
checkAccess = async (role, action, resource,own,fields) => {
  //if role is array change the logic!
const ac = new AccessControl(PermissionService.getPermissionMatrix());

let query = ac.can(role);
let permission
if (own) {
 query = query[`${action}Own`](resource);
} else {
query = query[`${action}Any`](resource);
}

if (!query.granted) {
    throw new ApiError(httpStatus.UNAUTHORIZED,"You Are Not Authroized To Access This" );
}

if (!isFieldAllowed(query.attributes, fields)) {
    throw new ApiError(httpStatus.UNAUTHORIZED,"You Are Not Authroized To Access This" );
}
return true;
}


function isFieldAllowed(attributes, fields) {
    if (attributes.includes('*')) {
      // If * is present, start with all fields allowed
      // Check for excluded fields
      for (const field of fields) {
        if (attributes.includes(`!${field}`)) {
          return false;
        }
      }
      return true;
    } else {
      // If * is not present, check inclusion of each field
      for (const field of fields) {
        if (attributes.includes(`!${field}`)) {
          return false;
        }
        if (!attributes.includes(field)) {
          return false;
        }
      }
      return true;
    }
  }
  

// loadPermissions();

module.exports = {
  checkAccess
}