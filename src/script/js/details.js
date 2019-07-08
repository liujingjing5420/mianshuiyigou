; !function ($) {
    picid = location.search.slice(1).split('=')[1];
    const $smallpic = $('.large-box img');
    const $bigpic = $('.zoom-box');
    $.ajax({
        url: 'http://10.31.158.39:8088/javascript/mianshuiyigou/php/details.php',
        dataType: 'json',
        data: {
            id: picid
        }
    }).done(function (data) {
        console.log(data.url);
        $smallpic.attr('src', data.url);
        $bigpic.attr('background-image', 'url(' + data.url + ')');
        $('.title').html(`<a class="orange" href="//s.mianshui365.com/brand/329.html">${data.title}</a>
        <br/>${data.des}`);
        $('.price').html('￥' + data.price);
        // $('.title').text(data.des);
    });

}(jQuery)