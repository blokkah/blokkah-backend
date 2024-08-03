const express = require('express');
const superAdminController = require("../../modules/superAdmin/superAdmin.controller")
const userController = require("../../modules/user/user.controller")

const superAdminValidation = require("../../modules/superAdmin/superAdmin.validation") 
const authorizationMiddleware = require("../../middlewares/authorization");
const validate = require('../../middlewares/validate');
const authorization = require('../../middlewares/authorization');
const authentication = require("../../middlewares/authentication");

const router = express.Router();


//CHECK Make auth route for all of this
router.post("/auth/login", authentication.localLogin);

//Validate that {email : correct format is sent ! TODO} CHECK
//CHECK Refactor this to separate auth route
router.post("/auth/forget", authentication.requestResetPassword );
router.post("/auth/verify", authentication.verifyResetToken);
router.post("/auth/reset", authentication.resetPassword);
router.patch("/auth/password", authentication.changePassword)

// router.get('/employees', authentication.isEmployeeAuthenticated,authorization("SuperAdmin", "read", "employees", false, "*"),  superAdminController.getAllEmployees);
router.get('/employees',  superAdminController.getAllEmployees);
router.post("/employee", superAdminController.createEmployee);
router.patch("/employee/:id", superAdminController.updateEmployee);
router.post("/employee/activate", superAdminController.activateEmployee);
router.post("/employee/deactivate", superAdminController.deActivateEmployee);
router.delete("/employee/delete", superAdminController.deleteEmployee)
 
router.get('/agents', userController.getAllAgents);
router.get("/customers", userController.getAllCustomers);

router.post("/agent/deactivate", userController.deActivateUser);
router.post("/agent/activate", userController.activateUser);
router.post("/agent/verify", userController.verifyAgent);
router.post("/agent/reject", userController.rejectAgent);

router.get("/agents/pending", userController.getPendingAgents);
router.get("/agents/accepted", userController.getAcceptedAgents);
router.get("/agents/rejected", userController.getRejectedAgents);

///customer and /agent are not duplicate because there will be authorization!
//CHECK you must do activateAgent and activateCustomer!!!
router.post("/customer/deactivate", userController.deActivateUser);
router.post("/customer/activate", userController.activateUser);



module.exports = router;