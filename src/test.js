$(document).ready(function () {
    var posts = Data.getPosts().slice(0, 4);

    var jsonTemplate = Handlebars.compile($('#posts-json-template').html());
    var tableTemplate = Handlebars.compile($('#posts-table-template').html());

    Handlebars.registerHelper('json', function (context) {
        var json = Handlebars.Utils.escapeExpression(JSON.stringify(context, null, ' '));
        return new Handlebars.SafeString("<span style='white-space:pre'>" + json + "</span>");
    });

    Handlebars.registerHelper('table', function (context, options) {
        var result = "";

        for (var i = 0, j = context.length; i < j; i++) {
            var color = i % 2 === 0 ? "#eee" : "#aaa";
            result += "<div style='background-color:" + color + "'>" + options.fn(context[i]) + "</div>";
        }

        return new Handlebars.SafeString(result);
    });

    $('.posts-json').html(jsonTemplate({posts: posts}));
    $('.posts-table').html(tableTemplate({posts: posts}));
});
