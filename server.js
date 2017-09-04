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
const scheduler = require('node-schedule');
const favicon = require('serve-favicon');
const conversation = require('watson-developer-cloud/conversation/v1');

let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);


let api = express();
let apiServer = require('http').Server(api);
let ioApi = require('socket.io')(apiServer);

app.use(favicon('favicons/favicon.ico'));

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
api.post('/api/'+process.env.API_VERSION+'/users/update-current-notebook', routes.users.updateCurrentNotebook);
api.post('/api/'+process.env.API_VERSION+'/users/get-current-notebook', routes.users.getCurrentNotebook);


// ***************************
// * Images
// ***************************
api.post('/api/'+process.env.API_VERSION+'/images/create', routes.images.create);
api.post('/api/'+process.env.API_VERSION+'/images/classify', routes.images.classify);


api.post('/api/'+process.env.API_VERSION+'/watson/visual-recognition', function(req,res){
    request.get(process.env.WATSON_RECOGNITION_URL+'?api_key='+ process.env.WATSON_RECOGNITION_API_KEY+'&url='+req.body.url+'&owners=me&classifier_ids=default&version=2016-05-20', function(err, r){
        res.send(r.body);
    })
});
api.post('/api/'+process.env.API_VERSION+'/images/update', routes.images.update);
api.post('/api/'+process.env.API_VERSION+'/images/delete', routes.images.deletion);
api.post('/api/'+process.env.API_VERSION+'/images/locate', routes.images.locate);
api.post('/api/'+process.env.API_VERSION+'/images/get-tags', routes.images.getTags);
// ***************************
// * Notebooks
// ***************************
api.post('/api/'+process.env.API_VERSION+'/notebooks/create', routes.notebooks.create);
api.post('/api/'+process.env.API_VERSION+'/notebooks/update', routes.notebooks.update);
api.post('/api/'+process.env.API_VERSION+'/notebooks/delete', routes.notebooks.deletion);
api.post('/api/'+process.env.API_VERSION+'/notebooks/mine', routes.notebooks.mine);
api.post('/api/'+process.env.API_VERSION+'/notebooks/artwork-in-notebook', routes.notebooks.artworkInNotebook);
api.post('/api/'+process.env.API_VERSION+'/notebooks/display', routes.notebooks.display);


// ***************************
// * Pages
// ***************************
api.post('/api/'+process.env.API_VERSION+'/pages/create', routes.pages.create);
api.post('/api/'+process.env.API_VERSION+'/pages/update', routes.pages.update);
api.post('/api/'+process.env.API_VERSION+'/pages/delete', routes.pages.deletion);
api.post('/api/'+process.env.API_VERSION+'/pages/in-notebook', routes.pages.inNotebook);

// ***************************
// * Works
// ***************************
api.post('/api/'+process.env.API_VERSION+'/works/create', routes.works.create);
api.post('/api/'+process.env.API_VERSION+'/works/update', routes.works.update);
api.post('/api/'+process.env.API_VERSION+'/works/delete', routes.works.deletion);
api.post('/api/'+process.env.API_VERSION+'/works/display', routes.works.display);
api.post('/api/'+process.env.API_VERSION+'/works/my-work', routes.works.mine);
api.post('/api/'+process.env.API_VERSION+'/works/get-all', routes.works.getAll);

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
api.post('/api/'+process.env.API_VERSION+'/tags/create-from-image', routes.tags.createFromImage);
api.post('/api/'+process.env.API_VERSION+'/tags/update', routes.tags.update);
api.post('/api/'+process.env.API_VERSION+'/tags/delete', routes.tags.deletion);
api.post('/api/'+process.env.API_VERSION+'/tags/enrich', routes.tags.enrich);
api.post('/api/'+process.env.API_VERSION+'/tags/tag-content', routes.tags.tagItem);
api.post('/api/'+process.env.API_VERSION+'/tags/ontology', function(req,res){
    const word = req.body.body.word;
    const id = req.body.body.id;
    let options = {
        url: 'http://lookup.dbpedia.org/api/search/KeywordSearch?QueryString='+ word,
        headers: {
            'Accept': 'application/json'
        }
    };
    function cb(error, response, body){
        if (!error && response.statusCode === 200) {
            let data = {
                word: word,
                id: id,
                info: body
            };
            res.send(data);
        }else{
            console.log('error getting ontology for '+word)
        }
    }
    request(options, cb);
});
// ***************************
// * Schemata
// ***************************
api.post('/api/'+process.env.API_VERSION+'/schemata/bind-tag', routes.schemata.bindTag);
api.post('/api/'+process.env.API_VERSION+'/schemata/bind-meaning', routes.schemata.bindMeaning);
api.post('/api/'+process.env.API_VERSION+'/schemata/create', routes.schemata.create);
api.post('/api/'+process.env.API_VERSION+'/schemata/update', routes.schemata.update);
api.post('/api/'+process.env.API_VERSION+'/schemata/delete', routes.schemata.deletion);
api.post('/api/'+process.env.API_VERSION+'/schemata/seed', routes.schemata.seed);
// ***************************
// * Meanings
// ***************************
api.post('/api/'+process.env.API_VERSION+'/meanings/extract-from-tag', routes.meanings.extractFromTag);
api.post('/api/'+process.env.API_VERSION+'/meanings/update', routes.meanings.update);
api.post('/api/'+process.env.API_VERSION+'/meanings/delete', routes.meanings.deletion);
api.post('/api/'+process.env.API_VERSION+'/meanings/retrieve', routes.meanings.retrieve);
// ***************************
// * Journeys
// ***************************
api.post('/api/'+process.env.API_VERSION+'/journeys/create', routes.journeys.create);
api.post('/api/'+process.env.API_VERSION+'/journeys/update', routes.journeys.update);
api.post('/api/'+process.env.API_VERSION+'/journeys/delete', routes.journeys.deletion);
// ***************************
// * Suggestions
// ***************************
api.get('/api/'+process.env.API_VERSION+'/suggestions/get-all-suggestions', routes.suggestions.getAllSuggestions);
api.post('/api/'+process.env.API_VERSION+'/suggestions/get-suggestions', routes.suggestions.getSuggestions);
api.post('/api/'+process.env.API_VERSION+'/suggestions/create', routes.suggestions.create);
api.post('/api/'+process.env.API_VERSION+'/suggestions/update', routes.suggestions.update);
api.post('/api/'+process.env.API_VERSION+'/suggestions/delete', routes.suggestions.deletion);

// ***************************
// * Quests
// ***************************
api.post('/api/'+process.env.API_VERSION+'/quests/create', routes.quests.create);
api.post('/api/'+process.env.API_VERSION+'/quests/update', routes.quests.update);
api.post('/api/'+process.env.API_VERSION+'/quests/delete', routes.quests.deletion);
api.post('/api/'+process.env.API_VERSION+'/quests/display', routes.quests.display);
api.post('/api/'+process.env.API_VERSION+'/quests/my-quests', routes.quests.mine);

// ***************************
// * Conversations
// ***************************
api.post('/api/'+process.env.API_VERSION+'/dialog', routes.dialog.begin);



server.listen(process.env.PORT || process.env.CLIENT_PORT, function () {
    console.log("IoC Express server listening on port " + this.address().port);
});

apiServer.listen(process.env.PORT || process.env.API_PORT, function () {
    console.log('Neo4j server started on '+this.address().port);
    console.log('Bolt server at '+process.env.GRAPHENEDB_BOLT_URL);
});

