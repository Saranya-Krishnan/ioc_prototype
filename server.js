import express from 'express';
const path = require('path');
import router from './routes/index';
import nconf from './neo4j.config';
import methodOverride from 'method-override';
import swaggerJSDoc from 'swagger-jsdoc';
import bodyParser from 'body-parser';
import setAuthUser from './middlewares/setAuthUser';
import neo4jSessionCleanup from './middlewares/neo4jSessionCleanup';
import writeError from './helpers/response';
const routes = require('./routes/api');
const apiPath = nconf.get('api_path');

let app = express();
let api = express();


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

app.get('/swagger.json', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});
app.use('/docs', express.static(path.join(__dirname, 'swaggerui')));
api.set('port', nconf.get('PORT'));


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

api.use(setAuthUser);
api.use(neo4jSessionCleanup);

api.post(apiPath+'/register', routes.users.register);
api.post(apiPath+'/login', routes.users.login);
api.get( apiPath+'/users/me', routes.users.me);

app.listen(3000, function () {
    console.log('Ioc Express Server started');
});

api.listen(3030, function () {
    console.log('Neo4j server started');
});