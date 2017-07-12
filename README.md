[![Build Status](https://travis-ci.org/doodlegabe/ioc_prototype.svg?branch=master)](https://travis-ci.org/doodlegabe/ioc_prototype)

## Internet of Creativity Concept App

This application will outline some of the capabilities of a the actual application.


## Happy Path 1 from new book to task subscription.

~1. A user can log in.~
2. A user can log in using myMS
3. A user can log in using oAuth from FB and Google
4. Stub out basic buying experience
5. A user can "bind" a notebook with a dynamically created address
6. A user can upload an image from a bound notebook
7. The page information from the notebook can be detected.
~8. Exif info can be extracted and saved from image.~
~9. Image can be sent to Watson~
~10. Classification data and image creates an ArtUpload~
~11. Classifications are converted to tags~
12. Tags are applied to ArtUpload
~13. New tags are queried using Sparql to understand ontology~
14. Tag Type is applied based on Ontology
15. Recommendations and tasks are created for new tags based on Modality
16. Recommendations are presented to the user
17. Selecting a recommendation queries another set of recommendations.
18. A pinned recommendation becomes a Journey Step associated with the ArtUpload
19. An accepted recommendations are subscribed to by a user.


## Stack Tasks

~1. Express routes for main page require login.~
~2. User data is saved~
3. Binding name is generated
4. Binding name is saved
~5. User can upload to CDN~
~6. Save CDN and extracted geotag~
~7. Create ArtUpload~
~8. Query Watson Visual Recognition~
~9. Classifiers are processed to tags~
~10. Tags are queried for ontology~
11. Matching schema are assigned to Tag Types
12. Tags are applied to ArtUpload
13. Scheduled Job creates recommendations based on tags and tag types and corresponding modality.
14. Recommendations are queried against ArtUpload tags
15. Selecting an artupload chains to associated "journey", Journey step creates new recommendation
16. Accepted recommendation subscribes user to all tasks in corresponding task group
17. A user can complete a task.

