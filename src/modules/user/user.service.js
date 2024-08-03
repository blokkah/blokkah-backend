const ApiError = require('../../utils/errors/ApiError');
const userRepository = require('../../repositories/user.repository');
 
const roleRepostiory = require("../../repositories/role.repostiory")
const status = require('http-status');
const InvalidCredentialsError = require('../../utils/errors/InvalidCredentials');
 
const emailServiceSendGrid = require("../../services/emailServiceSendGrid")
function exclude(user, keys) {
    return Object.fromEntries(
      Object.entries(user).filter(([key]) => !keys.includes(key))
    );
  }
  

exports.verifyAgent = async(id) => {
    const user = await userRepository.getUserBy({id});
    if (!user) throw new ApiError(status.BAD_REQUEST, "Please Enter correct agent id");
    if (user.roleName != "agent") throw new ApiError(status.BAD_REQUEST, "Please Enter Correct Agent Id...");
    const verifiedAgent = await userRepository.updateUser(id, {isVerified:true, isPending:false});
    return verifiedAgent
}

exports.rejectAgent = async(id) => {
    const user = await userRepository.getUserBy({id});
    if (!user) throw new ApiError(status.BAD_REQUEST, "Please Enter correct agent id");
    if (user.roleName != "agent") throw new ApiError(status.BAD_REQUEST, "Please Enter Correct Agent Id...");
    const verifiedAgent = await userRepository.updateUser(id, {isVerified:false, isPending:false});
    return verifiedAgent
}

exports.getAllAgents = async(limit = 5, page = 1, filter = {}) => {
    const agents = await userRepository.getUsersByRoleName("agent", limit,page, filter);
 
    return agents;
}
 

exports.getAllCustomers = async(limit = 5, page = 1) => {
  const agents = await userRepository.getUsersByRoleName("customer", limit,page);

  return agents;
}


exports.activateUser = async (id) => {
  // CHECK Should i validate here that the admin is the one who activating? or this is a middleware responsibility?!
  const user = await userRepository.getUserBy({id});
  if (!user) throw new ApiError(status.BAD_REQUEST, "Please Enter correct user id");
  if (user.isActive) throw new ApiError(status.BAD_REQUEST, "User is already activated");
  const activateUser = await userRepository.updateUser(id, {isActive: true});
  return true;
}

exports.deActivateUser = async (id) => {
  //Should i validate here that the admin is the one who activating? or this is a middleware responsibility?!
  const user = await userRepository.getUserBy({id});
  if (!user) throw new ApiError(status.BAD_REQUEST, "Please Enter correct user id");
  if (!user.isActive) throw new ApiError(status.BAD_REQUEST, "User is already deactivated");
  const activateUser = await userRepository.updateUser(id, {isActive: false});
  return true;
}


 