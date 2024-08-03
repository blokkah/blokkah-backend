-- CreateTable
CREATE TABLE "EmployeeRoles" (
    "employeeId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,

    CONSTRAINT "EmployeeRoles_pkey" PRIMARY KEY ("employeeId","roleId")
);

-- AddForeignKey
ALTER TABLE "EmployeeRoles" ADD CONSTRAINT "EmployeeRoles_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeRoles" ADD CONSTRAINT "EmployeeRoles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
