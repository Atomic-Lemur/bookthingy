import { Router } from 'express';
import ChapterController from '../controllers/chapter.controller';
const book_router = new Router();

book_router.get('/', (req, res) => {
    ChapterController.getAll(req, res);
});

book_router.get('/:cuid', (req, res) =>{
    ChapterController.getChapter(req,res);
});

book_router.post('/', (req, res) => {
    ChapterController.addChapter(req, res);
});

book_router.put('/:cuid', (req, res) => {
    ChapterController.updateChapter(req, res);
});

book_router.delete('/:cuid', (req, res) => {
    ChapterController.deleteChapter(req, res);
});

export default book_router;
