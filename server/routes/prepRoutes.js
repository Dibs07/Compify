import express from 'express';
import { generateChapters, generateExams, generateExplanation, generateQuestions, generateSubjects, generateTopics } from '../controllers/prepControllers.js';

const prepRouter = express.Router();

prepRouter.post('/', generateExams);
prepRouter.post('/subjects', generateSubjects);
prepRouter.post('/chapters', generateChapters);
prepRouter.post('/topics', generateTopics);
prepRouter.post('/questions', generateQuestions);
prepRouter.post('/answers', generateExplanation);


export default prepRouter;