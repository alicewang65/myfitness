# MyFitness

(Final web app name still to be finalized!)

## Overview

Whether you're a professional athlete or just starting your fitness journey, you're bound to hear about the advantages of keeping a training log. Training logs help you keep track of your progress and allow for self reflection in the future. 

However, it's not easy to keep track of all that information! MyFitness is a web app that will allow users to keep track of their workouts. Once registered and logged in, users can add, remove and update their workouts. They're also able to see all of their past workouts.


## Data Model

The application will store Users, Logs and Entries.

* users can have multiple logs (via references)
* each log can have multiple entries (by references)

An Example User:

```javascript
{
  username: "runneralice",
  hash: // a password hash (which includes the salt),
  logs: [] // an array of references to Log documents
}
```

An Example Log with Reference Entries:

```javascript
{
  user: // a reference to a User object
  name: "Half Marathon Training",
  items: [], // an array of references to Entry documents
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


## [Link to Commented First Draft Schema](db.js) 


## Wireframes

/ - home page, welcome users
![home page](documentation/home.png)

/about - page about the site
![about page](documentation/about.png)

/login - page for users to login or register
![login/register page](documentation/loginregister.png)

/logs - page for showing all logs
![logs page](documentation/logs.png)

/createlog - page for creating a log
![create log page](documentation/createlog.png)

/entries/slug - page for all entries for the given log
![entries page](documentation/entries.png)

/entry/slug - page for specific entry
![specific entry page](documentation/entry.png)

/entry/modify/slug - page for modifying an existing entry
![modify entry page](documentation/modifyentry.png)

/createentry - page for creating an entry for a given log
![create entry page](documentation/createentry.png)


## Site map

![site map](documentation/sitemap.png)


## User Stories or Use Cases

1. As non-registered user, I can register a new account with the site.
2. As a user, I can log in to the site.
3. As a user, I can see all of my logs in a single list / table format.
4. As a user, I can create a new log.
5. As a user, I can see the entries (title, date and preview) of a specific log in a single list / table format.
6. As a user, I can create a new entry (title, date, description) in a log.
7. As a user, I can modify an existing entry (including deleting the entry) in a log.
8. As a visitor to the page, I can see the "About" page to learn more information about the site.


## Research Topics

* (5 points) Integrate user authentication
    * I'm going to be using passport for user authentication
    * And account has been made for testing; I'll email you the password
    * see <code>cs.nyu.edu/~jversoza/ait-final/register</code> for register page
    * see <code>cs.nyu.edu/~jversoza/ait-final/login</code> for login page
* (4 points) Perform client side form validation using a JavaScript library
    * see <code>cs.nyu.edu/~jversoza/ait-final/my-form</code>
    * if you put in a number that's greater than 5, an error message will appear in the dom
* (5 points) vue.js
    * used vue.js as the frontend framework; it's a challenging library to learn, so I've assigned it 5 points

10 points total out of 8 required points (___TODO__: addtional points will __not__ count for extra credit_)


## [Link to Initial Main Project File](app.js) 

(__TODO__: create a skeleton Express application with a package.json, app.js, views folder, etc. ... and link to your initial app.js_)

## Annotations / References Used

(__TODO__: list any tutorials/references/etc. that you've based your code off of_)

1. [passport.js authentication docs](http://passportjs.org/docs) - (add link to source code that was based on this)
2. [tutorial on vue.js](https://vuejs.org/v2/guide/) - (add link to source code that was based on this)

