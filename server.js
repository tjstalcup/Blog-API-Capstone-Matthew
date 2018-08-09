var mongoose = require("mongoose"),
    express = require('express'),
    morgan = require("morgan"),
    app = express();


//APP CONFIG
mongoose.connect("mongodb://localhost:27017/restful_blog_app", { useNewUrlParser: true })

app.use(express.static('public'));


app.get("/", function (req, res) {
    res.send("Here I am");
})

//MAIN PAGE SHOWS MOST RECENT POSTS
//INDEX ROUTE
app.get("/blogs", function (req, res) {

});
//HOME PAGE SHOWS USER POSTS 

//LOGIN PAGE

//SIGN UP PAGE

//NEW POST PAGE

//EDIT POST PAGE

//COMMENTS PAGE

if (require.main === module) {
    app.listen(process.env.PORT || 8080, function () {
        console.info(`App listening on ${this.address().port}`);
    });
}

module.exports = app;