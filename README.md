# smartU API

This is the API that serves the Financial Instrument web application "smartU"
<br />
<br />


# Table of Contents

- [Getting Started](#Getting-Started "Goto Getting-Started")
- [Technology Stack](#Technology-Stack "Goto Technology-Stack")
- [Installation](#Installation "Goto Installation")
- [Features](#Features "Goto Features")
- [Testing](#Testing "Goto Testing")
- [Questions](#Questions "Goto Questions")
- [Support or Contributions](#Support-or-Contributions "Support-or-Contributions")

## Getting Started

This is a frontend javascript application built with [React JS](https://reactjs.org/).

## Technology Stack

NodeJS, Express

## Installation

1. Install Node JS on your machine.

2. Clone the repository [here](https://github.com/jaesea17/smartu_api).

3. Change directory into the root of the project directory.

4. Run `npm install` on the terminal to install project dependecies.

5. Start the application: Different Build Environments.

## Features

You can carry out the following with the api
- Signup a user <br>
- Signin a user <br>
- Signout a user <br>
- Create Entries <br>
- Retrieve Entries <br>
- Update Entries <br>
- Delete Entries <br>


#### Customer registration

- To `signup` send `post` request containing `first name`, `last name`, `email` and `password` to `https://smartu-api.herokuapp.com/user/signUp` <br>
- To `signin` send `post` request containing `email` and `password` to `https://smartu-api.herokuapp.com/user/signIn`


### Development

run `node index.js` in terminal 
or install nodemon to enable automatic resart on each save;`npm install nodemon`
then run `nodemon index` to run the project

## Questions

For more details contact  `oforkajajoseph@gmail.com`

## Support or Contributions

Support or Contributions are highly appreciated. Please send me an email for any suggestion, support or issue. To contribute:

1. Fork this repository or clone the repository with the command
   `$ git clone https://github.com/jaesea17/smartu_api`.

2. Change directory into the root of the project directory.

3. Create your feature branch and make your contributions to your local copy of the project.

4. Raise a pull request against the develop branch describing what your feature does and how it can be tested.
