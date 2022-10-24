import multer from 'multer';
import messages from '../configs/messages';
import config from '../configs/multer';
import StudentService from '../services/StudentService';

const uploader = multer(config).single('profile_picture');

class PictureController {
  async store(req, res) {
    try {
      return uploader(req, res, async (err) => {
        if (err) {
          return res.status(400).json({
            code: 400,
            error: true,
            message: err.code,
          });
        }

        try {
          const {
            filename,
          } = req.file;
          const {
            id,
          } = req.params;

          const url = `http://localhost:3333/uploads/${filename}`;

          // update student picture
          const response = await StudentService.update({
            foto: url,
          }, id);

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
      });
    } catch (e) {
      return res.status(400).json({
        errors: e,
      });
    }
  }
}

export default new PictureController();
