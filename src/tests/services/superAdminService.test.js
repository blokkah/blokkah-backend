const assert = require("assert");
const superAdminService = require("../../modules/superAdmin/superAdmin.service.js");
const userService = require("../../modules/user/user.service.js");
const AuthenticationService = require("../../services/employeeAuthentication.service.js");


const employeeRepository = require("../../repositories/employee.repository.js");
 
 
async function TestCreationOfEmployee() {
const email ="sasa1x2001@gmail.com";
const adminData = {
    firstName:"Mostafa",
    lastName:"Mohamed",
    email,
    isActive:false,
    roleName:"admin"
};
const user =  await employeeRepository.getEmployeeBy({email});
 
if (user) {
    await employeeRepository.deleteEmployeeBy({email:adminData.email});
}
//Creation
let admin = await superAdminService.createEmployee(adminData);
let myPassword = admin.password;
admin = admin.user;
// //Check that he is not activated
assert.equal(admin.isActive,false);
  //Activate Him
 const activatedAdmin = await superAdminService.activateEmployee(admin.id);
const fetchAdmin = await employeeRepository.getEmployeeBy({id:admin.id});
//Check he is activated
assert.equal(fetchAdmin.isActive,true);
 //Update His name
const updateUserInfo = await superAdminService.updateEmployee(admin.id, {firstName:"ahmed"})
const fetchAdmin2 = await employeeRepository.getEmployeeBy({id:admin.id});
  //Check name is updated
assert.equal(fetchAdmin2.firstName, "ahmed");
// Check Pagination
const paginateRequest = await superAdminService.getAllEmployees(1,1);
assert.equal(paginateRequest.employees.length, 1);
//Check Authentication
// console.log(myPassword)
 const loginRequest = await AuthenticationService.localAuthenticate({email,password:myPassword});

const changePasswordRequest = await AuthenticationService.changePassword(admin.id, myPassword, "ahmedo4o");

//Check Password is updated
const loginRequest2 = await AuthenticationService.localAuthenticate({email,password:"ahmedo4o"});
let result = await superAdminService.getEmployeeRoles(admin.id);
let found = false;
result.forEach(v=> {
    if (v.role.name == "admin") {
        found = true;
    }
});
assert.equal(found, true);
found = false;
result.forEach(v=> {
    if (v.role.name == "admin2") {
        found = true;
    }
});
assert.equal(found,false);
const admin2Assigment = await superAdminService.assignRole(admin.id, "admin2");
result = await superAdminService.getEmployeeRoles(admin.id);
found = false;
result.forEach(v=> {
    if (v.role.name == "admin2") {
        found = true;
    }
});
assert.equal(found,true);

const admin2UnAssigment = await superAdminService.unassignRole(admin.id, "admin2");
result = await superAdminService.getEmployeeRoles(admin.id);
found = false;
result.forEach(v=> {
    if (v.role.name == "admin2") {
        found = true;
    }
});
assert.equal(found,false);
}


// async function TestCreationOfAgent() {

//     const agentData = {
//         firstName:"Mostafa",
//         lastName:"Mohamed",
//         email:"blokkahAgent@test.com",
//         isActive:false,
//         roleName:"agent"
//     };
//     const user =  await employeeRepository.getUserBy({email:agentData.email});
     
//     if (user) {
//         await employeeRepository.deleteUserBy({email:agentData.email});
//     }
//     let agent = await superAdminService.createUser(agentData);
//     let myPassword = agent.password;
//     agent = agent.user;
//     const verifyAgentReq = await superAdminService.verifyAgent(agent.id);
    
//     const agents = await superAdminService.getAllAgents();
//     console.log(agents)
// }


TestCreationOfEmployee().then(v=>{console.log("User is created")}).catch(e=>{console.log(e)});
// TestCreationOfAgent().then(v=>{console.log("User is created")}).catch(e=>{console.log(e)});

 