const { PrismaClient, Prisma } = require('@prisma/client');
const ApiError = require('../utils/errors/ApiError');
const roleRepostiory = require("./role.repostiory");
const prisma = new PrismaClient();

function exclude(user, keys) {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !keys.includes(key))
  );
}

  // Create an employee
  exports.createEmployee = async(employeeData)  => {
    return await prisma.employee.create({
      data: employeeData,
    });
    
  }

  // Get an employee by ID
  exports.getEmployeeById = async (id) => {
    return await prisma.employee.findUnique({
      where: { id },
    });
  }

   // Get an employee by ID
   exports.getRolesOfEmployee = async (id) => {
    const roles = await prisma.employeeRoles.findMany({
      where: { employeeId:id },
      include:{
        role:true
      }
  
    });
    return roles;
   
  }

  exports.getAllEmployeesWithRoles = async(limit,page) => {
    const skip = (page - 1) * limit;
    limit = parseInt(limit,10);
    const [employees, countEmployees] = await prisma.$transaction([
      prisma.employee.findMany({
      skip,
      take:limit,
      where: {
        isDeleted:false,
      },
      include:{
        roles:{
          include:{
            role:true
          }
        }
      }
    }),
    prisma.employee.count({
      where: {
        isDeleted: false,
  
      },
    })
  ]);
    let resultArr = [];
    employees.forEach(v => {
      v = exclude(v, ["password", "passwordUpdatedAt"]);
      resultArr.push(v);
    })
 
    return {employees:resultArr,countEmployees};
  }
 
 
  // Update an employee by ID
  exports.updateEmployee = async (id, employeeData) => {
    return await prisma.employee.update({
      where: { id },
      data: employeeData,
    });
  }

 
 
  exports.getEmployeeBy = async (data) => {
    return await prisma.employee.findUnique({
     where: data
   });
  
 }

 exports.deleteEmployeeBy = async(data) => {
  await prisma.employee.delete({where:data});
}
  // Get all employees
exports.getAllEmployees = async(limit = 5, page = 1) => {
  const skip = (page - 1) * limit;
  limit = parseInt(limit,10);
  const [employees, countEmployees] = await prisma.$transaction([
    prisma.employee.findMany({
    skip,
    take:limit,
    where: {
      isDeleted:false,
    }
  }),
  prisma.employee.count({
    where: {
      isDeleted: false,

    },
  })
]);
  return {employees,countEmployees};
 }

 exports.createToken = async(employeeId, token) => {
  const newToken = await prisma.resetToken.create({data:{employeeId,token}});
  return newToken;
}


exports.getTokenBy = async (data) => {
 
  return await prisma.resetToken.findUnique({
   where: data
 });

}

exports.deleteTokenByEmployeeId = async (employeeId) => {
const deletedResetToken = await prisma.resetToken.delete({where:{employeeId}});
return deletedResetToken;
}