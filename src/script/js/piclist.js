; (function ($) {
    // $.get(
    //     "http://localhost:8088/javascript/mianshuiyigou/php/piclist.php",
    //     function (data) {
    //         alert(data);
    //     },
    //     JSON
    // );
    $.ajax({
        url: "http://10.31.158.39:8088/javascript/mianshuiyigou/php/piclist.php",
        dataType: 'json',
    }).done(function (data) {
        // console.log(data);
        const $goodsl = $('.ul-goodsl-list1');
        let htmlstr = '';
        $.each(data, function (index, value) {
            htmlstr += `
            <li class="goods-item">
				<a href="details.html?picid=${value.picid}" target="_blank">
					<dl>
						<dt class="goods-icon">
							<img class="lazy"
                                data-original="${value.url}"
								style="display: block;width:200px;height:200px">
						</dt>
						<dd class="brand text-ellipsis1">${value.title}</dd>
						<dd class="name text-ellipsis1">${value.des}</dd>
						<dd class="price price-act">¥${value.price}</dd>
					</dl>
				</a>
			</li>
            `;
        });
        $goodsl.html(htmlstr);
        !function ($) {
            $(function () {
                $("img.lazy").lazyload({
                    effect: "fadeIn"
                });
            })
        }(jQuery)
    }).fail(function (data) {
        console.log(data);
    });
})(jQuery);