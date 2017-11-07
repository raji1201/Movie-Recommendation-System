# Movie Recommendation System

Instructions to run project
1. Open terminal and run npm install
2. Run ng build --w
3. Open another terminal and run node server.js
4. Download elasticsearch and extract the files
5. Look for elasticsearch.yml file in the elasticsearch folder and include the following 3 lines at the end of the file :
		http.cors:
		  enabled: true
		  allow-origin: /http?:\/\/localhost(:[0-9]+)?/
6. Run node load_movies.js from the Movie-Recommendation-System folder
7. Goto the bin folder in elasticsearch and double click the elasticsearch.bat file
8. On your browser open localhost:3000

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run node server.js & elasticsearch.bat.

Run `ng e2e --no-serve -port 3000` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Running backend tests

Run 'npm test' to execute the backend tests via Mocha.