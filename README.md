# MyFitness

- [MyFitness](#myfitness)
  - [Overview](#overview)
  - [Data Model](#data-model)
  - [Link to Schema](#link-to-schema)
  - [Wireframes](#wireframes)
  - [Site map](#site-map)
  - [User Stories or Use Cases](#user-stories-or-use-cases)
  - [Links to Project](#links-to-project)
    - [Backend](#backend)
    - [Frontend](#frontend)
  - [Annotations / References Used](#annotations--references-used)
    - [Tutorials](#tutorials)
    - [Troubleshooting Links](#troubleshooting-links)
    - [Documentation](#documentation)
    - [Assets](#assets)


## Overview

Whether you're a professional athlete or just starting your fitness journey, you're bound to hear about the advantages of keeping a training log. Training logs help you keep track of your progress and allow for self reflection in the future. 

However, it's not easy to keep track of all that information! MyFitness is a web app that will allow users to keep track of their workouts. Once registered and logged in, users can add, remove and update their workouts. They're also able to see all of their past workouts.

If you'd like to test out the site without creating an account, you can use the following login credentials => username: "test", password: "password"


## Data Model


The application will store Users, Logs and Entries.

* users have one log (via references)
* each log can have multiple entries (embedded)

An Example User:

```javascript
{
  username: "runneralice",
  hash: // a password hash (which includes the salt),
  log: // a reference to a Log document
}
```

An Example Log with Embedded Entries:

```javascript
{
  user: // a reference to a User object
  name: "Half Marathon Training",
  items: [], // an array of Entry documents
}
```

An Example Entry:
```javascript
{
  title: "5k Training Run",
  date: "03/15/2022",
  description: "Ran a 5k at 6 min per kilometer. Felt..." // String describing workout (essentially workout entry)
}
```


## [Link to Schema](./db.js) 


## Wireframes

/ - home page, welcome users
![home page](documentation/home.png)

/register - page for users to register (create an account)
![login/register page](documentation/register.png)

/login - page for users to login to their account
![login/register page](documentation/login.png)

/entries - page for showing all entries
![logs page](documentation/entries.png)

/create - page for creating a new entry
![create an entry page](documentation/create.png)

/entry/:id - page for modifying an entry
![modify entry page](documentation/modify.png)


## Site map

![site map](documentation/sitemap.png)


## User Stories or Use Cases

1. As non-registered user, I can register a new account with the site.
2. As a user, I can log in to the site.
3. As a user, I can see all of my entries (title, date and preview) in a single list / table format.
4. As a user, I can create a new entry (title, date, description) in a log.
5. As a user, I can modify an existing entry (including deleting the entry) in a log.
6. As a visitor to the page, I can see the home page to learn more information about the site.


## Links to Project

### Backend
* [main page for backend](./app.js)
* [page for additional routes](./routes.js)
* [passport local strategy setup](./passport_config.js)
* [login/register routes](./auth.js)

### Frontend
* [main page for frontend](./client/src/index.js)
* [folder of components](./client/src/components)
* [api for interacting with backend](./client/src/api.js)


## Annotations / References Used

### Tutorials

These are links to tutorials that were referenced for specific implementations. Code from these tutorials was referenced and potentially adapted for use in my program.

1. [Passport with MERN Stack Tutorial](https://www.youtube.com/watch?v=IUw_TgRhTBE) - Referenced tutorial to figure out how to integrate Passport within the MERN stack
    1. Passport local strategy set up [here](./passport_config.js)
    2. Implementing login route [here](./auth.js)
2. [Tutorial on the MERN Stack](https://medium.com/swlh/how-to-create-your-first-mern-mongodb-express-js-react-js-and-node-js-stack-7e8b20463e66) - Mainly referenced section 2.1 on integrating BE and FE
    1. Code for api routes [here](./client/src/api.js)
3. [Setting up react-router](https://reactrouter.com/docs/en/v6/getting-started/tutorial) - Mainly referenced to set up [index.js](./client/src/index.js)
4. [Deploying using Heroku and MongoDB Atlas Tutorial with a MERN stack](https://coursework.vschool.io/deploying-mern-app-to-heroku/) - LIFESAVER of a tutorial!!


### Troubleshooting Links

These are links to specific issues I ran into while implementing my web app. These articles/posts helped me resolved bugs and troubleshoot general errors.

1. [Stack Overflow Post](https://stackoverflow.com/questions/63152640/passport-js-sessions-react-accessing-req-user-from-any-route-other-than-th) - Issue with req.user information not persisting after logging in (using Passport). Resolved by adding ```{withCredentials: true}``` to the requesets that need the user info AND the login request (most important). Link to code where I added this [here](./client/src/api.js)
2. [Imports for Customizing Bootstrap](https://designmodo.com/bootstrap-react-sass/#installing-bootstrap-5) - Had an issue with what imports/general configuration to get customized Bootstrap set up. Referred to this for the import statements. Link to code where I used this info is [here](./client/src/index.js) and [here](./client/src/scss/custom.scss)
3. [Custom Fonts for Bootstrap](https://bootstrap.themes.guide/how-to-create-bootstrap-themes.html) - Referenced part of this article to see how to import custom fonts for Bootstrap. Link to code where I used this info is [here](./client/src/scss/custom.scss)
4. [Setting environment variables for React](https://create-react-app.dev/docs/adding-custom-environment-variables/) - Referenced to help ease development with urls for my api

### Documentation

These are links to general documentation for different libraries/features used throughout my app. There wasn't specific code based off these. Rather, these docs were mainly used to figure out how specific methods work.

1. [Passport Documentation](http://passportjs.org/docs) -- Being completely honest, this documentation didn't help at all. Very little useful info :(
    1. Used mainly for code in [auth.js](./auth.js)
2. [React Documentation](https://reactjs.org/docs/getting-started.html)
    1. Used throughout client-side code, see the client folder
3. [React Router Documentation](https://reactrouter.com/docs/en/v6)
    1. Used throughout client-side code, see the client folder
4. [Bootstrap Documentation](https://getbootstrap.com/docs/5.1/getting-started/introduction/)
    1. Used throughout client-side code, see client folder, specifically components folder
5. [Bootstrap Customization](https://getbootstrap.com/docs/5.1/customize/sass/)
    1. Used to customize Bootstrap, see [custom.scss](./client/src/scss/custom.scss)
6. [Axios Documentation](https://axios-http.com/docs/intro)
    1. Used mainly for api-related code, see [api.js](./client/src/api.js)
7. [Markdown Cheatsheet](https://github.com/tchapi/markdown-cheatsheet/blob/master/README.md) -- referenced to format this README

### Assets

1. Home page background image from [Freepik](https://www.freepik.com/free-vector/hand-painted-watercolor-abstract-watercolor-background_15517801.htm#query=watercolor%20background&position=1&from_view=keyword)
2. Favicon generated using [Favicon.io](https://favicon.io/favicon-converter/) -- actual favicon was designed by me though.