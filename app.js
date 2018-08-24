var express = require("express"),
    morgan = require("morgan"),
    mongoose = require("mongoose"),
    cors = require("cors"),
    bodyParser = require("body-parser"),
    passport = require("passport");

//APP CONFIG
const { router: entriesRouter } = require('./entries');
const { router: usersRouter } = require('./users');
const { router: authRouter, localStrategy, jwtStrategy } = require('./auth');
mongoose.Promise = global.Promise;

const {
    DATABASE_URL,
    PORT
} = require('./config');
const {
    Author,
    BlogPost
} = require('./models/schemas');

const jsonParser = bodyParser.json();

var app = express();
mongoose.connect("mongodb://localhost:27017/blog-app", {
    useNewUrlParser: true
});

app.use(morgan('common'));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
// app.use(express.static('public'));
// app.use(express.static('public'))
// CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    if (req.method === 'OPTIONS') {
      return res.send(204);
    }
    next();
  });

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use('/api/users/', usersRouter);
app.use('/api/auth/', authRouter);
app.use('/api/entries', entriesRouter);

//RESTFUL ROUTES
//INDEX ROUTE
app.get('/', function (req, res) {
    // res.redirect('/api/posts');
    res.render('home.html');
});

//BLOG POST ROUTES
app.get("/api/posts", cors(), function (req, res) {
    BlogPost
        .find()
        .then(posts => {
            res.json(posts.map(post => {
                return post.serialize();
            }));
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: 'something went wrong'
            });
        });
});

const jwtAuth = passport.authenticate('jwt', {session: false});
//SHOW ROUTE
app.get("/api/posts/:id", jwtAuth, function (req, res) {
    BlogPost
        .findById(req.params.id)
        .then(post => {
            res.json(post.serialize());
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: 'something went horribly awry'
            });
        });
});



//SERVER STUFF
function runServer(databaseUrl, port = PORT) {
    return new Promise((resolve, reject) => {
        mongoose.connect(databaseUrl, err => {
            if (err) {
                return reject(err);
            }
            server = app.listen(port, () => {
                    console.log(`Your app is listening on port ${port}`);
                    resolve();
                })
                .on('error', err => {
                    mongoose.disconnect();
                    reject(err);
                });
        });
    });
}


function closeServer() {
    return mongoose.disconnect().then(() => {
        return new Promise((resolve, reject) => {
            console.log('Closing server');
            server.close(err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    });
}


if (require.main === module) {
    runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = {
    runServer,
    app,
    closeServer
};
