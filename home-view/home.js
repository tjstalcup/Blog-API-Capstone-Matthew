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
        console.log(data);
        for (let i = 0; i <= data.length; i++) {
            $.each(data[i], function () {
                console.log(data[i].content);
                $(".blogPosts").html(`<div class="blogContainer"><div class="content"><p>${data[i].content}</p></div><div class="author"><p>${data[i].author}</p></div></div>`);
                //$(".blogPosts").html(`<div class="author"><p>${data[i].author}</p></div>`);
            });
        }
    });
}

$(document).ready(function () {
    showBlogPosts();
});