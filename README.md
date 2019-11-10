hCard Builder
=================
A simple React application for generating a hCard preview which adheres to the [hCard microformat](http://microformats.org/wiki/hcard)

#### Project philosophy

Given the task of creating a hCard Builder that conforms to the specification and promotes re-usability and semantically 
correct markup, this project was designed to fulfill that.

The user was required to be able to input their personal details into a form and upload an avatar, and have that be 
reflected in the preview. Both the form and preview appearance was based off a provided screen.

A second iteration was performed to reduce code bloat, remove unnecessary complexity and clean up component responsibilities.

Additionally, criteria was established to help determine whether or not a component was needed:
1. Is there any repeated markup that could be wrapped up?
2. Is there any logic that can be encapsulated?
3. Is there a need for further separation of concern or de-coupling?

If yes was answered to any of the above questions, it must then be decided:
1. Will this improve or hinder readability?
2. Will this improve or hinder maintainability?
3. Will this improve or hinder re-usability?

With that criteria in mind, the following components were created:

##### HCard
Presentational component for displaying the hCard preview. Accepts a HCardDetails object who's properties are then bound to the HTML.

##### HCard Detail
Presentational component used to wrap up the HTML of each hCard preview detail section. It supports specifying
the label of the section and also how many columns the row that the component is on within the hCard should have. Acting 
as a wrapper for details, it requires child content to additionally be specified.

##### HCard Property
While effectively presentational, this components goal is to manage a requirement of the hCard specification in that each
hCard property should exist as a class on the immediate parent of the hCard property value. It accepts a `name` and a `value`
property. The name is applied as a class while the value becomes the visible text. In addition, an `abbreviation` property
is also supported. If supplied becomes the visible text, with the `value` becoming the title.

Due to the nature of specific hCard properties requiring nested properties, the component similarly accepts children.

Finally, the component allows the specification of the property elements HTML tag through the `as` property. By default this is
set to `<span></span>`

##### HCard Builder
The main container component of the application. This houses the pages title and interactive form elements and supplies
a clean event handling API on top of the native hCard form event handlers. This API consists of three event handlers, each translating the 
underlying event's raw data into data that's directly consumable. These events are:
* `onFieldUpdate`
  * Fires when any form field had been modified, supplies the updated value and field id
* `onAvatarSelected` 
  * Fires when a file is selected using the upload avatar button, supplies the selected file path.
* `onFormSubmission`
  * Fires when the form is submitted. Unlike the other event handlers, no extra translation is applied to the event data
  and remains as the native `submit` data object. 

##### Button 
Simple wrapper for a button-like element which provides options for styling in different colours. The buttons element
HTML tag can be specified via the `as` property, defaults to `<button />`

##### File Upload
Wrapper for the native file input element which provides the ability to customise the file selection button through
supplying as a child element. Supports a `labelClass` attribute for styling the label element and a
`onFileSelection` function which fires once a file has been selected.

##### Form Section
Presentational component representing a section of a form. Supports a `title` property and as a wrapper also requires
child content to be specified.

##### Form Field
Container component that acts as a wrapper for the creation of a label and it's associated input field. 

Supports container specific properties of `label` and `fieldId`. `label` simply populates the associated input label while `fieldId`
is used to tie the label and input elements together through the `for` attribute of the label and the `id` attribute of the
input field. 

The component also supports input applied properties of `type`, which maps directly to the native type attribute,
and `onFieldChange` which maps to directly to the React `onChange` attribute. 

As a convenience, the component has been designed to support a shorthand form, whilst also allowing further input control 
through a nested form:
* Shorthand
  * Allows the creation of the component without the need to specify an input as content. Useful for when only requiring
  `onFieldChange` and `type` properties.
  ```
  <FormField formId="anId" type="email" label="Email" onFieldChange="updateFormData()" />
  ```
* Nested
  * Similar to the shorthand form but requires the specification of an input as child content. Useful when needing finer 
  control of the attributes on the input element. Disregards `type` and `onFieldChange` properties if specified using this form.
  ```
  <FormField formId="anId" label="Email">
    <input type="text" onChange="updateFormData()" type="number" pattern="\d*" />
  </FormField>
  ```
Finally, the component also allows the specification of the root element's HTML tag through the `as` property. Currently has a 
restriction on possible values of `div`, `li` and `p` to enforce HTML conventions, but can easily be expanded.
```
# JSX
<FormField formId="anId" as="li" label="Test" />

# Output
<li class="form__field">
    <label class="form__label" for="anId">Test</label>
    <input id="anId" type="text" />
<li>
```

## Usage
First install the required NPM modules with either [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
```
# via npm
npm install

# via yarn
yarn install
```

### Development
To spin up the development server, run the following

#### `yarn start`

The application has been configured to run at http://localhost:3000
 
### Production
 
Building for production will minify the appropriate project files and combine them into one. To do so,
run the following:
 
#### `yarn build-prod` 
This is going to output the compiled files into the build directory off the root directory.

Once complete, open up the `build/index.html` file within the build directory in Chrome to view the built application.

## Available Scripts

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### `yarn test`

Launches the test runner.

#### `yarn build-dev`

Builds the app for development to the `build` folder.

#### `yarn build-prod`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
