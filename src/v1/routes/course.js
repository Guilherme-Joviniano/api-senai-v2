import {
  Router,
} from 'express';

// controller
import CourseController from '../controllers/CourseController';

// middlewares
import {
  isJson,
  hasBody,
} from '../middlewares';
import validateUpdateCourseQueries from '../middlewares/validateUpdateCourseQueries';

const router = Router();

router.get('/', CourseController.index);
router.get('/:id', CourseController.show);
router.post('/', isJson, hasBody, CourseController.store);
router.put('/:id/', validateUpdateCourseQueries, CourseController.update);
router.delete('/:id', CourseController.delete);

export default router;
