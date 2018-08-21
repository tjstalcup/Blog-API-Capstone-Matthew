function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

function showBlogPosts() {
    $.getJSON("localhost:8080/post", function (data) {
        $(".content").html('<p>' + data.content + '</p>');
        $(".author").html(`<p>${data.author}</p>`);
    });
}

$(document).ready(function () {
    showBlogPosts();
});