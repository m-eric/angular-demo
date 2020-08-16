# Angular Demo

Example Angular SPA with authorization and user management. 

I opted to take the classic service based data management route. Might refactor to NgRx later.

Contains mocked Json Server for demonstration purposes, with two notable differences from real API:
- There is only one hard coded auth user:  
   **login:** test@test.com  
   **pass:** test
   
- passwords in users table are stored as strings (goes without saying that passwords are hashed in real API)

## Install

Make sure you have Angular 9 installed.

Download or clone this repo, then:

`npm install`

Run in development mode with ng serve and json server running concurrently:

`npm run start:mock`

Angular app will run on standard localhot:4200, while json server will run on localhost:8000

## Licence
MIT
