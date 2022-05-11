$(function () {
	if ($('.main_slide_wrapper').length > 0) {
		var swiper = new Swiper('.myswiper', {
			slidesPerView: 1,
			spaceBetween: 25,
			loop: true,
			width: 270,
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
		});
	}
	//홈 카테고리 슬라이드
	if ($('.category_menus').length > 0) {
		var menuswiper = new Swiper('.category_menus', {
			slidesPerView: 2.5,
			spaceBetween: 27,
		});
	}

	// 뒤로가기
	$('.go_back').click((e) => {
		e.preventDefault();
		if (window.history.length > 1) {
			window.history.go(-1);
		} else {
			location.href = '../index.html';
		}
	});

	//Aside menu
	if ($('.aside_menu_toggle').length) {
		var asideToggleBtn = $('.aside_menu_toggle');
		asideToggleBtn.click(function () {
			$('body').toggleClass('aside_active');
		});
		//Aside menu Accodian
		var asideMenuList = $('.categories > li');
		asideMenuList.click(function () {
			$(this).find('ul').slideToggle();
			$(this).siblings('li').find('ul').slideUp();
		});
	}

	// 상세페이지 썸네일 쓸라이드
	if ($('.product_thumb').length > 0) {
		var swiper = new Swiper('.product_thumb_container', {
			slidesPerView: 2.5,
			spaceBetween: 13,
		});
	}

	// 상세페이지 썸네일 이미지 변경
	var thumbImg = $('.product_thumb_slides li img');
	var targetImg = $('.product_img_top img');
	thumbImg.click(function () {
		var targetImgUrl = $(this).attr('src');
		targetImg.attr('src', targetImgUrl);
	});

	//상세페이지 별표
	if ($('.review_content').length) {
		var rating = $('.review_content li .rating');
		rating.each(function () {
			var starScore = $(this).attr('data-rate');
			$(this)
				.find('i:nth-child(-n +' + starScore + ')')
				.css({ color: '#f05522' });
		});
	}
});
