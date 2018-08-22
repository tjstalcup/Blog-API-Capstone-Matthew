function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

function showBlogPosts() {
    $.getJSON("http://localhost:8080/posts", function (data) {
        //console.log(data);
        
        for (let i = 0; i <= data.length; i++) {
            //$.each(data[i], () => {
            //console.log(data[i]);
            // var id = data[i].id;
            //console.log("data[i].picture");
            $(`<div class="blogContainer"><div class="content">
                <img src="${data[i].picture}">
                <h3><a href ="#" data-entryid="${data[i].id}" class="entry-title">${data[i].title}</a></h3>
                <p>${data[i].content}</p>
                </div>
                <div class="author">
                <p>${data[i].author}</p>
                </div>
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
    $('.blogPosts').prop('hidden', true);
    $('.new').html(singlePost);
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

// function getPostById(id, callback) {
//     $.getJSON(`http://localhost:8080/posts/${id}`, function (data) {
//         console.log(data);
        
//     });
// }

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
    $('.new').prop('hidden', true);
    $('.blogPosts').removeAttr('hidden');
    
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
            <section class="new-post-form" aria-live="assertive">
                <form role="form" class="newPost" id="newPost">
                    <div class="post-header">
                        <legend align="center">New Detail Complete!!!</legend>
                    </div>
                    <div class="form-group">
                        <input class="form-control" id="title" type="text" name="title" placeholder="Title" required>
                    </div>
                    <div class="form-group">
                        <input class="form-control" id="image" type="text" name="picture" placeholder="Image URL" required>
                    </div>
                    <div class="form-group">
                        <textarea rows="4" cols="40" form="newPost" maxlength="2000" id="desc" name="content" placeholder="Content" required></textarea>
                    </div>
                    <div>
                        <input class="form-control" id="username" type="text" name="username" placeholder="UserName" required>
                    </div>
                    <div class="form-group">
                        <button type="submit" class="submit-btn">Submit</button>
                    </div>
                </form>
    `;
}

function displayNewPostPage() {
    const newPost = renderNewPost();
    $('.blogPosts').prop('hidden', true);
    $('.new').html(newPost);
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

}
$(eventHandlers);

// $(document).ready(function () {
//     showBlogPosts();

// });