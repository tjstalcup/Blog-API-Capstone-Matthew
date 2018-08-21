function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

function showBlogPosts() {
    $.getJSON("http://localhost:8080/post", function (data) {
        //console.log(data);
        for (let i = 0; i <= data.length; i++) {
            $.each(data[i], () => {
                //console.log(data[i]);
                let id = data[i].id;
                $(`<div class="blogContainer"><div class="content"><h3><a href ="#" class="title">${data[i].title}</a></h3><p>${data[i].content}</p></div><div class="author"><p>${data[i].author}</p></div></div>`).appendTo(".blogPosts");
            });
        }
    });
}


function handleTitleClick() {
    $('.blogPosts').on('click', '.title', function () {
        console.log('Title of Post clicked');
        event.preventDefault();
        $('.blogPosts').prop('hidden', true);
        const id = $(this).data("")
        getPostById(id);
    });
}

function getPostById(id, callback) {
    $.getJSON(`http://localhost:8080/posts/`, function (data) {
        //console.log(data);
        for (let i = 0; i <= data.length; i++) {
            $.each(data[i], () => {
                //console.log(data[i]);
                let id = data[i].id;
                $(`<div class="blogContainer"><div class="content"><h3><a href ="#" class="title">${data[i].title}</a></h3><p>${data[i].content}</p></div><div class="author"><p>${data[i].author}</p></div></div>`).appendTo(".blogPosts");
            });
        }
    });
}

//LOGIN PAGE
function renderLoginPage() {
    return `
            <section class="login-screen" aria-live="assertive">
            <form role="form" class="login">
                <fieldset name="login-info">
                    <div class="login-header">
                        <legend align="center">Log In</legend>
                    </div>
                        <p id='notification'></p>
                    <label for="email" required>Email</label>
                    <input type="email" name="email" id="email" placeholder="Email address" required="">
                    <label for="password" required>Password</label>
                    <input type="password" name="password" id="password" placeholder="Password" required>
                </fieldset>
                <button type="submit" class="js-login-button">Login</button>
                <p>Don't have an account? <a href="" class ="nav-signup">Sign up</a></p>
            </form>
            `;
}

function displayLoginPage() {
    const loginPage = renderLoginPage();
    $('#main-page').html(loginPage);
    $('.blogPosts').prop('hidden', true);
}

function handleLoginButton() {
    $('.login').on('click', function (event) {
        console.log('Login Clicked');
        event.preventDefault();
        displayLoginPage();
    });
}

//signup page
function renderSignUp() {
    return `
            <section class="signup-page-screen" aria-live="assertive">
            <form role="form" class="signup">
                <fieldset name="signup-info">
                    <div class="login-header">
                        <legend>Sign Up</legend>
                    </div>
                        <p id='notification'></p>
                    <label for="email" required>Email</label>
                    <input type="email" name="email" id="email" placeholder="Email address" required="">
                    <label for="password" required>Password</label>
                    <input type="password" name="password" id="password" placeholder="Password" required>
                    <label for="password-confirm" required>Confirm password</label>
                    <input type="password" name="password" id="password-confirm" placeholder="Confirm password" required >
                </fieldset>
                <button type="submit" class="js-signup-button">Sign up</button>
                <p>Already have an account? <a href="" class="nav-login">Log in</p></a>
            </form>
        </section>
            `;
}

function displaySignUp() {
    const signUp = renderSignUp();
    $('.blogPosts').prop('hidden', true);
    $('#main-page').html(signUp);
}

function signUpButton() {
    $('.signup').on('click', function(event) {
        console.log('Sign Up Clicked');
        event.preventDefault();
        displaySignUp();
    });
}

function displayHomePage() {
    const homePage = showBlogPosts();
    $('#main-page').html(homePage);

}

function homeButton() {
    $('.home').on('click', function(event) {
        console.log('Home button clicked');
        event.preventDefault();
        showBlogPosts();

    });
}

function eventHandlers() {
    showBlogPosts();
    handleLoginButton();
    signUpButton();
    homeButton();
    handleTitleClick();

}
$(eventHandlers);

// $(document).ready(function () {
//     showBlogPosts();

// });