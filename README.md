# Video Portal
This is an evaluation project application written on angularJS
Karma/Jasmine is used for testing
Gulp is used as a build tool

I went with quite simple file organization approach here because the project is small. For a bigger project I would, of course, use a more complex organization method.

To run the application you need to have gulp, node and karma installed.

Navigate to the project root directory "video-portal". Then...
1) run "gulp" - that will build all application assets and copy required files to the /build directory
2) run "node index.js" - that will start the server
3) run "karma start" - that will run unit tests

After the node server is started (by default on port 3000) you can open the app in the browser.

Implemented features include
1) user authentication (client side validation)
2) viewing videos (only one video can be played at the same time across all windows)
3) rating videos (overall rating is displayed before rating a video)
4) css animations
5) responsive UI
