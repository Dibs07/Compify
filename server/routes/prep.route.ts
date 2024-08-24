import express from 'express';
import {
    generateChapters,
    generateExams,
    generateExplanation,
    generateQuestions,
    generateSubjects,
    generateTopics
} from '../controller/prerp.controller';
import { isAuthenticated } from '../middleware/verify-user';

const prepRouter = express.Router();

prepRouter.post('/', isAuthenticated, generateExams);
prepRouter.post('/subjects', isAuthenticated, generateSubjects);
prepRouter.post('/chapters', isAuthenticated, generateChapters);
prepRouter.post('/topics', isAuthenticated, generateTopics);
prepRouter.post('/questions', isAuthenticated, generateQuestions);
prepRouter.post('/answers', isAuthenticated, generateExplanation);


export default prepRouter;