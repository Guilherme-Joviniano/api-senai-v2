import {
  Router,
} from 'express';

// controller
import PictureController from '../controllers/PictureController';
// middlewares
import profilePicture from '../middlewares/uploads/profilePicture';

const router = Router();

router.post('/:id', profilePicture, PictureController.store);

export default router;
