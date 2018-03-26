import config from './config/index';
import express from 'express';
import bodyParser from 'body-parser';
import connectToDb from './db/connect';
//import book_router from './routes/book.routes';
import api_router from './routes/api.routes';
import engines from 'consolidate';
import path from 'path';

let app = express();
app.engine('hbs', engines.handlebars);

app.set('views', './public/views');
app.set('view engine', 'hbs');

connectToDb();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/', api_router);
app.use("/css", express.static(__dirname + '/css'));
app.use("/js", express.static(__dirname + '/js'));
app.use(express.static(path.join(__dirname, 'public')));

app.get("*", (req, res) => {
    res.status(404).send('<h2 align=center>Page Not Found!</h2>');
});

app.listen(config.server_port, () => {
    console.log(`server started on port ${config.server_port}`);
});
