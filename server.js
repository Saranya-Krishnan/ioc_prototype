require('dotenv').config();
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
        title: 'Ioc Prototype',
        version: '1.0.0',
        description: '',
    },
    host: process.env.BASE_URL,
    basePath: '/',
};

// options for the swagger docs
const options = {
    swaggerDefinition: swaggerDefinition,
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
api.get(apiPath+'/users/me', routes.users.me);

api.post(apiPath+'/images/create', routes.images.create);
// api.post(apiPath+'/images/update', routes.images.update);
// api.post(apiPath+'/images/delete', routes.images.deletion);
// api.post(apiPath+'/images/classify', routes.images.classify);
// api.post(apiPath+'/images/locate', routes.images.locate);
//
// api.post(apiPath+'/notebooks/create', routes.notebooks.create);
// api.post(apiPath+'/notebooks/update', routes.notebooks.update);
// api.post(apiPath+'/notebooks/delete', routes.notebooks.deletion);
//
// api.post(apiPath+'/pages/create', routes.pages.create);
// api.post(apiPath+'/pages/update', routes.pages.update);
// api.post(apiPath+'/pages/delete', routes.pages.deletion);
//
// api.post(apiPath+'/works/create', routes.works.create);
// api.post(apiPath+'/works/update', routes.works.update);
// api.post(apiPath+'/works/delete', routes.works.deletion);
//
// api.post(apiPath+'/locations/create', routes.locations.create);
// api.post(apiPath+'/locations/update', routes.locations.update);
// api.post(apiPath+'/locations/delete', routes.locations.deletion);
//
// api.post(apiPath+'/tags/create', routes.tags.create);
// api.post(apiPath+'/tags/update', routes.tags.update);
// api.post(apiPath+'/tags/delete', routes.tags.deletion);
//
// api.post(apiPath+'/journeys/create', routes.journeys.create);
// api.post(apiPath+'/journeys/update', routes.journeys.update);
// api.post(apiPath+'/journeys/delete', routes.journeys.deletion);
//
// api.post(apiPath+'/suggestions/create', routes.suggestions.create);
// api.post(apiPath+'/suggestions/update', routes.suggestions.update);
// api.post(apiPath+'/suggestions/delete', routes.suggestions.deletion);
//
// api.post(apiPath+'/quests/create', routes.quests.create);
// api.post(apiPath+'/quests/update', routes.quests.update);
// api.post(apiPath+'/quests/delete', routes.quests.deletion);


//api.get(apiPath+'classify', function(req, res){
    //'https://gateway-a.watsonplatform.net/visual-recognition/api/v3'

    //    response = watson_connect.get 'classify', {:api_key => ENV['WATSON_KEY'], :url => ao.url, :version => '2016-05-20', :classifier_ids =>'default,moleskine_71136762'}

//});


app.listen(3000, function () {
    console.log('Ioc Express Server started');
});

api.listen(3030, function () {
    console.log('Neo4j server started');
});
