import _ from 'underscore';
import validator from 'validator';
import messages from '../configs/messages';
import storeStudentRequiredValues from '../helpers/storeStudentRequiredValues';
import StudentService from '../services/StudentService';

class StudentController {
  async index(req, res) {
    const response = await StudentService.index();

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

  async show(req, res) {
    const {
      id,
    } = req.params;

    if (!id) {
      return res.status(400).json({
        code: 400,
        error: true,
        message: messages.requiredParamater,
      });
    }

    const response = await StudentService.show(id);

    if (response.error) {
      return res.status(400).json({
        code: 400,
        error: true,
        message: response.message,
      });
    }

    return res.status(200).json({
      status: 200,
      data: response,
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
        message: messages.emptyValues,
      });
    }

    const intersected = _.intersection(storeStudentRequiredValues, Object.keys(form));

    const isSame = storeStudentRequiredValues.every((el) => intersected.includes(el));

    if (!isSame) {
      return res.status(400).json({
        code: 400,
        message: messages.emptyBodyValues,
        error: true,
      });
    }

    if (!validator.isEmail(form.email)) {
      return res.status(400).json({
        code: 400,
        message: messages.invalidEmail,
        error: true,
      });
    }

    const response = await StudentService.store(form);

    if (response.error) {
      return res.status(400).json({
        code: 400,
        error: true,
        message: response.message,
      });
    }

    return res.status(201).json({
      status: 201,
      message: messages.sucessCreated,
      error: false,
    });
  }

  async update(req, res) {
    const {
      query,
    } = req;
    const {
      id,
    } = req.params;

    if (!query) {
      return res.status(400).json({
        status: 400,
        error: true,
        message: messages.emptyQueriesValues,
      });
    }

    if (!id) {
      return res.status(400).json({
        code: 400,
        error: true,
        message: messages.requiredParamater,
      });
    }

    const response = await StudentService.update(query, id);

    if (response.error) {
      return res.status(400).json({
        code: 400,
        error: true,
        message: response.message,
      });
    }

    return res.status(202).json({
      status: 202,
      message: messages.sucessUpdated,
      error: false,
    });
  }

  async delete(req, res) {
    const {
      id,
    } = req.params;

    if (!id) {
      return res.status(400).json({
        code: 400,
        error: true,
        message: messages.requiredParamater,
      });
    }

    const response = await StudentService.delete(id);

    if (response.error) {
      return res.status(400).json({
        code: 400,
        error: true,
        message: response.message,
      });
    }

    return res.status(202).json({
      code: 202,
      message: messages.sucessDeleted,
      error: false,
    });
  }
}

export default new StudentController();
