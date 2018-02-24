import Chapter from '../models/chapter';
import cuid from 'cuid';
import unified from 'unified';
import markdown from 'remark-parse';
import html from 'remark-html';

const convertToHTML = (chapterMd) => {
    if (!chapterMd) {
        return null;
    }

    let chapterHTML;
    unified()
        .use(markdown)
        .use(html)
        .process(chapterMd, (err, html) => {
            if (err) throw err;
            chapterHTML = String(html);
        });
    return chapterHTML;
}

const ApiController = {};

ApiController.getAll = async (req, res) => {
    try{
        await Chapter.find().sort('-dateAdded').exec((err, chapters) => {
            if (err) {
                res.status(500).send(err);
            }
            res.json({ chapters: chapters });
        });
    }
    catch(err){
        res.send(err);
    }
}

ApiController.getChapter = async (req, res) => {
    try{
        Chapter.findOne({ cuid: req.params.cuid }).exec((err, chapter) => {
            if (err) {
                res.status(500).send(err);
            }
            chapter.content_html = convertToHTML(chapter.content);
            res.json({ chapter: chapter });
        });
    }
    catch(err){

    }
}

ApiController.addChapter = async (req, res) => {
    try {
        if (!req.body.chapter.title) {
            res.status(403).end();
        }

        const new_chapter = new Chapter(req.body.chapter);
        new_chapter.cuid  = cuid();

        new_chapter.save((err, saved) => {
            if (err) {
                res.status(500).send(err);
            }
            res.json({ chapter: saved });
        });
    }
    catch (err) {
        console.log(err);
    }
}

ApiController.updateChapter = async (req, res) => {
    try {
        if (!req.body.chapter.title || !req.body.chapter.content) {
            res.status(403).end();
        }
        Chapter.findOne({ cuid: req.params.cuid }).exec((err, chapter) => {
            // Handle any possible database errors
            if (err) {
                res.status(500).send(err);
            } else {
                chapter.title   = req.body.chapter.title || chapter.title;
                chapter.content = req.body.chapter.content || chapter.content;
                chapter.save((err, saved) => {
                    if (err) {
                        res.status(500).send(err)
                    }
                    res.json({ chapter: saved });
                });
            }
        });
    }
    catch (err) {
        console.log(err);
    }
}

ApiController.deleteChapter = async (req, res) => {
    try {
        Chapter.findOne({ cuid: req.params.cuid }).exec((err, chapter) => {
            if (err) {
                res.status(500).send(err);
            }

            chapter.remove(() => {
                res.status(200).end();
            });
        });
    }
    catch (err) {
        console.log(err);
    }
}

export default ApiController;
