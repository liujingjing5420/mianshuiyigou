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
								data-original="//img.mianshui365.com/upload/af/3a/64/af3a64d2fb7b9203e79e424643e5d58b.jpg@200h_200w_90q_1wh"
								src="${value.url}"
								style="display: block;">
						</dt>
						<dd class="brand text-ellipsis1">${value.title}</dd>
						<dd class="name text-ellipsis1">${value.des}</dd>
						<dd class="price price-act">¥${value.price}</dd>
					</dl>
					<div class="all_cut_2">每满1000<br>减140</div>
				</a>
			</li>
            `;
        });
        $goodsl.html(htmlstr);
    }).fail(function (data) {
        console.log(data);
    });
})(jQuery);