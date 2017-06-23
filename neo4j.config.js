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
            default: 3030
        },
        'n': {
            alias: "neo4j",
            describe: "Use local or remote neo4j_models instance",
            demand: false,
            default: "local"
        }
    })
    .defaults({
        'USERNAME': 'ioc_neoj4',
        'PASSWORD' : 'moleskine',
        'neo4j': 'local',
        'neo4j-local': 'bolt://localhost:7687',
        'neo4j-remote': 'bolt:http://162.243.100.222:7474',
        'base_url': 'http://localhost:3030',
        'api_path': '/api/v0'
    });

module.exports = nconf;