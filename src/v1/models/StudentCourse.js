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
    const response = await prisma.$queryRaw `SELECT  tbl_course.nome, tbl_course.carga_horaria, tbl_course.sigla, tbl_aluno_curso.matricula, tbl_aluno_curso.status_aluno from tbl_aluno
    inner join tbl_aluno_curso on tbl_aluno.id = tbl_aluno_curso.id_aluno
    inner join tbl_course ON tbl_course.id = tbl_aluno_curso.id_curso
    WHERE tbl_aluno.id = ${studentID}`;

    if (response.error) {
      return response.error;
    }

    return response;
  }

  async showByCourse(id) {
    const response = await prisma.$queryRaw `SELECT tbl_aluno.nome, tbl_aluno.foto, tbl_aluno.email, tbl_aluno.rg, tbl_aluno.cpf, tbl_aluno.data_nascimento, tbl_aluno_curso.matricula, tbl_aluno_curso.status_aluno from tbl_course
    inner join tbl_aluno_curso on tbl_course.id = tbl_aluno_curso.id_curso
    inner join tbl_aluno ON tbl_aluno.id = tbl_aluno_curso.id_aluno
    WHERE tbl_course.id = ${id}`;

    if (response.error) {
      return response.error;
    }

    return response;
  }
}

export default new StudentCourse();
