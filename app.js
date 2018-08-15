var express = require("express"),
    morgan = require("morgan"),
    mongoose = require("mongoose");

const { DATABASE_URL, PORT } = require('./config');
const { Author, BlogPost } = require('./models/schemas');

var app = express();
mongoose.connect("mongodb://localhost:27017/restful_blog_app", { useNewUrlParser: true });

app.use(morgan('common'));
app.use(express.json());

app.get('/authors', function(req, res) {
    Author
        .find()
        .then(authors => {
            res.json(authors.map(author => {
                return {
                    id: author_id,
                    name: `${author.firstName} ${author.lastName}`,
                    userName: author.userName
                };
            }));
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'something went wrong'});
        });
});

app.get("/post", function(req, res) {
    BlogPost
        .find()
        .then(posts => {
            res.json(posts.map(post => {
                return {
                    id: post._id,
                    author: post.authorName,
                    content: post.content,
                    title: post.title
                };
            }));
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'something went wrong'});
        });
});

app.get("/posts", function (req, res) {
    BlogPost
        
});

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
  
  // this function closes the server, and returns a promise. we'll
  // use it in our integration tests later.
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
  
  // if server.js is called directly (aka, with `node server.js`), this block
  // runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
  if (require.main === module) {
    runServer(DATABASE_URL).catch(err => console.error(err));
  }
  
  module.exports = { runServer, app, closeServer };