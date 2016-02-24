$(document).ready(function () {

    var currentPost = Data.getCurrentPost();
    var comments = Data.getPostComments();
    var relatedPosts = Data.getRelatedPosts();

    var postTemplate = Handlebars.templates['post.hbs'];
    var relatedPostsTemplate = Handlebars.templates['related-posts.hbs'];


    render();

    function render() {
        renderPost();
        renderRelatedPosts();
        subscribeHandlers();
    }

    function renderPost() {
        $('.post').html(postTemplate({
            post: currentPost,
            comments: comments
        }));
    }

    function renderRelatedPosts() {
        $('.related-posts').html(relatedPostsTemplate({posts: relatedPosts}));
    }

    function subscribeHandlers() {
        $('.related-posts').click(function (event) {
            var id = $(event.target).closest('.post-preview').data('id');
            if (id === undefined) {
                return;
            }
            window.location = "/post.html?id=" + id;
        });
    }
});
