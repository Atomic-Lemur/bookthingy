import config from './config/index';
import express from 'express';
import bodyParser from 'body-parser';
import connectToDb from './db/connect';
import book_router from './routes/book.routes';
import api_router from './routes/api.routes';
import engines from 'consolidate';

let app = express();
app.engine('hbs', engines.handlebars);

app.set('views', './public/views');
app.set('view engine', 'hbs');

connectToDb();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/', book_router);
app.use('/api', api_router);
app.use("/css", express.static(__dirname + '/css'));
app.use("/js", express.static(__dirname + '/js'));

app.get("*", (req, res) => {
    res.send("Error: No such page!");
});

app.listen(config.server_port, () => {
    console.log(`server started on port ${config.server_port}`);
});
