require('dotenv').config();
const PathHelper = require('./views/src/helpers/path-helper');
import express from 'express';
const request = require('request');
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

let app = express();
let api = express();


const swaggerDefinition = {
    info: {
        title: 'Ioc Prototype',
        version: '0.0.1',
        description: 'MSK AI assisted creativity enhancer.',
    },
    host: PathHelper.clientPath,
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
app.use(bodyParser.urlencoded({ extended: true }));
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
// ***************************
// * Users
// ***************************
api.post('/api/'+process.env.API_VERSION+'/register', routes.users.register);
api.post('/api/'+process.env.API_VERSION+'/login', routes.users.login);
api.get('/api/'+process.env.API_VERSION+'/users/me', routes.users.me);
api.post('/api/'+process.env.API_VERSION+'/users/update', routes.users.update);
api.post('/api/'+process.env.API_VERSION+'/users/delete', routes.users.deletion);

// ***************************
// * Images
// ***************************
api.post('/api/'+process.env.API_VERSION+'/images/create', routes.images.create);
api.post('/api/'+process.env.API_VERSION+'/images/classify', routes.images.classify);

//ToDo: Make Classifers db object to add dynamically

api.post('/api/'+process.env.API_VERSION+'/watson/visual-recognition', function(req,res){
    request.get(process.env.WATSON_URL+'?api_key='+ process.env.WATSON_API_KEY+'&url='+req.body.url+'&owners=me&classifier_ids=default,moleskine_71136762&version=2016-05-20', function(err, r){
        res.send(r.body);
    })
});
api.post('/api/'+process.env.API_VERSION+'/images/update', routes.images.update);
api.post('/api/'+process.env.API_VERSION+'/images/delete', routes.images.deletion);
api.post('/api/'+process.env.API_VERSION+'/images/locate', routes.images.locate);
// ***************************
// * Notebooks
// ***************************
api.post('/api/'+process.env.API_VERSION+'/notebooks/create', routes.notebooks.create);
api.post('/api/'+process.env.API_VERSION+'/notebooks/update', routes.notebooks.update);
api.post('/api/'+process.env.API_VERSION+'/notebooks/delete', routes.notebooks.deletion);
// ***************************
// * Pages
// ***************************
api.post('/api/'+process.env.API_VERSION+'/pages/create', routes.pages.create);
api.post('/api/'+process.env.API_VERSION+'/pages/update', routes.pages.update);
api.post('/api/'+process.env.API_VERSION+'/pages/delete', routes.pages.deletion);
// ***************************
// * Works
// ***************************
api.post('/api/'+process.env.API_VERSION+'/works/create', routes.works.create);
api.post('/api/'+process.env.API_VERSION+'/works/update', routes.works.update);
api.post('/api/'+process.env.API_VERSION+'/works/delete', routes.works.deletion);
// ***************************
// * Locations
// ***************************
api.post('/api/'+process.env.API_VERSION+'/locations/create', routes.locations.create);
api.post('/api/'+process.env.API_VERSION+'/locations/update', routes.locations.update);
api.post('/api/'+process.env.API_VERSION+'/locations/delete', routes.locations.deletion);
// ***************************
// * Tags
// ***************************
api.post('/api/'+process.env.API_VERSION+'/tags/create', routes.tags.create);
api.post('/api/'+process.env.API_VERSION+'/tags/update', routes.tags.update);
api.post('/api/'+process.env.API_VERSION+'/tags/delete', routes.tags.deletion);
api.post('/api/'+process.env.API_VERSION+'/tags/enrich', routes.tags.enrich);
api.post('/api/'+process.env.API_VERSION+'/tags/tag-content', routes.tags.tagItem);
api.post('/api/'+process.env.API_VERSION+'/tags/create/ontology', function(req,res){
    let options = {
        url: 'http://lookup.dbpedia.org/api/search/KeywordSearch?QueryString='+req.body.word,
        headers: {
            'Accept': 'application/json'
        }
    };
    function cb(error, response, body){
        if (!error && response.statusCode === 200) {
            let data = {
                word: req.body.word,
                info: body
            };
            res.send(data);
        }else{
            console.log('error enriching '+req.body.word)
        }
    }
    request(options, cb);
});
// ***************************
// * Journeys
// ***************************
api.post('/api/'+process.env.API_VERSION+'/journeys/create', routes.journeys.create);
api.post('/api/'+process.env.API_VERSION+'/journeys/update', routes.journeys.update);
api.post('/api/'+process.env.API_VERSION+'/journeys/delete', routes.journeys.deletion);
// ***************************
// * Suggestions
// ***************************
api.post('/api/'+process.env.API_VERSION+'/suggestions/create', routes.suggestions.create);
api.post('/api/'+process.env.API_VERSION+'/suggestions/update', routes.suggestions.update);
api.post('/api/'+process.env.API_VERSION+'/suggestions/delete', routes.suggestions.deletion);
// ***************************
// * Quests
// ***************************
api.post('/api/'+process.env.API_VERSION+'/quests/create', routes.quests.create);
api.post('/api/'+process.env.API_VERSION+'/quests/update', routes.quests.update);
api.post('/api/'+process.env.API_VERSION+'/quests/delete', routes.quests.deletion);


app.listen(process.env.CLIENT_PORT, function () {
    console.log('Ioc Express Server started on '+process.env.CLIENT_PORT);
});

api.listen(process.env.API_PORT, function () {
    console.log('Neo4j server started on '+process.env.API_PORT);
});
