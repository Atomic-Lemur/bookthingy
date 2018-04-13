import { Router } from 'express';
import APIController from '../controllers/api.controller';
const api_router = new Router();

api_router.get('/', (req, res)             => APIController.getAll(req, res));
//api_router.get('/export', (req, res)       => APIController.exportChapter(req, res));
api_router.get('/:cuid', (req, res)        => APIController.getChapter(req, res));
api_router.get('/export/:cuid', (req, res) => APIController.exportChapter(req, res));
api_router.post('/', (req, res)            => APIController.addChapter(req, res));
api_router.put('/:cuid', (req, res)        => APIController.updateChapter(req, res));
api_router.delete('/:cuid', (req, res)     => APIController.deleteChapter(req, res));

export default api_router;
