const assert = require("assert");

const userService = require("../../modules/user/user.service");

const userRepository = require("../../repositories/user.repository");
const AuthenticationService = require("../../services/userAuthentication.service");

 
//Scenario Where we will delete all users table
//Create a user
//Activate it 
//Create another user with refer to the previous user
//Check Points Increased
//Check refId is valid
//Deactivate the first user
//Update Password and try to authenticate 
//Validate jwt 
const TestClassicScenario = async () => {
    const body = {
        "firstName": "Mostafa",
        "lastName": "Mohamed",
        "userName": "Mostafa",
        "email": "admin@example.com",
        "phoneNumber": "966514139610",
        "password": "sasa",
        "country": "saudi-arabia",
        "roleName": "customer",
        "city": "Ryadh",
        "dateOfBirth": new Date(),
        "language":"ar"
    };      

    const body2 = {
        "firstName": "Mostafa1",
        "lastName": "Mohamed",
        "userName": "Mostafa1",
        "email": "admin1@example.com",
        "phoneNumber": "966514139611",
        "password": "sasa1",
        "country": "saudi-arabia",
        "roleName": "customer",
        "city": "Ryadh",
        "dateOfBirth": new Date(),
        "language":"ar"
    };    
    await userRepository.deleteAllUsers();

    let user = await userService.createUser(body);
 
    assert.notEqual(user, undefined);
    await userService.activateUser(user.id);
    
    let secondUser = await userService.createUser(body2, user.referralCode);

    //Get User1 Values again
    user = await userRepository.getUserBy({id: user.id});
    assert.equal(user.points,10);
    assert.equal(secondUser.referrerId, user.id);
    assert.equal(user.isVerified, true);

    const updatePassword = await AuthenticationService.changePassword(secondUser.id, "sasa1", "mostafa");
    secondUser = await userRepository.getUserBy({id: secondUser.id});
    
    
    const isPasswordChanged = await AuthenticationService.verifyPassword("mostafa", secondUser.password);
    assert.equal(isPasswordChanged, true);
    // assert.equal(AuthenticationService.);
    const encodedTokenData = await AuthenticationService.verifyJWT(updatePassword.token);
    
    //Check That Referal Count of 2nd User Increased
    assert.equal(user.referralCount, 1);
}   


TestClassicScenario();