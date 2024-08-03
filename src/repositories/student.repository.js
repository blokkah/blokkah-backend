const { prisma } = require('../services/common/prisma.service');

exports.createStudent = async (data) => {
  const student = await prisma.student.create({ data });
  return student;
};
