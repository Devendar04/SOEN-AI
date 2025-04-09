import { Router } from 'express';
import * as templateController from '../controllers/template.controller.js';
const router = Router();



router.post('/template', templateController.getTempalte);



export default router;