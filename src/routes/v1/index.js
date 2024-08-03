const express = require('express');
 
const userRoute = require('./user.route.js');
const dashboardRoute = require('./dashboard.route.js');


 
const router = express.Router();

const defaultRoutes = [
 
  {
    path:"/dashboard",
    route:dashboardRoute
  }
];


 defaultRoutes.forEach((route) => {
   router.use(route.path, route.route);
 });

module.exports = router;
