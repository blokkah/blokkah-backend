const authenticateService = require("../../services/authentication.service");
const userRepository = require("../../repositories/user.repository");

 

function TestLocalAuthenicate() {
authenticateService.localAuthenticate({email:"admin@example.com", password:"sasa123456"}).then(v => {
    console.log(v);
}).catch(y => {
    console.log(y);
})
}



async function  TestRequestPasswordRest() {
 
const email = "sasa1x2001@gmail.com";
const userData = {
  firstName:"Mostafa",
  lastName:"Mohamed",
  email,
  isActive:false,
  roleName:"agent",
  language:"ar",
  roleId:"3"
};
const preUser = await userRepository.getUserBy({email});
if (!preUser) {
  await userRepository.createUser(userData);
}
const token = await authenticateService.requestPasswordReset(email);
const verify = await authenticateService.verifyOTP(token, email);
 
const jwt = await authenticateService.resetPassword(token, "mostafa123");
 
const auth = await authenticateService.localAuthenticate({email,password: "mostafa123"});
const isSecondActive = await authenticateService.verifyJWT(auth.token);
 
}

 
    
    
 
  TestRequestPasswordRest().then(v => {
    console.log(v);
  }).catch(e => {
    console.log(e);
  })