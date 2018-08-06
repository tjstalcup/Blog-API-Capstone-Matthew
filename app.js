var expressSanitizer = require("express-sanitizer"),
    methodOverride = require("method-override"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    express = require("express"),
    morgan = require('morgan'),
    app = express();

//APP CONFIG
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/restful_blog_app", {
    useNewUrlParser: true
});
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(expressSanitizer());
app.use(morgan('common'));
app.use(express.json());

const {
    DATABASE_URL,
    PORT
} = require("./config");
const {
    BlogPost
} = require("./models");

//SCHEMAS
var commentSchema = mongoose.Schema({
    text: String,
    author: String
});

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    author: String,
    created: {
        type: Date,
        default: Date.now
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
})

var Blog = mongoose.model("Blog", blogSchema);
var Comment = mongoose.model("Comment", commentSchema);

//ROUTES
app.get('/posts', function (req, res) {
    BlogPost
        .find()
        .then(posts => {
            res.json(posts.map(post => post.serialize()));
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: 'something went wrong'
            });
        });
});

app.post("/posts", function (req, res) {
    const requiredFields = ['title', 'body', 'image']
})