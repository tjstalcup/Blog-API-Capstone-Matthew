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
            $.each(data[i], () => {
                console.log(data[i]);
                let id = data[i].id;
                $(`<div class="blogContainer"><div class="content"><h3><a href ="../views/show.html">${data[i].title}</a></h3><p>${data[i].content}</p></div><div class="author"><p>${data[i].author}</p></div></div>`).appendTo(".blogPosts");
            });
        }
    });
}

$(document).ready(function () {
    showBlogPosts();
});