; !function ($) {
    //获取cookie中所存的购物车商品的信息，渲染。
    if ($.cookie('goodsid') && $.cookie('goodsnums')) {
        let arrid = $.cookie('goodsid').split(',');
        let arrnums = $.cookie('goodsnums').split(',');
        let htmlstr = '';
        $.ajax({
            url: 'http://10.31.158.39:8088/javascript/mianshuiyigou/php/piclist.php',
            dataType: 'json',
        }).done(function (data) {
            $.each(arrid, function (index1, value1) {
                $.each(data, function (index2, value2) {
                    if (value1 === value2.picid) {
                        const $cloneTable = $('.needed').first().clone(true);
                        $cloneTable.css('display', 'block');
                        $('.cuxiao1').append($cloneTable);
                        $cloneTable.find('.td343 dl dd img').attr('src', value2.url + '?picid=' + value2.picid);
                        $cloneTable.find('.td343 dl dd alt').attr('alt', value2.des);
                        $cloneTable.find('.color1').html(value2.title);
                        $cloneTable.find('.color2').html(value2.des);
                        $cloneTable.find('.color11 strong').html(value2.price);
                        $cloneTable.find('.jiajia input').attr('value', arrnums[index1]);
                    }
                })
            })
            const $price = $('.cuxiao1 table').find('.color11');
            $price.not($price.first()).each(function (index, value) {
                let price = $(this).find('strong').html();
                console.log(price);
                let num = $(this).parents('table').next().find('.val').val();
                console.log(num);
                let $sum = $(this).parents('table').next().find('.lajix');
                $sum.html(Number(price) * Number(num));
            })

        });
        // 购物车页面商品数量的变化
        $('.cuxiao1').on('click', '.add', function () {
            let num = $(this).prev().val();
            num++;
            $(this).prev().val(num);
            // 将改变后商品的数量存入cookie中
            let picid = $(this).parents('tr').find('.td343 dl dd img').attr('src').split('?')[1].slice(6);
            let index = $.inArray(picid, arrid);
            if (arrnums[index] !== $(this).prev().val()) {
                arrnums[index] = $(this).prev().val();
                $.cookie('goodsnums', arrnums.toString());
            }
        })
        $('.cuxiao1').on('click', '.reduce', function () {
            let num = $(this).next().val();
            num--;
            if (num <= 1) {
                num = 1;
            }
            $(this).next().val(num);
            // 将改变后商品的数量存入cookie中
            let picid = $(this).parents('tr').find('.td343 dl dd img').attr('src').split('?')[1].slice(6);
            let index = $.inArray(picid, arrid);
            if (arrnums[index] !== $(this).next().val()) {
                arrnums[index] = $(this).next().val();
                $.cookie('goodsnums', arrnums.toString());
            }
        })


        // 删除商品
        $('.cuxiao1').on('click', '.sj', function () {
            console.log(this);
            const $parents = $(this).parents('table');
            // 将删除的商品从cookie中删掉
            let picid = $parents.find('.td343 dl dd img').attr('src').split('?')[1].slice(6);
            let index = $.inArray(picid, arrid);
            arrid.splice(index, 1);
            arrnums.splice(index, 1);
            $.cookie('goodsid', arrid.toString());
            $.cookie('goodsnums', arrnums.toString());
            $parents.css({
                display: 'none'
            })
        })

        // 全选按钮的实现
        // 全选按钮
        const $checkall = $('.checkall');

        // 点击全选实现商品的全选
        $checkall.on('click', function () {
            const $checkone = $(this).parents('#bottomdiv-wrap').prev().children('.cuxiao1').children('table').find('.checkone');
            // console.log($checkone.size());
            if ($checkall.attr('checked')) {
                $checkone.each(function (index, value) {
                    $(this).removeAttr('checked');
                })
                $checkall.removeAttr('checked');
            } else {
                $checkone.not($checkone.first()).each(function (index, value) {
                    $(this).attr('checked', 'true');
                    window.location.reload();
                })
                $checkall.attr('checked', 'true');
            }
        })
        // 当某个商品处于不选中的状态的时候，将全选按钮取消勾选
        $('.cuxiao1').on('click', '.checkone', function () {
            if ($(this).attr('checked')) {
                $(this).removeAttr('checked');
                $checkall.removeAttr('checked');
            } else {
                $(this).attr('checked', 'true');
            }
            const $checkone = $(this).parents('.cuxiao1').find('table').find('.checkone');
            let flag = true;
            $checkone.not($checkone.first()).each(function (index, value) {
                if (!$(this).attr('checked')) {
                    flag = false;
                }
            })
            // console.log(flag);
            if (flag) {
                $checkall.attr('checked', 'true');
                window.location.reload();
            }
        })

    } else {
        let htmlstr = '';
        htmlstr += `<div class="empty">您的购物车什么都没有，快去<a href="index111.html">购物</a>吧~</div>`;
        $('.cuxiao1').html(htmlstr);
        $('.block-deliver').css('display', 'none');
        $('.tiaomu').css('display', 'none');
        $('#bottomdiv-wrap').css('display', 'none');
    }
}(jQuery);