const { PrismaClient } = require('@prisma/client');

 
const prisma = new PrismaClient()
async function main() {

const deleteAdminRoles = await prisma.role.deleteMany({});
const adminRole = await prisma.role.create({
    data: {
    id:"1",
    description:" This is admin Role",
    name:"admin"
    }
});

const admin2 = await prisma.role.create({
  data: {
  id:"4",
  description:" This is Admin 2 Role",
  name:"admin"
  }
});

const customer = await prisma.role.create({
    data: {
    id:"2",
    description:" This is Customer Role",
    name:"customer"
    }
});

const agent = await prisma.role.create({
    data: {
    id:"3",
    description:" This is Agent Role",
    name:"agent"
    }
});
 
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })