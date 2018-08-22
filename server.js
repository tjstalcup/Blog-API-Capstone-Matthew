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

// app.get('/authors', function (req, res) {
//     Author
//         .find()
//         .then(authors => {
//             res.json(authors.map(author => {
//                 return {
//                     id: author._id,
//                     name: `${author.firstName} ${author.lastName}`,
//                     userName: author.userName
//                 };
//             }));
//         })
//         .catch(err => {
//             console.error(err);
//             res.status(500).json({
//                 error: 'something went wrong'
//             });
//         });
// });

// // app.get('/authors/:id', function (req, res) {
// //     Author
// //         .findById(req.params.id)
// //         .then(post => {
// //             res.json(post.serialize());
// //         })
// //         .catch(err => {
// //             console.error(err);
// //             res.status(500).json({
// //                 error: 'something went horribly awry'
// //             });
// //         });
// // });

// app.post('/authors', jsonParser, function (req, res) {
//     const requiredFields = ['firstName', 'lastName', 'userName'];
//     requiredFields.forEach(field => {
//         if (!(field in req.body)) {
//             const message = `Missing \`${field}\` in request body`;
//             console.error(message);
//             return res.status(400).send(message);
//         }
//     });

//     Author
//         .findOne({
//             userName: req.body.userName
//         })
//         .then(author => {
//             if (author) {
//                 const message = `Username already taken`;
//                 console.error(message);
//                 return res.status(400).send(message);
//             } else {
//                 Author
//                     .create({
//                         firstName: req.body.firstName,
//                         lastName: req.body.lastName,
//                         userName: req.body.userName
//                     })
//                     .then(author => res.status(201).json({
//                         _id: author.id,
//                         name: `${author.firstName} ${author.lastName}`,
//                         userName: author.userName
//                     }))
//                     .catch(err => {
//                         console.error(err);
//                         res.status(500).json({
//                             error: 'Something went wrong'
//                         });
//                     });
//             }
//         })
//         .catch(err => {
//             console.error(err);
//             res.status(500).json({
//                 error: 'Something went really really wrong'
//             });
//         });
// });

// app.put("/authors/:id", function (req, res) {
//     if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
//         res.status(400).json({
//             error: 'Request path if and request body id vaules must match'
//         });
//     }

//     const updated = {};
//     const updateableFields = ['firstName', 'lastName', 'userName'];
//     updateableFields.forEach(field => {
//         if (field in req.body) {
//             updated[field] = req.body[field];
//         }
//     });

//     Author
//         .findOne({
//             userName: updated.userName || '',
//             _id: {
//                 $ne: req.params.id
//             }
//         })
//         .then(author => {
//             if (author) {
//                 const message = 'Username already taken';
//                 console.error(message);
//                 return res.status(400).send(message);
//             } else {
//                 Author
//                     .findByIdAndUpdate(req.params.id, {
//                         $set: updated
//                     }, {
//                         new: true
//                     })
//                     .then(updatedAuthor => {
//                         res.status(200).json({
//                             id: updatedAuthor.id,
//                             name: `${updatedAuthor.firstName} ${updatedAuthor.lastName}`,
//                             userName: updatedAuthor.userName
//                         });
//                     })
//                     .catch(err => res.status(500).json({
//                         message: err
//                     }));
//             }

//         });
// });

// app.delete('/authors/:id', function (req, res) {
//     BlogPost
//         .remove({
//             author: req.params.id
//         })
//         .then(() => {
//             Author
//                 .findByIdAndRemove(req.params.id)
//                 .then(() => {
//                     console.log(`Deleted blog posts owned by and author with id \` ${req.params.id}\``);
//                     res.status(204).json({
//                         message: 'success'
//                     });
//                 });
//         })
//         .catch(err => {
//             console.error(err);
//             res.status(500).json({
//                 error: 'something went terribly wrong'
//             });
//         });
// });