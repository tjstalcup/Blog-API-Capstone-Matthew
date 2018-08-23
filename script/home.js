function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "navbar") {
        x.className += " responsive";
    } else {
        x.className = "navbar";
    }
}

function handleHambugerClick() {
    $('.fa fa-bars').on('click', function(event) {
        event.preventDefault();
        myFunction();
    });
}

function showBlogPosts() {
    $.getJSON("http://localhost:8080/posts", function (data) {
        //console.log(data);
        
        for (let i = 0; i < data.length; i++) {
            //$.each(data[i], () => {
            //console.log(data[i]);
            // var id = data[i].id;
            //console.log("data[i].picture");
            $(`<div class="blogContainer"><div class="content">
                <img src="${data[i].picture}">
                <h3><a href ="#" data-entryid="${data[i].id}" class="entry-title">${data[i].title}</a></h3>
                </div>`).appendTo(".blogPosts");
            //});
            
        }
        
    });
}

function renderSinglePost(response) {
    return `
    <div class="blogContainer"><div class="content">
        <img src="${response.picture}">
            <h3>
                <a href ="#" data-entryid="${response.id}" class="entry-title">${response.title}</a>
            </h3>
        <p>${response.content}</p>
    </div>
    <div class="author">
        <p>${response.author}</p>
    </div>
    `;
}

function displayIndividualPost(response) {
    const singlePost = renderSinglePost(response);
    $('.blogPosts').hide();
    $('.new').html(singlePost);
    $('.new').show();
}

function getIndividualPost(id, callback) {
    console.log(id);

    $.ajax({
        type: "GET",
        url: `http://localhost:8080/posts/${id}`,
        dataType: "json",
        contentType: "application/json",
        success: function (response) {
            displayIndividualPost(response);
        }
    });
}


function handleTitleClick() {
    $('.blogPosts').on('click', '.entry-title', function () {
        console.log('Title of Post clicked');
        const id = $(this).data("entryid");        
        getIndividualPost(id, displayIndividualPost);
    });
}


// //LOGIN PAGE
// function renderLoginPage() {
//     return `
//             <section class="login-screen" aria-live="assertive">
//             <form role="form" class="login" id="login">
//                 <fieldset name="login-info">
//                     <div class="login-header">
//                         <legend align="center">Log In</legend>
//                     </div>
//                         <p id='notification'></p>
//                     <label for="email" required>Email</label>
//                     <input type="email" name="email" id="email" placeholder="Email address" required="">
//                     <label for="password" required>Password</label>
//                     <input type="password" name="password" id="password" placeholder="Password" required>
//                 </fieldset>
//                 <button type="submit" class="js-login-button">Login</button>
//             </form>
//             `;
// }

// function displayLoginPage() {
//     const loginPage = renderLoginPage();
//     $('.new').removeAttr('hidden');
//     $('.new').html(loginPage);
//     $('.blogPosts').prop('hidden', true);
// }

// function handleLoginButton() {
//     $('.login').on('click', function (event) {
//         console.log('Login Clicked');
//         event.preventDefault();
//         displayLoginPage();
//     });
// }

// //USER HOME PAGE
// function renderUserHome(userEntries) {
//     return `
//     <div class="nav-bar" id="myTopnav">
//         <a href="#" class="home">Home</a>
//         <a href="#" class="dashboard">Dashboard</a>
//         <a href="#" class="newPost">New Post</a>
//         <a href="#" class="logout">Logout</a>
//     </div>

//     <main role="main" id="main-page">
//         <div class="new">
//             <section class="user-page" aria-live="assertive">
//                 <div class="dashboard-header">
//                     <h2>My Detail Jobs</h2>
//                 </div>
//             <section class="user-detail-posts">
//                 <div class="blogContainer">
//                     <div class="content">
//                         <h3>
//                             <a href ="#" class="title">${userEntries}</a>
//                         </h3>
//                         <p>${userEntries}</p>
//                     </div>
//                     <div class="author">
//                         <p>${userEntries}</p>
//                     </div>
//                 </div>
//         </div>
//     `;
// }

// function displayDashboard(userEntries) {
//     const userHome = renderUserHome(userEntries);
//     $('#main-page').prop('hidden', true);
//     $('.navbar').prop('hidden', true);
//     $('.area').html(userHome);
// }

// function showDashboard(user) {
//     $.ajax({
//         type: 'GET',
//         url: `/authors/${user}`,
//         dataType: 'json',
//         contentType: 'application/json',
//         headers: {
//             Authorization: `Bearer ${jwt}`
//         }
//     })
//     .done(function(result) {
//         console.log(result);
//         displayDashboard(result.entries)
//     })
//     .fail(function(err) {
//         console.err(err);
//     });
// }


//SHOW HOME PAGE
function displayHomePage() {
    $('.new').hide();
    $('.blogPosts').show();
    
    showBlogPosts();
}

function homeButton() {
    $('.home').on('click', function (event) {
        console.log('Home button clicked');
        event.preventDefault();
        displayHomePage();

    });
}

//NEW POST
function renderNewPost() {
    return `
            <div class="container">
                <form role="form" class="newPost" id="newPost">
                    <div class="post-header">
                        <legend align="center">Add New Detail!!!</legend>
                    </div>
                    <div class="row">
                        <div class="col-25">
                            <label for="title">Title</label>
                        </div>
                        <div class="col-75">
                            <input type="text" id="title" name="title" placeholder="Title" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-25">
                            <label for="image">Image URL</label>
                        </div>
                        <div class="col-75">
                            <input type="text" id="image" name="picture" placeholder="Image URL" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-25">
                            <label for="desc">Content</label>
                        </div>
                        <div class="col-75">
                            <textarea rows="4" cols="40" form="newPost" maxlength="2000" id="desc" name="content" placeholder="Write Something..." required></textarea>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-25">
                            <label for="username">User Name</label>
                        </div>
                        <div class="col-75">
                            <input type="text" id="username" name="username" placeholder="UserName" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <button type="submit" class="submit-btn">Submit</button>
                    </div>
                </form>
            </div>
    `;
}

function displayNewPostPage() {
    const newPost = renderNewPost();
    $('.blogPosts').hide();
    $('.new').html(newPost);
    $('.new').show();
    renderNewPost();
}

function handleNewPostBtn() {
    $('.newDetail').on('click', function(event) {
        console.log('New Detail Clicked');
        event.preventDefault();
        displayNewPostPage();
    });
}

function postNewDetail() {
    $('.newPost').on('submit', '.submit-btn', function (event) {
        event.preventDefault();
        const title = $('#title').val();
        const image = $('#image').val();
        const description = $('#desc').val();

        const newPostObject = {
            title: title,
            image: image,
            description: description
        };

        $.ajax({
            type: "POST",
            url: "../posts",
            data: JSON.stringify(newPostObject),
            dataType: "json",
            success: function () {
                showBlogPosts();
            }
        });
    });
}

function submitPostButton() {
    $('.submit-btn').on('click', function (event) {
        console.log('Sign Up Clicked');
        event.preventDefault();
        
    });
}



function eventHandlers() {
    showBlogPosts();
    handleNewPostBtn();
    handleTitleClick();
    homeButton();
    handleHambugerClick();
}
$(eventHandlers);

// $(document).ready(function () {
//     showBlogPosts();

// });