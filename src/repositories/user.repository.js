const { PrismaClient, Prisma } = require('@prisma/client');
const ApiError = require('../utils/errors/ApiError');

const prisma = new PrismaClient();

exports.createUser = async (data) => {
 
  const user = await prisma.user.create({ data });
  return user;
};

exports.getUserByReferralCode = async (referralCode) => {
    const user = await prisma.user.findUnique({ where: { referralCode } });
    
    return user;
  };

  exports.getUserBy = async (data) => {
 
     return await prisma.user.findUnique({
      where: data
    });
   
 

  }

  exports.getUsersBy = async (data) => {
 
    return await prisma.user.findMany({
     where: data
   });
  


 }
  exports.updateUserPoints = async (id, value) => {
  
      return await prisma.user.update({
        where: { id },
        data : {
            points:{
                increment:value
            }
        }
      });
     
  };
  
  exports.updateUser = async (id, data) => {
  
    return await prisma.user.update({
      where: { id },
      data
    });
   
};


  exports.createUserAndUpdatePoints = async (userData, userId, points) => {
    return await prisma.$transaction(async (prisma) => {
      const user = await prisma.user.create({ data: userData });
      await prisma.user.update({
        where: { id: userId },
        data: {
          points: {
            increment: points,
          },
        },
      });

      await prisma.user.update({
        where:{id:userData.referrerId},
        data:{
          referralCount:{
            increment:1
          }
        }
      })
      return user;
    });
  };
  
  exports.deleteAllUsers = async() => {
    await prisma.user.deleteMany({});
  }
  exports.deleteUserBy = async(data) => {
    await prisma.user.deleteMany({where:data});
  }
  exports.getRoleIdByName = async(name) => {
    const role = await prisma.role.findUnique({where :{name} });
    return role.id;
  } 

  
  

  exports.createToken = async(userId, token) => {
    const newToken = await prisma.resetToken.create({data:{userId,token}});
    return newToken;
  }

  
  exports.getTokenBy = async (data) => {
   
    return await prisma.resetToken.findUnique({
     where: data
   });
  
 }

 exports.deleteTokenByUserId = async (userId) => {
  const deletedResetToken = await prisma.resetToken.delete({where:{userId}});
  return deletedResetToken;
 }


//  exports.getAllEmployees = async(limit = 5, page = 1) => {
//   //CHECK BUSSINESS LOGIC IN REPO
  
//   const skip = (page - 1) * limit;
//   const employees = await prisma.user.findMany({
//     skip,
//     take:limit,
//     where: {
//       isDeleted:false,
//       role: {
//         name: {
//           notIn: ['agent', 'agency', 'customer'],
//         },
//       },
//     },
//     include: {
//       role: true, 
//     },
//   });

//   const countEmployees = await prisma.user.count({
//     where: {
//       isDeleted: false,
//       role: {
//         name: {
//           notIn: ['agent', 'agency', 'customer'],
//         },
//       },
//     },
//   });
  
//   return {employees,countEmployees};
//  }


//CHECK you must exclude password field here
 exports.getUsersByRoleName = async (roleName, limit = 5, page = 1, filters={}) => {
  const skip = (page - 1) * limit;
  limit = parseInt(limit,10);
  const [users, countUsers] = await prisma.$transaction([
    prisma.user.findMany({
      skip,
      take: limit,
      where: {
        ...filters,
        isDeleted: false,
        role: {
          name: roleName,
        },
      }
    }),
    prisma.user.count({
      where: {
        ...filters,
        isDeleted: false,
        role: {
          name: roleName,
        },
      },
    }),
  ]);

  return { users, countUsers };
};


 