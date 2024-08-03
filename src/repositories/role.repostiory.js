const { PrismaClient, Prisma } = require('@prisma/client');
const ApiError = require('../utils/errors/ApiError');
const prisma = new PrismaClient();

// Create a role
async function createRole(roleData) {
  return await prisma.role.create({
    data: roleData,
  });
}

// Get a role by ID
async function getRoleById(id) {
  return await prisma.role.findUnique({
    where: { id },
    include: {
      users: true,
      employees: true,
      rolePermissions: {
        include: {
          permission: true,
        },
      },
    },
  });
}

async function getRoleBy(data) {
    return await prisma.role.findUnique({
      where: data,
    });
  }
  
// Get all roles
async function getAllRoles() {
  return await prisma.role.findMany({
    include: {
      users: true,
      employees: true,
      rolePermissions: {
        include: {
          permission: true,
        },
      },
    },
  });
}

// Update a role by ID
async function updateRole(id, roleData) {
  return await prisma.role.update({
    where: { id },
    data: roleData,
  });
}

// Delete a role by ID
async function deleteRole(id) {
  return await prisma.role.delete({
    where: { id },
  });
}

// Assign a permission to a role
async function assignPermissionToRole(roleId, permissionId) {
  return await prisma.rolePermission.create({
    data: {
      roleId,
      permissionId,
    },
  });
}

// Remove a permission from a role
async function removePermissionFromRole(roleId, permissionId) {
  return await prisma.rolePermission.delete({
    where: {
      roleId_permissionId: {
        roleId,
        permissionId,
      },
    },
  });
}

// Get permissions for a role
async function getPermissionsForRole(roleId) {
  return await prisma.rolePermission.findMany({
    where: { roleId },
    include: {
      permission: true,
    },
  });
}
async function assignRoleToEmployee(employeeId, roleId) {
    return await prisma.employeeRoles.create({
      data: {
        employeeId,
        roleId,
      },
    });
  }
  

  async function unassignRoleToEmployee(employeeId, roleId) {
    const deletedRole =await prisma.employeeRoles.delete({
      where :{
        employeeId_roleId:{
        employeeId:employeeId,
        roleId:roleId
        }
      }
    });
    console.log(deletedRole)
  }
module.exports = {
  createRole,
  getRoleById,
  getAllRoles,
  updateRole,
  deleteRole,
  assignPermissionToRole,
  removePermissionFromRole,
  getPermissionsForRole,
  getRoleBy,
  assignRoleToEmployee,
  unassignRoleToEmployee
};
