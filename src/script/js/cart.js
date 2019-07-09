; !function ($) {
    let arrid = $.cookie('goodsid').split(',');
    let arrnums = $.cookie('goodsnums').split(',');
    let htmlstr = '';
    console.log(arrid);
    console.log(arrnums);
    $.ajax({
        url: 'http://10.31.158.39:8088/javascript/mianshuiyigou/php/piclist.php',
        dataType: 'json',
    }).done(function (data) {
        console.log(data);
        $.each(arrid, function (index1, value1) {
            $.each(data, function (index2, value2) {
                if (value1 === value2.picid) {
                    htmlstr += `
                    <table>
                        <tbody>
                            <tr>
                                <td class="td30"><input class="checkone" type="checkbox" goods_id="44660" checked="checked" /></td>
                                <td class="td343">
                                    <dl>
                                        <dd>
                                            <img src="${value2.url}"
                                                alt="${value2.des}" style="width:105px;height:105px"/>
                                        </dd>
                                        <dt style="cursor:pointer"
                                            onclick="javascript:window.open('https://item.mianshui365.com/goods__c809280112706.html')">
                                            <p class="color1">${value2.title}</p>
                                            <p class="color2">${value2.des}</p>
                                        </dt>
                                    </dl>
                                </td>
                                <td class="td83">
                                </td>
                                <td class="td159" style="position: relative">
                                    <p class="color11">免税价：<strong>&yen;${value2.price}</strong></p>
                                    <div class="color11 change-activity">
                                        修改促销&gt;
                                    </div>
                                    <div class="change-panel">
                                        <div>
                                            <input type="radio" style="vertical-align: top" name="activityId_44660" goodsid="44660"
                                                activity_code="AI2019070117013205200" checked="" />
                                            <div style="display: inline-block;width: 90%">
                                                每满1000减140&gt;
                                            </div>
                                        </div>
                                        <div>
                                            <input type="radio" style="vertical-align: top" name="activityId_44660" goodsid="44660"
                                                activity_code="-1" />
                                            <div style="display: inline-block;width: 90%">
                                                不使用优惠活动
                                            </div>
                                        </div>
                                        <p style="text-align: center;padding: 10px;"><span class="cp_sub">确认</span><span
                                                class="cp_close" style="background: #999999;margin-left: 50px">取消</span> </p>
                                    </div>
                                    <div class="yzbottom-writebg"></div>
                                </td>
                                <td class="td138">
                                    <p class="jiajia"> 
                                    <a href="javascript:;" class="reduce " id="item-reduce-44660"
                                            goods_id="44660">-</a> 
                                            <input class="val" count="${arrnums[index1]}" value="${arrnums[index1]}" id="item-change-44660"
                                            goods_id="44660" goods_limit="" />
                                             <a href="javascript:;" class="add" id="item-plus-44660" goods_id="44660">+</a> </p>
                                    <p> </p>
                                </td>
                                <td class="td169">
                                    <p><a href="javascript:;" onclick="javascript:goodsCollect(44660,this);" class="lajix">加入收藏</a>
                                    </p>
                                    <p><a href="javascript:;"
                                            onclick="javascript:hmpub.confirm_alert('您确定要从购物车中删除此商品吗?', 'https://www.mianshui365.com/index.php?_a=clearItem&amp;_c=cart&amp;backUrl=%3F_c%3Dcart%26_a%3Dindex&amp;skuid=44660');"
                                            class="sj">删除商品</a></p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    `;
                }
            })
        })
        $('.cuxiao1').html(htmlstr);
    });


}(jQuery);