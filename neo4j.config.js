require('dotenv').config();
import nconf from 'nconf';
import PathHelper from './views/src/helpers/path-helper';
nconf.env(['PORT', 'NODE_ENV'])
    .argv({
        'e': {
            alias: 'NODE_ENV',
            describe: 'Set production or development mode.',
            demand: false,
            default: 'development'
        },
        'p': {
            alias: 'PORT',
            describe: 'Port to run on.',
            demand: false,
            default: process.env.API_PORT
        },
        'n': {
            alias: "neo4j",
            describe: "Use local or remote neo4j_models instance",
            demand: false,
            default: "local"
        }
    })
    .defaults({
        'USERNAME': 'neo4j',
        'PASSWORD' : 'neo4j',
        'neo4j': 'local',
        'neo4j-local': 'bolt://localhost:7687',
        'neo4j-remote': 'bolt:http://162.243.100.222:7474',
        'base_url': 'http://localhost:3030',
        'api_path': '/api/v0'
    });

module.exports = nconf;