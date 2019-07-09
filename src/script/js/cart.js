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

    } else {
        let htmlstr = '';
        htmlstr += `<div class="empty">您的购物车什么都没有，快去<a href="index111.html">购物</a>吧~</div>`;
        $('.cuxiao1').html(htmlstr);
        $('.block-deliver').css('display', 'none');
        $('.tiaomu').css('display', 'none');
        $('#bottomdiv-wrap').css('display', 'none');
    }

    // 全选按钮的实现
    // 全选按钮
    const $checkall = $('.checkall');
    const $checkone = $('.checkone');
    $checkall.on('click', function () {
        if ($checkall.attr('checked')) {
            $checkall.removeAttr('checked');
            // $checkone.each(function (index, value) {
            //     $(this).removeAttr('checked');
            // })
            console.log($checkone);
            console.log($checkone.attr('checked'));
            // $checkone.removeAttr('checked');
            $checkone.each(function (index, value) {
                // $(this).css('display', 'none');
                alert(value);
            })
        } else {
            $checkall.attr('checked');
            $checkone.each(function (index, value) {
                $(this).attr('checked', false);
            })
        }
    })



}(jQuery);