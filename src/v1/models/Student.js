import prisma from '../configs/database';
import StudentCourse from './StudentCourse';

class Student {
  async index() {
    const response = await prisma.$queryRaw `SELECT * FROM tbl_aluno ORDER BY id DESC`;

    await Promise.all(response.map(async (student) => {
      // eslint-disable-next-line no-param-reassign
      student.curso = await StudentCourse.show({
        studentID: student.id,
      });
    }));

    return response.length > 0 ? response : false;
  }

  async show(id) {
    const response = await prisma.$queryRaw `SELECT cast(id as float) as id, nome, foto, sexo, rg, cpf, email, telefone, celular, data_nascimento FROM tbl_aluno WHERE id = ${id}`;

    if (response.length < 0) return false;

    response[0].courses = await StudentCourse.show({
      studentID: response[0].id,
    });

    return response[0];
  }

  async store({
    nome,
    foto,
    sexo,
    rg,
    cpf,
    email,
    telefone,
    celular,
    data_nascimento,
  }) {
    const sql = `insert into tbl_aluno (nome, foto, sexo, rg, cpf, email, telefone, celular, data_nascimento)
    values ('${nome}', '${foto}', '${sexo}', '${rg}', '${cpf}', '${email}', '${telefone}', '${celular}', '${data_nascimento}')`;

    const response = await prisma.$executeRawUnsafe(sql);

    if (response.error) {
      return response.error;
    }

    const id = await this.getLastId();

    return id;
  }

  async update(updatedData, id) {
    // nome, email, foto, data_nascimento, telefone, celular, rg, cpf
    const sql = `UPDATE tbl_aluno SET ${updatedData} WHERE id = ${id}`;

    const response = await prisma.$queryRawUnsafe(sql);

    return response;
  }

  async delete(id) {
    const response = await prisma.$queryRaw `delete from tbl_aluno where id = ${id}`;

    if (response.error) {
      return response.error;
    }

    return response;
  }

  async getLastId() {
    const id = await prisma.$queryRaw `select CAST(id as float) id from tbl_aluno order by id desc limit 1`;

    return id;
  }
}

export default new Student();
