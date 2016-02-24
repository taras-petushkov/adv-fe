(function () {
    var global = window;
    global.Data = {
        getUser: function (userId) {
            return users.filter(function (user) {
                return user.id == userId;
            })[0];
        },
        getPosts: function () {
            return posts;
        },
        getRelatedPosts: function () {
            return posts.slice(5, 14);
        },
        getPostComments: function () {
            return [{
                username: 'Nick',
                text: "She's hot!"
            }, {
                username: 'Taras',
                text: '+1'
            }]
        },
        getCurrentPost: function () {
            // parse ?id=2 => 2
            var id = location.search.slice(1).split('=')[1];
            return this.getPost(id);
        },
        getPost: function (id) {
            return ( id ? posts.filter(function (post) {
                return post.id == id;
            }) : this.getPosts() )[0];
        }
    };

    var posts = [
        {
            "imgUrl": "http://www.fashionreview.com.au/images/cylk/cylk-luxury-womens-fashion-01.jpg",
            "likeCount": 0,
            "description": "A little flat lay inspiration for the stylish dresser who is looking for a timeless look.",
            "userId": "aab",
            "id": "738"
        },
        {
            "imgUrl": "http://cdn.shopify.com/s/files/1/0115/5832/products/PRI-Chainmail-Leggings-1-WEB_1024x1024.jpg",
            "likeCount": 0,
            "description": "Den Look kaufen:  <a href=\"https://lookastic.de/herrenmode/wie-kombinieren/pullover-mit-rundhalsausschnitt-chinohose-bootsschuhe-rucksack-uhr/1076\" rel=\"nofollow\" target=\"_blank\">lookastic.de/...</a>  — Weißer und dunkelblauer horizontal gestreifter Pullover mit Rundhalsausschnitt  — Beige Chinohose  — Blaue Segeltuch Bootsschuhe  — Beige Rucksack  — Weiße keramische Uhr",
            "userId": "aaa",
            "id": "839"
        },
        {
            "imgUrl": "http://n3.sdlcdn.com/imgs/a/l/4/Juliet-Orange-Cotton-Lycra-Leggings-SDL219819182-1-ae173.jpg",
            "likeCount": 0,
            "description": "<a class=\"pintag\" href=\"/explore/hairstyles/\" title=\"#hairstyles explore Pinterest\">#hairstyles</a>",
            "userId": "aac",
            "id": "840"
        },
        {
            "imgUrl": "http://www.forever21.com/images/default_750/00098882-06.jpg",
            "likeCount": 0,
            "description": "Under cut with shaved bottom and very little graduation to next section and no graduation between side and top",
            "userId": "aac",
            "id": "541"
        },
        {
            "imgUrl": "http://embracelingerie.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/e/m/embrace_lingerie_slimming_blue_leggings___full_portr_1.jpg",
            "likeCount": 0,
            "description": "For a comfortable-as-your-couch outfit, consider wearing a dark brown wool blazer and navy jeans. Finish it off with dark brown suede derby shoes. Shop this look for $297: <a href=\"http://lookastic.com/men/looks/derby-shoes-and-jeans-and-scarf-and-blazer-and-bow-tie-and-dress-shirt-and-shawl-cardigan-and-sunglasses/4130\" rel=\"nofollow\" target=\"_blank\">lookastic.com/...</a> — Dark Brown Suede Derby Shoes — Navy Jeans — Charcoal Scarf — Dark Brown Wool Blazer — Red Plaid Bow-tie — White Dress Shirt — Charcoal Shawl Cardigan — Dark Brown ...",
            "userId": "aab",
            "id": "742"
        },
        {
            "imgUrl": "https://dm.victoriassecret.com/product/404x539/V436222.jpg",
            "likeCount": 0,
            "description": "",
            "userId": "aaa",
            "id": "443"
        },
        {
            "imgUrl": "https://dm.victoriassecret.com/product/224x299/V566401.jpg",
            "likeCount": 0,
            "description": "49 New Hairstyles For Men For 2016 <a href=\"http://www.menshairstyletrends.com/49-new-hairstyles-for-men-2016/\" rel=\"nofollow\" target=\"_blank\">www.menshairstyle...</a>",
            "userId": "aaa",
            "id": "444"
        },
        {
            "imgUrl": "https://s-media-cache-ak0.pinimg.com/736x/fc/e7/61/fce76167c34e53ff9b005e44e95d988d.jpg",
            "likeCount": 0,
            "description": "Isaac is meant to be this attractive artist guy so this is how he should look. So, when we first seen him in the play he should be casual because he just came to speak with Emily.",
            "userId": "aab",
            "id": "145"
        },
        {
            "imgUrl": "http://lopatin.ru/image/cache/data/leggins/leggins_4315-750x750.jpg",
            "likeCount": 0,
            "description": "MEN BANANA REPUBLIC LUXURY",
            "userId": "aaa",
            "id": "846"
        },
        {
            "imgUrl": "http://lyraactivewear.com/shop/images/3070/Workout-Leggings-Blue-3.jpg",
            "likeCount": 0,
            "description": "The epitome of cool. <a class=\"pintag\" href=\"/explore/menswear/\" title=\"#menswear explore Pinterest\">#menswear</a> <a class=\"pintag searchlink\" data-query=\"%23streetstyle\" data-type=\"hashtag\" href=\"/search/?q=%23streetstyle&amp;rs=hashtag\" rel=\"nofollow\" title=\"#streetstyle search Pinterest\">#streetstyle</a> <a class=\"pintag searchlink\" data-query=\"%23streetfashion\" data-type=\"hashtag\" href=\"/search/?q=%23streetfashion&amp;rs=hashtag\" rel=\"nofollow\" title=\"#streetfashion search Pinterest\">#streetfashion</a>",
            "userId": "aac",
            "id": "647"
        },
        {
            "imgUrl": "http://lyraactivewear.com/shop/images/4743/Leggings_workout.jpg",
            "likeCount": 0,
            "description": "Yeezy Boost 350. Legendary.",
            "userId": "aaa",
            "id": "548"
        },
        {
            "imgUrl": "http://www.bflyactivewear.com/media/catalog/product/cache/1/image/1200x1500/9df78eab33525d08d6e5fb8d27136e95/p/r/prism-sport-medallion-print-legging-back.jpg",
            "likeCount": 0,
            "description": "Men's fashion",
            "userId": "aaa",
            "id": "349"
        },
        {
            "imgUrl": "http://images.express.com/is/image/expressfashion/new_85_916_6053_058",
            "likeCount": 0,
            "description": "faded hairstyle",
            "userId": "aac",
            "id": "250"
        },
        {
            "imgUrl": "https://img2.wbstatic.net/big/new/720000/723202-1.jpg",
            "likeCount": 0,
            "description": "Artisan Matte Black Onyx Yoga Mala Bracelet | Unisex Wrist Mala | Men Beads | Spiritual Bracelet | Healing Stone | Mala Beads | Men Mala |",
            "userId": "aac",
            "id": "451"
        },
        {
            "imgUrl": "https://img1.wbstatic.net/big/new/590000/594433-1.jpg",
            "likeCount": 0,
            "description": "How to Tie a Bow Tie.",
            "userId": "aaa",
            "id": "552"
        },
        {
            "imgUrl": "https://img1.wbstatic.net/big/new/1240000/1247877-1.jpg",
            "likeCount": 0,
            "description": "love the asymmetry and the texture!",
            "userId": "aaa",
            "id": "553"
        },
        {
            "imgUrl": "http://www.modobzor.ru/wp-content/uploads/modobzor_ru/2011/08/r81_1_enl_enl.jpg",
            "likeCount": 0,
            "description": "",
            "userId": "aac",
            "id": "854"
        },
        {
            "imgUrl": "http://media.nn.ru/data/ufiles/16/76/39/5433fe13e649a_10121391w640h640leginsi3high.jpg",
            "likeCount": 0,
            "description": "The definitive guide to dress shoes",
            "userId": "aaa",
            "id": "055"
        },
        {
            "imgUrl": "http://man4womanblog.org.ua/images/moda2/leggins-korotki-2.jpg",
            "likeCount": 0,
            "description": "5 ways to wear a sport coat, men's style inspiration from Style Girlfriend",
            "userId": "aaa",
            "id": "456"
        },
        {
            "imgUrl": "http://legginsy.ioksana.ru/uploads/gallery/49/kak-nosit-legginsy10.jpg",
            "likeCount": 0,
            "description": "If youre not running, dont wear running shoes <a class=\"pintag searchlink\" data-query=\"%23dresslikeaman\" data-type=\"hashtag\" href=\"/search/?q=%23dresslikeaman&amp;rs=hashtag\" rel=\"nofollow\" title=\"#dresslikeaman search Pinterest\">#dresslikeaman</a> <a class=\"pintag\" href=\"/explore/menswear/\" title=\"#menswear explore Pinterest\">#menswear</a> <a class=\"pintag\" href=\"/explore/style/\" title=\"#style explore Pinterest\">#style</a> <a class=\"pintag\" href=\"/explore/inspiration/\" title=\"#inspiration explore Pinterest\">#inspiration</a> | Raddest Men's Fashion Looks On The Internet: <a href=\"http://www.raddestlooks.org\" rel=\"nofollow\" target=\"_blank\">www.raddestlooks.org</a>",
            "userId": "aaa",
            "id": "657"
        },
        {
            "imgUrl": "http://issaplus.com/wa-data/public/shop/products/68/11/1168/images/42/42.300x450.jpg",
            "likeCount": 0,
            "description": "Men's hair. Great profile. \"Thomas came by the studio recently to model for Of a Kind and I could not get over his most recent hair cut. It reminded me of a photo series Norman Parkinson did of Montgomery Clift… and I was obsessed.\"",
            "userId": "aab",
            "id": "458"
        },
        {
            "imgUrl": "http://chudomama.com/purchases/uploads/b40/31f/c9953262fe721835d3b954b888.jpg",
            "likeCount": 0,
            "description": "layered",
            "userId": "aab",
            "id": "459"
        },
        {
            "imgUrl": "http://chudomama.com/purchases/uploads/b32/6d6/a8dff361b9479a22673fae7d45.jpg",
            "likeCount": 0,
            "description": "Drybar Treatment Oil - 100 PROOF. Great for eliminating frizz on straight hair",
            "userId": "aac",
            "id": "460"
        },
        {
            "imgUrl": "http://cs9621.vk.me/u147672157/-14/x_60366d77.jpg",
            "likeCount": 0,
            "description": "Women with great hair do exactly 12 things each day.",
            "userId": "aaa",
            "id": "761"
        },
        {
            "imgUrl": "http://i41.woman.ru/womanru/images/article/0/c/img_0c18c048e32eab2d737d2e2b93ad8b3d.jpg?02",
            "likeCount": 0,
            "description": "How To Tie a Tie Trinity Knot for your Necktie (+playlist)",
            "userId": "aac",
            "id": "362"
        },
        {
            "imgUrl": "https://img1.wbstatic.net/big/new/1880000/1880575-1.jpg",
            "likeCount": 0,
            "description": "Matching your shirts and ties can be disorienting. Our guide to shirt and tie combos will give you the basics and you'll be a pro in no time.",
            "userId": "aaa",
            "id": "863"
        },
        {
            "imgUrl": "https://cdnb.lystit.com/photos/2013/04/12/nike-dkgreyheathersail-logo-leggings-product-1-7783797-192987368.jpeg",
            "likeCount": 0,
            "description": "",
            "userId": "aab",
            "id": "364"
        },
        {
            "imgUrl": "https://img2.wbstatic.net/big/new/880000/885568-1.jpg",
            "likeCount": 0,
            "description": "Pocket Square tutorial... Great infographic ♔ Style 2",
            "userId": "aaa",
            "id": "465"
        },
        {
            "imgUrl": "http://images.wildberries.by/big/new/910000/919681-1.jpg",
            "likeCount": 0,
            "description": "A brown leather jacket is one item that may top the look of a classic, black leather jacket. Enjoy a fashion inspired collection of brown leather jackets.",
            "userId": "aab",
            "id": "466"
        },
        {
            "imgUrl": "http://europa-fashion.ru/Media/files/filemanager/1525291a.jpg",
            "likeCount": 0,
            "description": "30 Different Ways to Tie a Tie That Every Man Should Know",
            "userId": "aab",
            "id": "867"
        },
        {
            "imgUrl": "http://myleggins.ru/i/myleggins.ru/leggins/ace56a528ad5f5839320efc8e155aaa0.jpg",
            "likeCount": 0,
            "description": "Which shades should I wear?",
            "userId": "aab",
            "id": "468"
        },
        {
            "imgUrl": "https://img2.wbstatic.net/big/new/720000/723202-1.jpg",
            "likeCount": 0,
            "description": "Your Style - Men pinterest.com/pinsbychris fashion, style, clothes, shoes",
            "userId": "aac",
            "id": "269"
        },
        {
            "imgUrl": "http://www.dressterra.ru/images/offer/11227/2/1026272/1026272.jpg",
            "likeCount": 0,
            "description": "16 Stylish Men’s Hats | Hat Style Guide | Man’s Headwear Infographic",
            "userId": "aab",
            "id": "770"
        },
        {
            "imgUrl": "http://www.londonstreet.ru/images/catalog/41/41795/7/0-big.jpg",
            "likeCount": 0,
            "description": "suit",
            "userId": "aab",
            "id": "771"
        },
        {
            "imgUrl": "https://cdnc.lystit.com/photos/2012/01/07/asos-collection-jellybeangreen-asos-ski-pant-trousers-product-1-2673334-819954244.jpeg",
            "likeCount": 0,
            "description": "",
            "userId": "aaa",
            "id": "272"
        },
        {
            "imgUrl": "http://womanadvice.ru/sites/default/files/yarkie_legginsy_3.jpg",
            "likeCount": 0,
            "description": "Welcome to your messages!",
            "userId": "aac",
            "id": "573"
        }
    ];

    var users = [
        {
            "id": "aaa",
            "email": "testuser1@yandex.ua",
            "name": "testuser1",
            "image": "https://scontent-ams2-1.cdninstagram.com/t51.2885-15/e35/12545398_945000835580309_730600571_n.jpg",
            "password": "322e6eeaa1c49cb201a68bcff9b0567399ed4848e3b92046d063690616becaec",
            "following": {
                "tags": [],
                "users": []
            }
        },
        {
            "id": "aab",
            "email": "nickolas.shishov@yandex.ua",
            "name": "okonkwo",
            "image": "https://s-media-cache-ak0.pinimg.com/avatars/horujaya_1428587412_280.jpg",
            "password": "cb0c9e0026a21e8a0d5a163f4ae4a2e4978e22f8bc705840ebdad1a99762bf79",
            "following": {
                "tags": [
                    {
                        "name": "sport",
                        "active": true
                    },
                    {
                        "name": "climbing",
                        "active": true
                    }
                ],
                "users": [
                    {
                        "id": "aaa",
                        "active": true
                    },
                    {
                        "id": "aac",
                        "active": true
                    }
                ]
            }
        },
        {
            "id": "aac",
            "email": "qwerty@yandex.ua",
            "name": "qwerty",
            "image": "https://s-media-cache-ak0.pinimg.com/avatars/horujaya_1428587412_280.jpg",
            "password": "322e6eeaa1c49cb201a68bcff9b0567399ed4848e3b92046d063690616becaec",
            "following": {
                "tags": [],
                "users": []
            }
        }
    ];
})();
