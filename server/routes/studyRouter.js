import express from 'express';
import { generateStudyMaterials } from '../controllers/studyController.js';
import { generateChatting } from '../controllers/chatControllers.js';

const studyRouter = express.Router();

studyRouter.post('/', generateStudyMaterials);
studyRouter.post('/chat', generateChatting);


export default studyRouter;