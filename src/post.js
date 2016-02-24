$(document).ready(function () {
    var currentPost = Data.getCurrentPost();
    var comments = Data.getPostComments();
    var relatedPosts = Data.getRelatedPosts();

    var postTemplate = Handlebars.compile($('#selected-post-template').html());
    var relatedPostsTemplate = Handlebars.compile($('#related-posts__list-template').html());

    Handlebars.registerPartial('comment', $('#comment-template').html());
    Handlebars.registerPartial('comments', $('#comments-template').html());
    Handlebars.registerPartial('post-preview', $('#post-template').html());


    render();

    function render() {
        renderPost();
        renderRelatedPosts();
        subscribeHandlers();
    }

    function renderPost() {
        $('.selected-post').html(postTemplate({
            post: currentPost,
            comments: comments
        }));
    }

    function renderRelatedPosts() {
        $('.related-posts__list').html(relatedPostsTemplate({posts: relatedPosts}));
    }

    function subscribeHandlers() {
        $('.related-posts__list').click(function (event) {
            var id = $(event.target).closest('.post-preview').data('id');
            if (id === undefined) {
                return;
            }
            window.location = "/post.html?id=" + id;
        });
    }
});
