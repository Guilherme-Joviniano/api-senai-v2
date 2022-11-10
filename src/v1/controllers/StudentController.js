import _ from 'underscore';
import validator from 'validator';
import messages from '../configs/messages';
import storeStudentRequiredValues from '../helpers/storeStudentRequiredValues';
import StudentAdapter from '../adapters/StudentAdapter';
import getMatricula from '../helpers/getMatricula';

class StudentController {
  async index(req, res) {
    const response = await StudentAdapter.index();

    if (!response) {
      return res.status(400).json({
        code: 400,
        error: true,
        message: messages.NOT_FOUNDED,
      });
    }

    return res.status(200).json({
      status: 200,
      payload: response,
      error: false,
    });
  }

  async show(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        code: 400,
        error: true,
        message: messages.REQUIRED_PARAMETER,
      });
    }

    const response = await StudentAdapter.show(id);

    if (response.error) {
      return res.status(400).json({
        code: 400,
        error: true,
        message: response.message,
      });
    }

    return res.status(200).json({
      status: 200,
      payload: response,
      error: false,
    });
  }

  async store(req, res) {
    const form = req.body;

    const entries = Object.entries(form);

    const hasEmptyValues = entries.map(([, value]) => {
      if (!value) return false;
      return true;
    });

    if (hasEmptyValues.includes(false)) {
      return res.status(400).json({
        code: 400,
        error: true,
        message: messages.EMPTY_VALUES,
      });
    }

    const intersected = _.intersection(
      storeStudentRequiredValues,
      Object.keys(form)
    );

    const isSame = storeStudentRequiredValues.every((el) =>
      intersected.includes(el)
    );

    if (!isSame) {
      return res.status(400).json({
        code: 400,
        message: messages.EMPTY_BODY_VALUES,
        error: true,
      });
    }

    if (!validator.isEmail(form.email)) {
      return res.status(400).json({
        code: 400,
        message: messages.INVALID_EMAIL,
        error: true,
      });
    }

    // alterar para student a resposta
    const { nome, foto, sexo, rg, cpf, email, data_nascimento } = form;

    const studentID = await StudentAdapter.store({
      nome,
      foto,
      sexo,
      rg,
      cpf,
      email,
      data_nascimento,
    });

    if (studentID.error) {
      return res.status(400).json({
        code: 400,
        error: true,
        message: studentID.message,
      });
    }

    const { cursos } = form;

    // add the matricula to each course
    cursos.forEach((c) => {
      const matricula = getMatricula(studentID, c.id_curso);
      c.matricula = matricula;
    });

    // add the courses from the created student
    await Promise.all(
      cursos.map(async (c) => {
        const r = await StudentAdapter.addCourse(c, studentID);

        if (!r) {
          return res.status(400).json({
            code: 400,
            error: true,
            message: messages.NOT_FOUNDED,
          });
        }
      })
    );

    return res.status(201).json({
      status: 201,
      payload: messages.SUCESS_CREATED,
      error: false,
    });
  }

  async update(req, res) {
    const { query } = req;
    const { id } = req.params;

    if (!query) {
      return res.status(400).json({
        status: 400,
        error: true,
        message: messages.EMPTY_QUERIES_VALUES,
      });
    }

    if (!id) {
      return res.status(400).json({
        code: 400,
        error: true,
        message: messages.REQUIRED_PARAMETER,
      });
    }

    const { matricula } = query;
    const { course } = query;

    // atualizar os dados do curso selecionados
    if (matricula) {
      // TODO
    }

    // adicionar novo curso fora do store
    if (course) {
      // TODO
    }

    const response = await StudentAdapter.update(query, id);

    if (!response) {
      return res.status(400).json({
        code: 400,
        error: true,
        message: messages.NOT_FOUNDED,
      });
    }

    if (response.error) {
      return res.status(400).json({
        code: 400,
        error: true,
        message: response.message,
      });
    }

    return res.status(202).json({
      status: 202,
      payload: messages.SUCESS_UPDATED,
      error: false,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        code: 400,
        error: true,
        message: messages.REQUIRED_PARAMETER,
      });
    }

    const response = await StudentAdapter.delete(id);

    if (!response) {
      return res.status(400).json({
        code: 400,
        error: true,
        message: messages.NOT_FOUNDED,
      });
    }

    if (response.error) {
      return res.status(400).json({
        code: 400,
        error: true,
        message: response.message,
      });
    }

    return res.status(202).json({
      code: 202,
      payload: messages.SUCESS_DELETED,
      error: false,
    });
  }
}

export default new StudentController();
