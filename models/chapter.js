import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const chapterSchema = new Schema({
    title: String,
    content: String,
    cuid: String,
    dateAdded: { type: 'Date', default: Date.now, required: true },
});

let Chapter = mongoose.model('Chapter', chapterSchema);

export default Chapter;
