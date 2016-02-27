$(document).ready(function () {

    var currentPost = Data.getCurrentPost();
    var comments = Data.getPostComments();
    var relatedPosts = Data.getRelatedPosts();

    /* jshint -W069: true */
    var postTemplate = App.templates['post'];
    var relatedPostsTemplate = App.templates['related-posts'];



    function renderPost() {
        $('.post').html(postTemplate({
            post: currentPost,
            comments: comments
        }));
    }

    function renderRelatedPosts() {
        $('.related-posts').html(relatedPostsTemplate({ posts: relatedPosts }));
    }

    function subscribeHandlers() {
        $('.related-posts').click(function (event) {
            var id = $(event.target).closest('.post-preview').data('id');
            if (id === undefined) {
                return;
            }
            window.location = '/post.html?id=' + id;
        });
    }

    function render() {
        renderPost();
        renderRelatedPosts();
        subscribeHandlers();
    }

    render();
});
