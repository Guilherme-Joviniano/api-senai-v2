import messages from '../configs/messages';
import StudentAdapter from '../adapters/StudentAdapter';

class PictureController {
  async store(req, res) {
    try {
      const { filename } = req.file;

      const { id } = req.params;

      const url = `http://localhost:3333/v1/uploads/${filename}`;

      // update student picture
      const response = await StudentAdapter.update(
        {
          foto: url,
        },
        id,
      );

      if (!response) {
        return res.status(400).json({
          code: 400,
          error: true,
          message: messages.NOT_FOUNDED,
        });
      }

      return res.status(201).json({
        code: 201,
        error: false,
        payload: messages.SUCESS_UPDATED,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e,
      });
    }
  }
}

export default new PictureController();
