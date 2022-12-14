import Student from '../models/Student';
import CursoAdapter from './CursoAdapter';
import StudentCourse from '../models/StudentCourse';

class StudentAdapter {
  async index() {
    try {
      const response = await Student.index();

      if (!response) {
        return false;
      }

      const students = response.map((student) => {
        const refactorResponse = student;
        refactorResponse.id = Number(student.id);
        return refactorResponse;
      }); // filter bigint to number

      return students;
    } catch (e) {
      return {
        message: e.message,
      };
    }
  }

  async show(id) {
    try {
      const response = await Student.show(id);

      if (!response) {
        return {
          error: true,
          message: 'no found students',
        };
      }

      return response;
    } catch (e) {
      return {
        message: e.message,
      };
    }
  }

  async store(body) {
    try {
      const response = await Student.store(body);

      if (response.error) {
        return response.error;
      }

      const id = Number(response[0].id);

      return id;
    } catch (e) {
      return {
        message: e.message,
      };
    }
  }

  async update(query, id) {
    try {
      const student = await this.show(id);

      if (student.error) {
        return false;
      }

      const updatedString = Object.entries(query)
        .map(([key, value]) => `${key} = '${value}'`)
        .join(' '); // ORM

      const response = await Student.update(updatedString, id);

      if (response.error) {
        return response.error;
      }

      return true;
    } catch (e) {
      return {
        message: e.message,
      };
    }
  }

  async delete(id) {
    try {
      const student = await this.show(id);

      if (student.error) {
        return false;
      }

      const response = await Student.delete(id);

      if (response.error) {
        return response.error;
      }

      return true;
    } catch (e) {
      return {
        message: e.message,
      };
    }
  }

  async addCourse({ id_curso, status_aluno, matricula }, studentID) {
    try {
      const student = await this.show(studentID);
      const course = await CursoAdapter.show(id_curso);

      if (!student || !course) {
        return false;
      }

      const response = await StudentCourse.store({
        studentID,
        id_curso,
        status_aluno,
        matricula,
      });

      if (response.error) {
        return response.error;
      }

      return true;
    } catch (e) {
      return {
        message: e.message,
      };
    }
  }

  async showCourses({ studentID }) {
    try {
      const student = await this.show(studentID);

      if (!student) {
        return false;
      }

      const response = await StudentCourse.show({
        studentID,
      });

      if (response.error) {
        return response.error;
      }

      return response;
    } catch (e) {
      return {
        message: e.message,
      };
    }
  }
}

export default new StudentAdapter();
