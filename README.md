# DVDLibrary

A browser based user-interface for an existing web service that allows user to create, read, update, and delete DVD.

Project Web Service - http://dvd-library.us-east-1.elasticbeanstalk.com

REST Endpoints:

"/dvd/{id}" - GET : Returns a specific DVD.

"/dvds" - GET : Returns a list of all DVDs.

"/dvds/title/{title}" - GET : Returns a list of DVDs that have a matching title.

"/dvds/year/{releaseYear}" - GET : Returns a list of DVDs that have a matching release year. 

"/dvds/director/{directorName}" - GET : Returns a list of DVDs that have a matching director name. 

"/dvds/rating/{rating}" - GET : Returns a list of DVDs that have a matching rating.

"/dvd" - POST : Send a JSON with the representation of a DVD. Returns a newly created DVD with it's ID.

"/dvd/{id}" - PUT : Send a JSON with the representation of a DVD. It will edit the DVD fields of the DVD with the given ID. 

"/dvd/{id}" - DELETE : Deletes the DVD with the given ID.


