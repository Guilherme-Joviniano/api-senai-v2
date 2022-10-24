import multer from 'multer';
import config from '../../configs/multer';

const uploader = multer(config).single('profile_picture');

export default (req, res, next) => uploader(req, res, async (err) => {
  if (err) {
    return res.status(400).json({
      code: 400,
      error: true,
      message: err.code,
    });
  }
  return next();
});
