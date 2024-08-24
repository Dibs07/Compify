import express from 'express';
import { generateStudyMaterials } from '../controller/study.controller';

const studyRouter = express.Router();

studyRouter.post('/', generateStudyMaterials);


export default studyRouter;