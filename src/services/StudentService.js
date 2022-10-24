import Student from '../models/Student';

class StudentService {
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

      response.id = Number(response.id);

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

      return true;
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

      const updatedString = Object.entries(query).map(([key, value]) => `${key} = '${value}'`).join(' ');

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
}

export default new StudentService();
