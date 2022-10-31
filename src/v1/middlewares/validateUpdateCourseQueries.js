import queriesModal from '../helpers/updateCourseQueries';

export default (req, res, next) => {
  const queries = req.query;

  if (!Object.entries(queries).filter(([key]) => queriesModal.includes(key))[0]) {
    return res.status(400).json({
      error: true,
      message: ['Bad Queries Values'],
    });
  }

  return next();
};
