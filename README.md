Mike Luz
June 5, 2017
Candidate for JavaScript Engineer at Moat/Oracle

* App that finds the distance between two Airports and plots the route on a Google map *

Instructions for setup:

1. To run app: 
	-- be sure PostgreSQL server is running (I used PostgreSQL 9.6)
	-- navigate to this directory in CLI
	-- 'npm install' to install dependencies
	-- 'npm run seed' to create and seed the database
	-- in a duplicate tab, 'npm run build-watch' to run webpack build
	-- go back to other tab, 'npm start' (app is set to run in browser on port 3001, localhost:3001)

2. To run tests:
	-- navigate to this directory from the command line
	-- 'npm test'

NOTES:
-- During the making of this app, I had to make changes to an npm module I was using, namely "react-predictive-input"
-- I've included this module in the project so as to retain the changes while I work on submitting a pull request to the maker of the module -- this is why the "node_modules" folder exists (no other modules should be in there)