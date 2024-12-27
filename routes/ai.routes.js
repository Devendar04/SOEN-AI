import { Router } from 'express';
import * as aiController from '../contoller/ai.contoller.js';
const router = Router();



router.get('/get-results', aiController.getResult);



export default router;