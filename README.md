[![Build Status](https://travis-ci.org/doodlegabe/ioc_prototype.svg?branch=master)](https://travis-ci.org/doodlegabe/ioc_prototype)

# Internet of Creativity Concept App

This application will outline some of the capabilities of a the actual application.

## Installation

1. Follow the directions Neo4j installation for your given platform: https://neo4j.com/docs/operations-manual/current/installation/
2. Then run `npm install` within the cloned git directory
3. Start Neo4j at `locahost:7474` or use the `neo4j.config.js` to point toward your desired port.
4. Run `nodemon start`
5. And in another terminal keep `webpack --watch` up while developing.


## Prototype 1 Completion Happy Path.

1. ~A user can log in.~
5. ~A user can "bind" a notebook with a dynamically created address~
6. ~A user can upload an image from a bound notebook~
8. ~Exif info can be extracted and saved from image.~
9. ~Image can be sent to Watson~
10. ~Classification data and image creates an ArtUpload~
11. ~Classifications are converted to tags~
12. ~Tags are applied to ArtUpload~
13. ~New tags are queried using Sparql to understand ontology~
14. ~Tag Type is applied based on Ontology~
15. ~Recommendations and tasks are created for new tags based on Modality~
16. ~Recommendations are presented to the user~
19. ~An accepted recommendations are subscribed to by a user~.
