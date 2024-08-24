import express from 'express';
import { generateStudyMaterials } from '../controller/study.controller';
import { generateChatting } from '../controller/chatControllers';

const studyRouter = express.Router();

studyRouter.post('/', generateStudyMaterials);
studyRouter.post('/chat', generateChatting);


export default studyRouter;