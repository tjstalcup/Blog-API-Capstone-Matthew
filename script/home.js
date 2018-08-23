//NAV BAR FUNCTION
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
//SHOW HOME PAGE
function showBlogPosts() {
    $.getJSON("http://localhost:8080/posts", function (data) {      
        for (let i = 0; i < data.length; i++) {
            $(`<div class="blogContainer"><div class="content">
                <img src="${data[i].picture}">
                <h3><a href ="#" data-entryid="${data[i].id}" class="entry-title">${data[i].title}</a></h3>
                </div>`).appendTo(".blogPosts");            
        }
    });
}

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

//SIGN UP PAGE
function renderSignUp() {
    return `
    <div class="container">
    <form role="form" class="signUp" id="signUp">
        <div class="login-header">
            <legend align="center">Login</legend>
        </div>
        <div class="row">
            <div class="col-25">
                <label for="fName">First Name</label>
            </div>
            <div class="col-75">
                <input class="signUp-form" type="text" id="fName" name="firstName" placeholder="Your Name..." required>
            </div>
        </div>
        <div class="row">
            <div class="col-25">
                <label for="lName">Last Name</label>
            </div>
            <div class="col-75">
                <input class="signUp-form" type="text" id="lName" name="lastName" placeholder="Your Name..." required>
            </div>
        </div>
        <div class="row">
            <div class="col-25">
                <label for="email">Email</label>
            </div>
            <div class="col-75">
                <input class="signUp-form" type="Email" id="email" name="email" placeholder="Email Address" required>
            </div>
        </div>
        <div class="row">
            <div class="col-25">
                <label for="password">Password</label>
            </div>
            <div class="col-75">
                <input class="signUp-form" type="password" id="password" name="password" placeholder="Password" required>
            </div>
        </div>
        <div class="row">
            <div class="col-25">
                <label for="password-confirm">Confirm</label>
            </div>
            <div class="col-75">
                <input class="signUp-form" type="password" id="password-confirm" name="password" placeholder="Confirm Password" required>
            </div>
        </div>
        <div class="form-group">
            <button type="submit" class="submit-btn">Submit</button>
        </div>
    </form>
</div>
            `;
}
function displaySignUp() {
    const signUpPage = renderSignUp();
    $('.blogPosts').hide();
    $('.new').html(signUpPage);
    $('.new').show();
}
function handleSignUpClick() {
    $('.area').on('click','.signup', function(event) {
        event.preventDefault();
        displaySignUp();
    });
}
function signUpSuccess() {
    
}
//LOGIN PAGE
function renderLoginPage() {
    return `
    <div class="container">
    <form role="form" class="login" id="login">
        <div class="login-header">
            <legend align="center">Add New Detail!!!</legend>
        </div>
        <div class="row">
            <div class="col-25">
                <label for="email">Email</label>
            </div>
            <div class="col-75">
                <input class="login-form" type="Email" id="email" name="email" placeholder="Email Address" required>
            </div>
        </div>
        <div class="row">
            <div class="col-25">
                <label for="password">Password</label>
            </div>
            <div class="col-75">
                <input class="login-form" type="password" id="password" name="password" placeholder="Password" required>
            </div>
        </div>
        <div class="form-group">
            <button type="submit" class="submit-btn">Submit</button>
            <p>Don't have an account? <a href="" class ="signup">Sign up</a></p>
        </div>
    </form>
</div>
            `;
}
//show login form
function displayLoginPage() {
    const loginPage = renderLoginPage();
    $('.blogPosts').hide();
    $('.new').html(loginPage);
    $('.new').show();
}
//handle login button clicked
function handleLoginButton() {
    $('.login').on('click', function (event) {
        console.log('Login Clicked');
        event.preventDefault();
        displayLoginPage();
    });
}
//authentication


//USER HOME PAGE
function renderUserHome(userEntries) {
    return `
    <div class="navbar" id="myTopnav">
        <a href="#" class="home" id="active">Home</a>
        <a href="#" class="dashboard">Dashboard</a>
        <a href="#" class="newDetail">New Detail</a>
        <a href="#" class="logout">Logout</a>
        <a href="javascript:void(0);" class="icon" onclick="myFunction()">
                <i class="fa fa-bars"></i>
              </a>
    </div>

    <main role="main" id="main-page">
        <div class="new">
            <section class="user-page" aria-live="assertive">
                <div class="dashboard-header">
                    <h2>My Detail Jobs</h2>
                </div>
            <section class="user-detail-posts">
                <div class="blogContainer">
                    <div class="content">
                        <h3>
                            <a href ="#" class="title">${userEntries}</a>
                        </h3>
                        <p>${userEntries}</p>
                    </div>
                    <div class="author">
                        <p>${userEntries}</p>
                    </div>
                </div>
        </div>
    `;
}

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
//show new post form
function displayNewPostPage() {
    const newPost = renderNewPost();
    $('.blogPosts').hide();
    $('.new').html(newPost);
    $('.new').show();
    renderNewPost();
}
//handle new detail button clicked
function handleNewPostBtn() {
    $('.newDetail').on('click', function(event) {
        console.log('New Detail Clicked');
        event.preventDefault();
        displayNewPostPage();
    });
}
//send post request
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
//handle post submit button
function submitPostButton() {
    $('.submit-btn').on('click', function (event) {
        console.log('Sign Up Clicked');
        event.preventDefault();
        
    });
}
//EVENT HANDLERS
function eventHandlers() {
    showBlogPosts();
    handleNewPostBtn();
    handleTitleClick();
    homeButton();
    handleHambugerClick();
    handleLoginButton();
    handleSignUpClick();
}
$(eventHandlers);
