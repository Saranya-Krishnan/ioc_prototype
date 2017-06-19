import express from 'express';
let path = require('path');
import router from './routes/index';
import nconf from './neo4j.config';
import methodOverride from 'method-override';
import swaggerJSDoc from 'swagger-jsdoc';
import bodyParser from 'body-parser';
//import setAuthUser from './middlewares/setAuthUser';
//import neo4jSessionCleanup from './middlewares/neo4jSessionCleanup';
import writeError from './helpers/response';

let app = express();
let api = express();

app.use(nconf.get('api_path'), api);

const swaggerDefinition = {
    info: {
        title: 'Neo4j Movie Demo API (Node/Express)',
        version: '1.0.0',
        description: '',
    },
    host: 'localhost:3000',
    basePath: '/',
};

// options for the swagger docs
const options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

api.get('/swagger.json', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});
app.use('/docs', express.static(path.join(__dirname, 'swaggerui')));
app.set('port', nconf.get('PORT'));


app.use('/bin', express.static('./bin'));
app.use('/', router);
app.use('/view/*', router);

api.use(bodyParser.json());
api.use(methodOverride());

//enable CORS
api.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

//api error handler
api.use(function(err, req, res, next) {
    if(err && err.status) {
        writeError(res, err);
    }
    else next(err);
});

//api.use(setAuthUser);
//api.use(neo4jSessionCleanup);

app.listen(3000, function () {
    console.log('Ioc Express Server started');
});