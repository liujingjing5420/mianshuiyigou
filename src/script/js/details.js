; !function ($) {
    // 详情页渲染相应的商品
    picid = location.search.slice(1).split('=')[1];
    const $smallpic = $('.large-box img');
    const $bigpic = $('.zoom-box img');
    $.ajax({
        url: 'http://10.31.158.39:8088/javascript/mianshuiyigou/php/details.php',
        dataType: 'json',
        data: {
            id: picid
        }
    }).done(function (data) {
        $smallpic.attr('src', data.url);
        // $bigpic.css('background-image', 'url(' + data.url + ')');
        $bigpic.attr('src', data.url);
        $bigpic.css({
            width: 800,
            height: 800
        })
        $('.title').html(`<a class="orange" href="//s.mianshui365.com/brand/329.html">${data.title}</a>
        <br/>${data.des}`);
        $('.price').html('￥' + data.price);
        $('.on a img').attr('src', data.url);
    });

    // 增加减少商品数量
    const $add = $('.add');
    const $reduce = $('.reduce');
    const $val = $('.val');
    $add.on('click', function () {
        let num = Number($val.html());
        num++;
        $val.html(num);
    });
    $reduce.on('click', function () {
        let num = Number($val.html());
        num--;
        if (num <= 1) {
            num = 1;
        }
        $val.html(num);
    })

    //点击购物车将商品加入购物车，添加至cookie中
    const $btnaddcart = $('#btnAddCart');
    $btnaddcart.on('click', function () {
        // 显示加入成功的页面
        const $maskDiv = $('.maskDiv');
        const $dialog = $('.dialog');
        const $btncon = $('.btncon');
        const $btnstop = $('.btnstop');
        $maskDiv.show();
        $dialog.show();
        $btncon.on('click', function () {
            $maskDiv.hide();
            $dialog.hide();
        })
        // 存取cookie值
        if ($.cookie('goodsid') && $.cookie('goodsnums')) {
            let arrid = $.cookie('goodsid').split(',');
            let arrnums = $.cookie('goodsnums').split(',');
            if ($.inArray(picid, arrid) !== -1) {
                let index = $.inArray(picid, arrid);
                arrnums[index] = Number(arrnums[index]) + Number($val.html());
                $.cookie('goodsnums', arrnums.toString());
                return false;
            } else {
                arrid.push(picid);
                arrnums.push($val.html());
                $.cookie('goodsid', arrid.toString());
                $.cookie('goodsnums', arrnums.toString());
                return false;
            }
        } else {
            $.cookie('goodsid', picid);
            $.cookie('goodsnums', $val.html());
        }
    })

    //放大镜效果(visibility无法隐藏元素)
    $('.large-box').on('mouseover', function () {
        $('.zoom-point').show();
        $('.zoom-box').show();
        $(document).on('mousemove', function (ev) {
            $('.zoom-point').css({
                position: 'absolute',
                left: ev.clientX - $('.large-box').offset().left - 100,
                top: ev.clientY - $('.large-box').offset().top - 100,
            })
            if ($('.zoom-point').position().left <= 0) {
                $('.zoom-point').css('left', 0);
            }
            if ($('.zoom-point').position().top <= 0) {
                $('.zoom-point').css('top', 0);
            }
            if ($('.zoom-point').position().left >= 200) {
                $('.zoom-point').css('left', 200);
            }
            if ($('.zoom-point').position().top >= 200) {
                $('.zoom-point').css('top', 200);
            }
            const $bigpic = $('.bigpic');
            $bigpic.css({
                position: 'absolute',
                left: -2 * $('.zoom-point').position().left,
                top: -2 * $('.zoom-point').position().top
            })

        })
    })
    $('.large-box').on('mouseout', function () {
        $('.zoom-point').hide();
        $('.zoom-box').hide();
    })

    // 
}(jQuery)