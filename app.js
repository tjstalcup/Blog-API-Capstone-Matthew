var express = require("express"),
    morgan = require("morgan"),
    mongoose = require("mongoose"),
    cors = require("cors"),
    bodyParser = require("body-parser");

//APP CONFIG
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

//RESTFUL ROUTES
app.get('/', function (req, res) {
    res.redirect('/posts');
});

//BLOG POST ROUTES
//INDEX ROUTE
app.get("/posts", cors(), function (req, res) {
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

//SHOW ROUTE
app.get("/posts/:id", cors(), function (req, res) {
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

//NEW ROUTE
app.post('/posts', function (req, res) {
    const requiredFields = ['title', 'content','picture', 'userName'];
    requiredFields.forEach(field => {
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    });

    Author
        .findById(req.body.userName)
        .then(author => {
            if (author) {
                BlogPost
                    .create({
                        title: req.body.title,
                        content: req.body.content,
                        author: req.body.id
                    })
                    .then(blogPost => res.status(201).json({
                        id: blogPost.id,
                        author: `${author.firstName} ${author.lastName}`,
                        content: blogPost.content,
                        title: blogPost.title,
                        comments: blogPost.comments
                    }))
                    .catch(err => {
                        console.error(err);
                        res.status(500).json({
                            error: 'Something went wrong'
                        });
                    });
            } else {
                const message = `Author not found`;
                console.error(message);
                return res.status(400).send(message);
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: 'something went horrible awry'
            });
        });
});

//EDIT ROUTE
app.put('/posts/:id', function (req, res) {
    if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
        res.status(400).json({
            error: 'Request path id and request body id values must match'
        });
    }
    const updated = {};
    const updateableFields = ['title', 'content'];
    updateableFields.forEach(field => {
        if (field in req.body) {
            updated[field] = req.body[field];
        }
    });
    BlogPost
        .findByIdAndUpdate(req.params.id, {
            $set: updated
        }, {
            new: true
        })
        .then(updatedPost => res.status(200).json({
            id: updatedPost.id,
            title: updatedPost.title,
            content: updatedPost.content
        }))
        .catch(err => res.status(500).json({
            message: err
        }));
});

//DELETE ROUTE
app.delete('/posts/:id', function (req, res) {
    BlogPost
        .findByIdAndRemove(req.params.id)
        .then(() => {
            console.log(`Deleted blog post with id \`${req.params.id}\``);
            res.status(204).end();
        });
});

app.use('*', function (req, res) {
    res.status(404).json({
        message: 'Not Found'
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