import prisma from '../configs/database';

class StudentCourse {
  async store({
    studentID,
    id_curso,
    status_aluno,
    matricula,
  }) {
    const response = await prisma.$queryRaw `insert into tbl_aluno_curso(id_aluno, id_curso, matricula, status_aluno)
                                            values (${studentID}, ${id_curso}, ${matricula}, ${status_aluno})`;

    if (response.error) {
      return response.error;
    }

    return response;
  }

  async show({
    studentID,
  }) {
    const response = await prisma.$queryRaw `SELECT CAST(id as float) as id, CAST(id_aluno as float) as id_aluno, CAST(id_curso AS float) as id_curso, matricula, status_aluno FROM tbl_aluno_curso WHERE id_aluno = ${studentID} ORDER BY id DESC`;

    if (response.error) {
      return response.error;
    }

    return response;
  }

  async showByCourse(id) {
    const response = await prisma.$queryRaw `SELECT CAST(id_aluno as float) id_aluno, CAST(id as float) id, matricula, status_aluno from tbl_aluno_curso where id_curso = ${id};`;

    if (response.error) {
      return response.error;
    }

    return response;
  }
}

export default new StudentCourse();
