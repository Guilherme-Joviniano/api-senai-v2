import _ from 'underscore';
import messages from '../configs/messages';
import CursoAdapter from '../adapters/CursoAdapter';
import storeCourseRequiredValues from '../helpers/storeCourseRequiredValues';

class CourseController {
  async index(req, res) {
    const response = await CursoAdapter.index();
    if (response.length === 0) {
      return res.status(400).json({
        code: 400,
        error: true,
        message: messages.NOT_FOUNDED,
      });
    }

    return res.status(200).json({
      code: 200,
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
        message: messages.REQUIRED_PARAMETER,
      });
    }

    const response = await CursoAdapter.show(id);

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

    const intersected = _.intersection(storeCourseRequiredValues, Object.keys(form));

    const isSame = storeCourseRequiredValues.every((el) => intersected.includes(el));

    if (!isSame) {
      return res.status(400).json({
        code: 400,
        message: messages.EMPTY_BODY_VALUES,
        error: true,
      });
    }

    const response = await CursoAdapter.store(form);

    if (response.error) {
      return res.status(400).json({
        code: 400,
        error: true,
        message: response.message,
      });
    }

    return res.status(201).json({
      status: 201,
      payload: messages.SUCESS_CREATED,
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

    if (Object.keys(query).includes('sigla') && Object.values(query)[0].length > 2) {
      return res.status(400).json({
        code: 400,
        error: true,
        message: 'Incorrectly length for this Field',
      });
    }

    const response = await CursoAdapter.update(query, id);

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
    const {
      id,
    } = req.params;

    if (!id) {
      return res.status(400).json({
        code: 400,
        error: true,
        message: messages.REQUIRED_PARAMETER,
      });
    }

    const response = await CursoAdapter.delete(id);

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

export default new CourseController();
