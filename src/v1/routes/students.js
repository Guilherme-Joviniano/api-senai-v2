import {
  Router,
} from 'express';

// controller
import StudentController from '../controllers/StudentController';

// middlewares
import {
  isJson,
  hasBody,
  validateUpdateStudentQueries,
} from '../middlewares';

const router = Router();

router.get('/', StudentController.index);
router.get('/:id', StudentController.show);
router.post('/course/', StudentController.addCourse);
router.get('/course/:id', StudentController.showCourses);

router.post('/', isJson, hasBody, StudentController.store);
router.put('/:id/', validateUpdateStudentQueries, StudentController.update);
router.delete('/:id', StudentController.delete);

export default router;
