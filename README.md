This is a project to create a 'to do list'

## Technologies used
 - React and Redux 
 - Redux Saga for calls to backend
 - Nodejs with express at the backend
 - Nedb as the backend databadse
 - Docker
 - React-Bootstrap and bootstrap.css for styling
 - SASS as css preprocessor

## How to start the project
Please clone the project from github. To run the app type
* docker-compose -f docker-compose-local.yml build 
* docker-compose -f docker-compose-local.yml up
 
 This will bring up two containers 
 * client running at port 3000 and 
 * server running at port 5000

 Please make sure that nothing on your system is running on these ports.

## How to test the app
* Please enter a non empty string ( any todo item , eg. 'walking') in the input box. Click on 'Add To do Item' button or press 'Enter'
* The new 'todo' item will get added to the todo list
* If you want to mark it as complete, click on the item or on the check mark, the item will be crossed out and color chnages to green. This means that the item is 'done'. If you click on the item again the color will change bsck to black and the linethrough will disppaear. That means the item is 'undone'. Clicking on the item will toggle the item's state from 'done' to 'undone'
* If you click on the 'trash button' to the right of each item, the item will disappear

## Unit testing and coverage
I have added unit tests here 'client/src/reducers/todoListReducer.spec.js'. I am using 'jest' to run the test and get coverage. I have 100% coverage for that file.
To run the test please type: 'npm run test'
To get the coverage, please type: 'npm run coverage'

## Improvements

Features I couldn't complete but can be added

* Add error handling on the UI side and also on node side
* Finish all unit testing
* When the list loads, show the 'done' items at the top
* Ability to select all the items together for completion or deletion
* User login
