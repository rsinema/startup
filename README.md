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
