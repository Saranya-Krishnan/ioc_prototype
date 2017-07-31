require('dotenv').config();
import nconf from 'nconf';

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
        'USERNAME':  process.env.GRAPHENEDB_BOLT_USER,
        'PASSWORD' : process.env.GRAPHENEDB_BOLT_PASSWORD,
        'neo4j': 'remote',
        'neo4j-local': process.env.GRAPHENEDB_BOLT_URL,
        'neo4j-remote': process.env.GRAPHENEDB_BOLT_URL,
        'base_url': process.env.BASE_URL + ':' + process.env.API_PORT || process.env.BASE_URL + ':' + process.env.PORT,
        'api_path': '/api/v0'
    });

module.exports = nconf;