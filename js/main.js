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
		$('.swiper-wrapper').slick({
			dots: false,
			arrows: false,
			infinite: false,
			slidesToShow: 2,
			speed: 300,
			slidesToShow: 1,
			centerMode: false,
			variableWidth: true,
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
	// 장바구니페이지 합계 구하기
	if ($('.cart_list').length) {
		var cartList = $('.cart_list li');
		var targetTotal = $('.total_price .price');
		var shippingCost = parseInt($('.shipping .price').text().replace('$ ', ''));
		var totalPrice = 0;
		var itemDelBtn = cartList.find('.cart_item_del');

		// 열리자마자 계산
		calcTotal();

		// 수량을 바꾸면 합계 다시 계산
		$('.qty input').change(calcTotal);

		// x를 눌러서 item을 삭제해도 다시 계산
		itemDelBtn.click(function (event) {
			const swalWithBootstrapButtons = Swal.mixin({
				customClass: {
					confirmButton: 'btn btn-success',
					cancelButton: 'btn btn-danger',
				},
				buttonsStyling: true,
			});

			swalWithBootstrapButtons
				.fire({
					title: 'Are you sure?',
					text: "You won't be able to revert this!",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonText: 'Yes, delete it!',
					cancelButtonText: 'No, cancel!',
					reverseButtons: true,
				})
				.then((result) => {
					if (result.isConfirmed) {
						swalWithBootstrapButtons.fire(
							'Deleted!',
							'Your item has been deleted.',
							'success'
						);
					} else if (
						/* Read more about handling dismissals below */
						result.dismiss === Swal.DismissReason.cancel
					) {
						swalWithBootstrapButtons.fire(
							'Cancelled',
							'Your cart item is safe :)',
							'error'
						);
					}
				});

			var itemDelSuccessBtn = $('.btn-success');

			itemDelSuccessBtn.click(function () {
				event.target.parentNode.remove();
				reduceItem();
				calcTotal();
			});

			function reduceItem() {
				var cartItems = $('.cart_content h3 span');
				var remainItem = parseInt(cartItems.text().replace(' ITEMS ', ''));
				var remainItemList = cartItems
					.text()
					.replace(remainItem, remainItem - 1);
				cartItems.html(`${remainItemList}`);
			}
		});
		// 합계 구하기 함수
		function calcTotal() {
			cartList = $('.cart_list li');
			totalPrice = 0;
			if (cartList.length > 0) {
				cartList.each(function () {
					var unitPrice = parseInt(
						$(this).find('.unit_price').text().replace('$ ', '')
					);
					var unitCount = $(this).find('input').val();

					// 변수명 totalPrice 해당아이템 각각의 단가 x 개수(uniCount)
					// grandTotal 값을 targetTotal의 내용으로 교체한다
					totalPrice += unitPrice * unitCount;
					var subTotal =
						(totalPrice + shippingCost).toLocaleString('en') + '.00';
					var grandTotal = '$ ' + subTotal;

					targetTotal.text(grandTotal);
				});
			} else {
				targetTotal.text('$ 0.00');
			}
		}
	}
});
