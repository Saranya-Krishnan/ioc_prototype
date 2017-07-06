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
        'USERNAME': process.env.GRAPHENEDB_BOLT_USER,
        'PASSWORD' : process.env.GRAPHENEDB_BOLT_PASSWORD,
        'neo4j': 'remote',
        'neo4j-local': 'bolt://localhost:7687',
        'neo4j-remote': process.env.GRAPHENEDB_BOLT_URL,
        'base_url': PathHelper.apiPath,
        'api_path': '/api/'+ process.env.API_VERSION
    });

module.exports = nconf;