var mongoose = require("mongoose"),
    express = require('express'),
    morgan = require("morgan"),
    app = express();


//APP CONFIG
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/restful_blog_app", { useNewUrlParser: true });

app.use(express.static('public'));
app.use(express.json());
app.use(morgan('common'));

//MAIN PAGE SHOWS MOST RECENT POSTS
app.get("/", function (req, res) {
    res.send("Here I am");
});


//INDEX ROUTE
app.get("/posts", function (req, res) {
    BlogPost
        .find()
        .then(posts => {
            return {
                id: post._id,
                author: post.authorName,
                content: post.content,
                title: post.title
            };
        })
        .catch(err => {
            console.error(err);
            RTCRtpSender.status(500).json({ error: 'something went wrong'});
        });
});

//PAGE TO SHOW INDIVIDUAL POST WITH FULL TEXT
app.get("/posts/:id", function (req, res) {
    BlogPost
        .findById(req.params.id)
        .then(post => {
            res.json({
                id: post._id,
                author: post.authorName,
                content: post.content,
                comments: post.comments
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'something went wrong'});
        });
});

//HOME PAGE SHOWS USER POSTS 

//LOGIN PAGE

//SIGN UP PAGE

//NEW POST PAGE
app.post("/posts", function (req, res) {
    const requiredFields = ['title', 'content', 'author_id'];
    requiredFields.forEach(field => {
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    });
    Author
        .findById(req.params.id)
            .then()
})
//EDIT POST PAGE

//COMMENTS PAGE

if (require.main === module) {
    app.listen(process.env.PORT || 8080, function () {
        console.info(`App listening on ${this.address().port}`);
    });
}

module.exports = app;