$(document).ready(function () {

    var posts = Data.getPosts();
    var selectedPage = 0;
    var perPage = 12;

    var postsTemplate = App.templates['posts-container__list'];
    var navigationTemplate = App.templates['posts-container__navigation'];

    Handlebars.registerHelper('nav', function (count, selected, options) {
        var numbers = '';
        Array.apply(null, new Array(count))
            .forEach(
                function (v, i) {
                    numbers += options.fn({ number: i + 1, selected: selectedPage === i });
                }
            );
        return numbers;
    });

    function renderPosts() {
        $('.posts-container__list').html(postsTemplate({
            posts: posts.slice(selectedPage * perPage, selectedPage * perPage + perPage)
        }));
    }

    function renderNavigation() {
        $('.posts-container__navigation').html(navigationTemplate({
            count: Math.ceil(posts.length / perPage),
            selected: selectedPage
        }));
    }

    function subscribeHandlers() {
        $('.posts-container__list').click(function (event) {
            var id = $(event.target).closest('.post-preview').data('id');
            if (id === undefined) {
                return;
            }
            window.location = '/post.html?id=' + id;
        });
        $('.posts-container__navigation').click(function (event) {
            var selected = $(event.target).data('id') - 1;
            if (selected === selectedPage) {
                return;
            }

            selectedPage = selected;

            renderPosts();
            renderNavigation();

            $('html, body').animate({ scrollTop: 0 }, 0);
        });

    }

    function render() {
        renderPosts();
        renderNavigation();
        subscribeHandlers();
    }

    render();
});

