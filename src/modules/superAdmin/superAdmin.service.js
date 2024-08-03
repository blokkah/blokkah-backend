const ApiError = require('../../utils/errors/ApiError');
const employeeRepository = require('../../repositories/employee.repository');
 
const roleRepostiory = require("../../repositories/role.repostiory")
const status = require('http-status');
const InvalidCredentialsError = require('../../utils/errors/InvalidCredentials');
const AuthenticateService = require("../../services/employeeAuthentication.service");
const emailServiceSendGrid = require("../../services/emailServiceSendGrid")
function exclude(user, keys) {
    return Object.fromEntries(
      Object.entries(user).filter(([key]) => !keys.includes(key))
    );
  }
  
exports.createEmployee = async(employeeData) => {

    const role = await roleRepostiory.getRoleBy({name:employeeData.roleName});
    const roleId = role.id;
    const randomPassword = AuthenticateService.generateRandomPassword();
    const data = {
        firstName: employeeData.firstName,
        lastName: employeeData.lastName,
        email: employeeData.email,
        password: AuthenticateService.hashPassword(randomPassword),
        isActive:employeeData.isActive,
    };
    //Should be transaction
    const newUser = await employeeRepository.createEmployee(data);
    const assignedRole = await roleRepostiory.assignRoleToEmployee(newUser.id, roleId);
    emailServiceSendGrid.emailNewPasswordGeneration(employeeData.email,employeeData.firstName + ' ' + employeeData.lastName, randomPassword);
    if (process.env.NODE_ENV == "development") {
        return {
            user:newUser,
            password:randomPassword
        }
    } else {
    return  {user:newUser, password:randomPassword};
    }
}

exports.getAllEmployees = async(limit = 5, page = 1) => {
    const workers = await employeeRepository.getAllEmployees(limit,page);
    return workers;
}
 
exports.getAllEmployeesWithRoles = async(limit = 5, page = 1) => {
    let result = await employeeRepository.getAllEmployeesWithRoles(limit,page);
    
    return result
}
exports.activateEmployee = async (id) => {
    // CHECK Should i validate here that the admin is the one who activating? or this is a middleware responsibility?!
    const user = await employeeRepository.getEmployeeBy({id});
    if (!user) throw new ApiError(status.BAD_REQUEST, "Please Enter correct user id");
    if (user.isActive) throw new ApiError(status.BAD_REQUEST, "User is already activated");
    const activateUser = await employeeRepository.updateEmployee(id, {isActive: true});
    return true;
}

exports.deActivateEmployee = async (id) => {
    //Should i validate here that the admin is the one who activating? or this is a middleware responsibility?!
    const user = await employeeRepository.getEmployeeBy({id});
    if (!user) throw new ApiError(status.BAD_REQUEST, "Please Enter correct user id");
    if (!user.isActive) throw new ApiError(status.BAD_REQUEST, "User is already deactivated");
    const activateUser = await employeeRepository.updateEmployee(id, {isActive: false});
    return true;
}


exports.deleteEmployee = async (id) => {
    // CHECK Should i validate here that the admin is the one who activating? or this is a middleware responsibility?!
    const user = await employeeRepository.getEmployeeBy({id});
    if (!user) throw new ApiError(status.BAD_REQUEST, "Please Enter correct user id");
    if (user.isDeleted) throw new ApiError(status.BAD_REQUEST, "User is already deleted");
    const deletedUser = await employeeRepository.updateEmployee(id, {isDeleted: true});
    return true;
}



exports.assignRole = async (id, roleName) => {
    const employee = await employeeRepository.getEmployeeBy({id});
    if (!employee) throw new ApiError(status.BAD_REQUEST, "Please Enter correct employee id");
    const role = await roleRepostiory.getRoleBy({name:roleName});
    const roleId = role.id;
    //Insert in the junk table userId and roleId!
    const roleAssigment = await roleRepostiory.assignRoleToEmployee(id,roleId);

}

exports.unassignRole = async(id, roleName) =>{

    const employee = await employeeRepository.getEmployeeBy({id});
    if (!employee) throw new ApiError(status.BAD_REQUEST, "Please Enter correct employee id");
    const role = await roleRepostiory.getRoleBy({name:roleName});
    const roleId = role.id;
    //Insert in the junk table userId and roleId!
    const roleAssigment = await roleRepostiory.unassignRoleToEmployee(id,roleId);


}
exports.getEmployeeRoles = async (id) => {
    const roles = await employeeRepository.getRolesOfEmployee(id);
    return roles
}
 
exports.getAllAgents = async(limit = 5, page = 1) => {
    const workers = await employeeRepository.getUsersByRoleName("agent",limit,page);
    return workers;
}
 


exports.updateEmployee = async(id, userData) => {
    const data = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        profilePicture:userData.profilePicture
    };
    
    const updatedUser = await employeeRepository.updateEmployee(id, data);
    
    return updatedUser;

}