import {
  Router,
} from 'express';

import PictureController from '../controllers/PictureController';

const router = Router();

router.post('/:id', PictureController.store);

export default router;
