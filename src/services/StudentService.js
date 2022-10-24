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
    const response = await Student.show(id);

    if (!response) {
      return {
        error: true,
        message: 'no found students',
      };
    }

    response.id = Number(response.id);

    return response;
  }

  async store(body) {
    const response = await Student.store(body);

    if (response.error) {
      return response.error;
    }

    return true;
  }

  async update(query, id) {
    const updatedString = Object.entries(query).map(([key, value]) => `${key} = '${value}'`).join(' ');

    const response = await Student.update(updatedString, id);

    if (response.error) {
      return response.error;
    }

    return true;
  }

  async delete(id) {
    const response = await Student.delete(id);

    if (response.error) {
      return response.error;
    }

    return true;
  }
}

export default new StudentService();
