import Course from '../models/Course';
import StudentCourse from '../models/StudentCourse';

class CourseAdapter {
  async index() {
    try {
      const response = await Course.index();

      if (!response) {
        return false;
      }

      // add the students for each course
      await Promise.all(
        response.map(async (course) => {
          const students = await this.showStudents(course.id);
          course.students = students;
        }),
      );

      return response;
    } catch (e) {
      return {
        message: e.message,
      };
    }
  }

  async show(id) {
    try {
      const response = await Course.show(id);

      if (!response) {
        return {
          error: true,
          message: 'no found Courses',
        };
      }

      const students = await this.showStudents(id);

      response[0].students = students;

      return response;
    } catch (e) {
      return {
        message: e.message,
      };
    }
  }

  async store(body) {
    try {
      const response = await Course.store(body);

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
      const course = await this.show(id);

      if (course.error) {
        return false;
      }

      const updatedString = Object.entries(query)
        .map(([key, value]) => `${key} = '${value}'`)
        .join(' '); // ORM

      const response = await Course.update(updatedString, id);

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
      const course = await this.show(id);

      if (course.error) {
        return false;
      }

      const response = await Course.delete(id);

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

  async showStudents(id) {
    try {
      const response = await StudentCourse.showByCourse(id);

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

export default new CourseAdapter();
