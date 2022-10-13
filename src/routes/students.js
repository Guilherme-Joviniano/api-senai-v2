import {
  Router,
} from 'express';
import StudentController from '../controllers/StudentController';
import {
  isJson,
  hasBody,
  validateUpdateStudentQueries,
} from '../middlewares';

const router = Router();

router.get('/', StudentController.index);
router.get('/:id', StudentController.show);
router.post('/', isJson, hasBody, StudentController.store);
router.put('/:id/', validateUpdateStudentQueries, StudentController.update);
router.delete('/:id', StudentController.delete);

export default router;
