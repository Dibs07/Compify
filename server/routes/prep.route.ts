import express from 'express';
import {
    generateChapters,
    generateExams,
    generateExplanation,
    generateQuestions,
    generateSubjects,
    generateTopics,
    getHistory
} from '../controller/prep.controller';
import { isAuthenticated } from '../middleware/verify-user';

const prepRouter = express.Router();

prepRouter.post('/', isAuthenticated, generateExams);
prepRouter.post('/subjects', isAuthenticated, generateSubjects);
prepRouter.post('/chapters', isAuthenticated, generateChapters);
prepRouter.post('/topics', isAuthenticated, generateTopics);
prepRouter.post('/questions', isAuthenticated, generateQuestions);
prepRouter.post('/answers', isAuthenticated, generateExplanation);
prepRouter.get('/get-prep-history', isAuthenticated, getHistory);


export default prepRouter;