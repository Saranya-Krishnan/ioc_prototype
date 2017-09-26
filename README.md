[![Build Status](https://travis-ci.org/doodlegabe/ioc_prototype.svg?branch=master)](https://travis-ci.org/doodlegabe/ioc_prototype)

# Internet of Creativity Concept App

This application will outline some of the capabilities of a the actual application.

## Installation

1. Follow the directions Neo4j installation for your given platform: https://neo4j.com/docs/operations-manual/current/installation/
2. Get a copy of the `.env` file and place it in the root of the cloned git directory.
3. Then run `npm install` within the cloned git directory
4. Now run `webpack` from within the cloned directory.
5. Launch the Neo4j desktop app and then create a `Neo4j` directory in `Sites` or wherever you work locally.
6. Change the Database Location in the Neo4j Desktop app to this new `Neo4j` directory.
7. Start Neo4j at `locahost:7474` or use the `neo4j.config.js` to point toward your desired port.
8. From inside the Neo4j GUI run `:server connect` with the default credentials of username `neo4j', password: `neo4j`.
9. Follow the instructions to reset the password to match the one in your `.env` file's `GRAPHENEDB_BOLT_PASSWORD` variable.
10. Run `nodemon start`
11. And in another terminal keep `webpack --watch` up while developing.
