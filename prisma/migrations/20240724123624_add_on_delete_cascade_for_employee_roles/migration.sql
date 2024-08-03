-- DropForeignKey
ALTER TABLE "EmployeeRoles" DROP CONSTRAINT "EmployeeRoles_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeRoles" DROP CONSTRAINT "EmployeeRoles_roleId_fkey";

-- AddForeignKey
ALTER TABLE "EmployeeRoles" ADD CONSTRAINT "EmployeeRoles_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeRoles" ADD CONSTRAINT "EmployeeRoles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;
