import express from 'express';
import { generateStudyMaterials } from '../controllers/studyController.js';

const studyRouter = express.Router();

studyRouter.post('/', generateStudyMaterials);


export default studyRouter;