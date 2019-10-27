## Running the application
First run the following command from the root of the project: 

#### `yarn install` 

Once that has complete, run the production build command
 
#### `yarn build-prod` 

This is going to output the compile files into the build directory off the root directory. <br />
Once complete, open up the `build/index.html` file within the build directory in Chrome to view the built application.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner.

### `yarn build-dev`

Builds the app for development to the `build` folder.

### `yarn build-prod`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
