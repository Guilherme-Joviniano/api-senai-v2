import prisma from '../configs/database';

class Course {
  async index() {
    const response = await prisma.$queryRaw `SELECT * FROM tbl_course ORDER BY id DESC`;

    return response;
  }

  async show(id) {
    const response = await prisma.$queryRaw `SELECT * FROM tbl_course WHERE id = ${id}`;

    return response;
  }

  async store({
    nome,
    carga_horaria,
    icone,
    sigla,
  }) {
    const sql = `insert into tbl_course (nome, carga_horaria, icone, sigla)
    values ('${nome}', '${carga_horaria}', '${icone}', '${sigla}')`;

    const response = await prisma.$executeRawUnsafe(sql);

    if (response.error) {
      return response.error;
    }

    return response;
  }

  async update(updatedData, id) {
    const sql = `UPDATE tbl_course SET ${updatedData} WHERE id = ${id}`;

    const response = await prisma.$queryRawUnsafe(sql);

    return response;
  }

  async delete(id) {
    const response = await prisma.$queryRaw `delete from tbl_course where id = ${id}`;

    if (response.error) {
      return response.error;
    }

    return response;
  }
}

export default new Course();
