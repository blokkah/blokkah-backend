const ApiError = require('../../utils/errors/ApiError');
const userRepository = require('../../repositories/user.repository');
 
const AuthenticateService = require("../../services/userAuthentication.service");
 
const status = require('http-status');
const InvalidCredentialsError = require('../../utils/errors/InvalidCredentials');
// exports.createUser = async(userData, refCode) => {
//     const roleId = await userRepository.getRoleIdByName(userData.roleName);
//     const data = {
//         firstName: userData.firstName,
//         lastName: userData.lastName,
//         userName: userData.userName,
//         email: userData.email,
//         phoneNumber: userData.phoneNumber,
//         password: AuthenticateService.hashPassword(userData.password),
//         country: userData.country,
//         isVerified: false,
//         isLocal: true,
//         isGoogle: false,
//         isApple: false,
//         googleId: null,
//         appleId: null,
//         roleName: userData.roleName,
//         falLicense: userData.falLicense,
 
//         dateOfBirth: userData.dateOfBirth,
//         referralCode:AuthenticateService.generateRandom(),
//         language:userData.language,
//         roleId
//     };
//     let newUser;
//     if (refCode) {  
//         const referalUser = await userRepository.getUserByReferralCode(refCode);
//         if (!referalUser) {
//             throw new ApiError(400, 'Wrong Referal Link');
//         }  
//         data.referrerId = referalUser.id;
       
//         // const p = await userRepository.updateUserPoints(referalUser.id, 10);
//        newUser =  await  userRepository.createUserAndUpdatePoints(data,referalUser.id,10);
//     } else {
//        newUser = await userRepository.createUser(data);
//     }
 
//     return  newUser;
// }

// exports.activateUser = async (id) => {
//     // CHECK Should i validate here that the admin is the one who activating? or this is a middleware responsibility?!
//     const user = await userRepository.getUserBy({id});
//     if (!user) throw new ApiError(status.BAD_REQUEST, "Please Enter correct user id");
//     if (user.isVerified) throw new ApiError(status.BAD_REQUEST, "User is already activated");
//     const activateUser = await userRepository.update(id, {isVerified: true});
//     return true;
// }

// exports.deActivateUser = async (id) => {
//     //Should i validate here that the admin is the one who activating? or this is a middleware responsibility?!
//     const user = await userRepository.getUserBy({id});
//     if (!user) throw new ApiError(status.BAD_REQUEST, "Please Enter correct user id");
//     if (!user.isVerified) throw new ApiError(status.BAD_REQUEST, "User is already deactivated");
//     const activateUser = await userRepository.update(id, {isVerified: false});
//     return true;
// }

// exports.updatePassword = async (user, oldPassword,newPassword) => {
//     //CHECK 
//       //Should i validate here that the admin is the one who activating? or this is a middleware responsibility?! 
//     const result = await AuthenticateService.verifyPassword(oldPassword, user.password);
//     if (!result) throw new InvalidCredentialsError() //CHECK I think here we need to revoke the jwt!?
//     const updatePassword = await userRepository.update(user.id, {password: AuthenticateService.hashPassword(newPassword), passwordUpdatedAt:new Date() })
//     const token = AuthenticateService.generateToken(user.userName, user.id);
//     return {token}
//  }
 


//  exports.isPasswordActive = async(id,passwordTime) => {
//     const user = await userRepository.getUserBy({id});
//     if (!user) throw new ApiError(status.BAD_REQUEST, "Something went wrong..");

//     if (tokenVeri.iat * 1000 < user.passwordUpdatedAt) { throw new InvalidCredentialsError();}

//     return user;
//  }


// exports.updateUser = async(id, userData) => {
//     const data = {
//         firstName: userData.firstName,
//         lastName: userData.lastName,
//         email: userData.email,
//         profilePicture:userData.profilePicture
//     };
//     const updatedUser = await userRepository.updateUser(id, data);
    
//     return updatedUser;

// }