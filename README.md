# startup
Start-up application repo for CS 260 project


# [URL for Markdown syntax tips](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)

# Elevator Pitch for Startup

Are you sick of Instagram and Facebook with the needless amounts of ads, toxicity, and too many distracting features? The PicShare application takes all of the complexity out of sharing photos with your peers and simply allows you to post pictures you want and see your friends' pictures. Search for your friends on the app and add them to see their pictures and have them see yours. This app is all about just being able to share your photos to share them.

## Key Features

- Secure login over HTTPS
- Add or 'friend' other users
- Post images to your profile
- See images of other users that have been added
- Posts are persistenly stored

![Screenshot 2023-01-25 at 1 26 07 PM](https://user-images.githubusercontent.com/122413893/214682423-0e880b20-3310-4fa8-96ef-d7bbbf1cc60c.png)


### Notes

IP addresses are converted to domain names

#### TCP/IP models

Application	HTTPS	Functionality like web browsing

Transport	TCP	Moving connection information packets

Internet	IP	Establishing connections

Link	Fiber, hardware	Physical connections

## VS Code Git

comd+shift+p -> Git : Merge 
-merges the selected branch to the current branch you are working on

## Server Info

IP:: 3.12.180.81

Domain:: 260webprograming.click/

SSH Command:: ssh -i /Users/rileysinema/Desktop/260-server-keypair.pem ubuntu@3.12.180.81

Update Script Command:: ./deployWebsite.sh -k /Users/rileysinema/Desktop/260-server-keypair.pem -h 260webprograming.click

Update Simon Command:: ./deployService.sh -k /Users/rileysinema/Desktop/260-server-keypair.pem -h 260webprograming.click -s simon
- React:: ./deployReact.sh -k /Users/rileysinema/Desktop/260-server-keypair.pem -h 260webprograming.click -s simon

## CSS

![image](https://user-images.githubusercontent.com/122413893/218875567-b7ed1e5a-84f7-420e-b766-58b103de5368.png)

# Google fonts
@import url(<<href to googleapi font css family>>)
  
## JavaScript

element.addEventListener('keyup'/'keydown'/'mouseclick', function);
  
## URL
  
The Uniform Resource Locator (URL) represents the location of a web resource. A web resource can be anything, such as a web page, font, image, video stream, database record, or JSON object. It can also be completely ephemeral, such as a visitation counter, or gaming session.

A Uniform Resource Name (URN) is a unique resource name that does not specify location information. For example, a book URN might be urn:isbn:10,0765350386. A Uniform Resource Identifier (URI) is a general resource identifier that could refer to either a URL and URN. With web programming you are almost always talking about URLs and therefore you should not use the more general URI.
  
## Http
  
curl -v -s http://info.cern.ch/hypertext/WWW/Helping.html
  
There are several verbs that describe what the HTTP request is asking for. The list below only describes the most common ones.

<verb> <url path, parameters, anchor> <version>
[<header key: value>]*
[

  <body>
]
    
<version> <status code> <status string>
[<header key: value>]*
[

  <body>
]

Verb	Meaning
GET	Get the requested resource. This can represent a request to get a single resource or a resource representing a list of resources.
POST	Create a new resource. The body of the request contains the resource. The response should include a unique ID of the newly created resource.
PUT	Update a resource. Either the URL path, HTTP header, or body must contain the unique ID of the resource being updated. The body of the request should contain the updated resource. The body of the response may contain the resulting updated resource.
DELETE	Delete a resource. Either the URL path or HTTP header must contain the unique ID of the resource to delete.
OPTIONS	Get metadata about a resource. Usually only HTTP headers are returned. The resource itself is not returned.
  
It is important that you use the standard HTTP status codes in your HTTP responses so that the client of a request can know how to interpret the response. The codes are partitioned into five blocks.

1xx - Informational.
2xx - Success.
3xx - Redirect to some other location, or that the previously cached resource is still valid.
4xx - Client errors. The request is invalid.
5xx - Server errors. The request cannot be satisfied due to an error on the server.
    
## Node.js stuff
    

>Create your project directory
    
>Initialize it for use with NPM by running npm init -y
    
>Make sure .gitignore file contains node-modules
    
>Install any desired packages with npm install 'package name here'
    
>Add require('package name here') to your JavaScript code
    
>Run your code with node main.js
    
    
## Simon-service notes
     
    in index.js using express to host the application static content
    
    // JSON body parsing using built-in middleware
    app.use(express.json());

    // Serve up the front-end static content hosting
    app.use(express.static('public'));

    // Router for service endpoints
    const apiRouter = express.Router();
    app.use(`/api`, apiRouter);

    // GetScores
    apiRouter.get('/scores', (_req, res) => {
      res.send(scores);
    });

    // SubmitScore
    apiRouter.post('/score', (req, res) => {
      scores = updateScores(req.body, scores);
      res.send(scores);
    });
    
    // updateScores considers a new score for inclusion in the high scores.
// The high scores are saved in memory and disappear whenever the service is restarted.
let scores = [];
function updateScores(newScore, scores) {
  let found = false;
  for (const [i, prevScore] of scores.entries()) {
    if (newScore.score > prevScore.score) {
      scores.splice(i, 0, newScore);
      found = true;
      break;
    }
  }

  if (!found) {
    scores.push(newScore);
  }

  if (scores.length > 10) {
    scores.length = 10;
  }

  return scores;
}

    
    
    in the application js
    
    async function loadScores() {
    const response = await fetch("/api/scores")
    const scores = await response.json() }

    // Modify the DOM to display the scores
    
## MongoDB

add environment vars :: sudo nano ~/.zprofile
> VARNAME = value

reading in the env vars
> const var = process.env.VARNAME;

conneciton string for mongoDb :: mongodb+srv://${userName}:${password}@${hostname}

connect to db cluster
> const url = `mongodb+srv://${userName}:${password}@${hostname}`;
> const client = new MongoClient(url);
> const collection = client.db(//dbname).collection(//collectionname);


## Authentication

Simon examples

encrypt the passwords
> const bcrypt = require('bcrypt');

> async function createUser(email, password) {
> // Hash the password before we insert it into the database
> const passwordHash = await bcrypt.hash(password, 10);

login
>// loginAuthorization from the given credentials
>app.post('/auth/login', async (req, res) => {
>  const user = await getUser(req.body.email);
>  if (user) {
>    if (await bcrypt.compare(req.body.password, user.password)) {
>      setAuthCookie(res, user.token);
>      res.send({ id: user._id });
>      return;
>    }
>  }
>  res.status(401).send({ msg: 'Unauthorized' });
>});

create
// createAuthorization from the given credentials
>app.post('/auth/create', async (req, res) => {
>  if (await getUser(req.body.email)) {
>    res.status(409).send({ msg: 'Existing user' });
>  } else {
>    const user = await createUser(req.body.email, req.body.password);
>    setAuthCookie(res, user.token);
>    res.send({
>      id: user._id,
>    });
>  }
>});

WebSocket

>configureWebSocket() {
>    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
>    this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
>    this.socket.onopen = (event) => {
>      this.displayMsg('system', 'game', 'connected');
>    };
>    this.socket.onclose = (event) => {
>      this.displayMsg('system', 'game', 'disconnected');
>    };
>    this.socket.onmessage = async (event) => {
>      const msg = JSON.parse(await event.data.text());
>      if (msg.type === GameEndEvent) {
>        this.displayMsg('player', msg.from, `scored ${msg.value.score}`);
>      } else if (msg.type === GameStartEvent) {
>        this.displayMsg('player', msg.from, `started a new game`);
>      }
>    };
>  }
    
Simon React

1. **Reorganize Simon**
    > We want the service code in a service directory and the React code in the src directory.
1. **Commit**: Commit this version in Git as the starting place for the conversion to React. It won't run, but by committing at this point can revert if necessary, instead of starting over. Make sure you keep testing and committing throughout this process.
1. **Create template React application**. Run `npx create-react-app template-react`. This creates a new directory named `template-react` that contains the basic configuration and template React application code.
1. **Clean up template code**
   1. Uninstall and NPM packages you won't use (e.g. stats, test)
   1. Delete the unnecessary create-react-app files (e.g. images)
   1. Rename `js` JSX files have `jsx` extension
   1. Replace the `favicon.ico` with the Simon icon
   1. Update `manifest.json` to represent Simon
   1. Clean up the `index.html` file to have the proper fields for Simon
1. **Move template files to Simon**
1. **Convert to React Bootstrap**
    > To use the React version of Bootstrap import the NPM package.
    > npm install bootstrap react-bootstrap
    
    > Now, in the components where you want to refer to the Bootstrap styles, you can import the css from the imported NPM package just like you would          other CSS files.

    >> import 'bootstrap/dist/css/bootstrap.min.css';
1. **Populate App.jsx**
    > One of the big advantages of React is the ability to represent your web application as a modular single page application instead of a set of interconnected redundant HTML pages. Instead of an HTML page for each functional piece, you now have a React component for each functional piece. The app.jsx file represents the application component that is the parent of all our other components.
    
    '''jsx
    function App() {
  return (
    <div className='body bg-dark text-light'>
      <header className='container-fluid'>
        <nav className='navbar fixed-top navbar-dark'>
          <div className='navbar-brand'>
            Simon<sup>&reg;</sup>
          </div>
          <menu className='navbar-nav'>
            <li className='nav-item'>
              <a className='nav-link active' href='index.html'>
                Home
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='play.html'>
                Play
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='scores.html'>
                Scores
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='about.html'>
                About
              </a>
            </li>
          </menu>
        </nav>
      </header>

      <footer className='bg-dark text-dark text-muted'>
        <div className='container-fluid'>
          <span className='text-reset'>Author Name(s)</span>
          <a className='text-reset' href='https://github.com/webprogramming260/simon-react'>
            Source
          </a>
        </div>
      </footer>
    </div>
  );
}
    '''
    
1. **Create view components**
1. **Create the router**
    >With app.jsx containing the header and footer and all the application view component stubs created, we can now create the router that will display each component as the navigation UI requests it.

    >This is done by inserting the react-router-dom package into the project. First, install the package with npm install react-router-dom and then include the router component in the index.jsx and app.jsx files.
1. **Convert to React components**
    
    The basic steps for converting the component include the following.

- Copy the HTML over and put it in the return value of the component.
- The `class` attribute is renamed to `className` so that it doesn't conflict with the JavaScript keyword `class`.

- Delete the header and footer HTML since they are now represented in `app.jsx`.
- Copy the JavaScript over and turn the functions into inner functions of the React component.
- Create a file for the CSS and use an import statement in the component `jsx` file.
- Create React state variables for each of the stateful objects in the component.
- Replaced DOM query selectors with React state variables.
- Move state up to parent components as necessary. For example, authentication state, or user name state.
- Create child components as necessary. For example, a SimonGame and SimonButton component.
    
1. **Set up to debug**
    
    Each of the HTML pages in the original code needs to be converted to a component represented by a corresponding `jsx` file. Each of the components is a bit different, and so you want to inspect them to see what they look like as a React component.

The basic steps for converting the component include the following.

- Copy the HTML over and put it in the return value of the component.
- The `class` attribute is renamed to `className` so that it doesn't conflict with the JavaScript keyword `class`.

- Delete the header and footer HTML since they are now represented in `app.jsx`.
- Copy the JavaScript over and turn the functions into inner functions of the React component.
- Create a file for the CSS and use an import statement in the component `jsx` file.
- Create React state variables for each of the stateful objects in the component.
- Replaced DOM query selectors with React state variables.
- Move state up to parent components as necessary. For example, authentication state, or user name state.
- Create child components as necessary. For example, a SimonGame and SimonButton component.

## Setup to debug

When running in production, the Simon web service running under Node.js on port 3000 serves up the Simon React application code when the browser requests `index.html`. This is the same as we did with previous Simon deliverables. The service pulls those files from the application's static HTML, CSS, and JavaScript files located in the `public` directory that we set up when we build the production distribution package.

![Setting up React ports](simonProduction.jpg)

However, when the application is running in debug mode on your development environment we actually need two HTTP servers running. One for the Node.js web service, so that we can debug the service endpoints, and one for the React client HTTP debugger, so that we can develop and debug the React application code.

To make this work when doing development debugging, we configure the React debugger HTTP server to listen on port 3001 and leave the Node.js server to listen on port 3000.

![Setting up React ports](simonDevelopmentDebugging.jpg)

To configure the React HTTP debugger to listen on port 3001 when running in our local development environment, we create a file named `.env.local` in the root of the project, and insert the following text.

```
PORT=3001
```

Next, we modify the `package.json` file to include the field `"proxy": "http://localhost:3000"`. This tells the React HTTP debugger that if a request is made for a service endpoint, it forwards it to port 3000, where our Node.js service is listening.

```json
{
  "name": "simon-react",
  // ...
  "proxy": "http://localhost:3000"
}
```

We also need to change the front-end WebSocket initialization found in the `gameNotifier.js` constructor to explicitly use the service port (3000) instead of the React HTTP debugger port (3001). Without this the front-end will send the webSocket messages to the React debug HTTP server listening on port 3001 and unlike HTTP traffic, it will not forward them onto port 3000 automatically. To explicitly send webSocket requests to port 3000 we use the dynamically injected process environment variable that is set when webpack creates the application bundle.

```js
let port = window.location.port;
if (process.env.NODE_ENV !== 'production') {
  port = 3000;
}
```

This is a bit of annoying configuration, but without it you won't be able to debug your entire application in your development environment.
1. Refactor play.jsx into simonGame.jsx, simonButton.jsx, and players.jsx
1. Refactor components to take advantage of React specific functionality and to create sub-components
1. Move webSocket code from play.jsx to gameNotifier.js
