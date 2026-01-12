//WOW init
new WOW().init();

// Sticky Menu 
$(window).scroll(function () {
	if ($(".navigation").offset().top > 100) {
		$(".navigation").addClass("nav-bg");
	} else {
		$(".navigation").removeClass("nav-bg");
	}
});

// Background-images
$("[data-background]").each(function () {
	$(this).css({
		"background-image": "url(" + $(this).data("background") + ")",
	});
});

// background color
$("[data-color]").each(function () {
	$(this).css({
		"background-color": $(this).data("color"),
	});
});

// progress bar
$("[data-progress]").each(function () {
	$(this).css({
		bottom: $(this).data("progress"),
	});
});

// testimonial-slider
$(".testimonial-slider").slick({
	dots: true,
	infinite: true,
	speed: 300,
	slidesToShow: 1,
	arrows: false,
	adaptiveHeight: true,
});

// clients logo slider
$(".client-logo-slider").slick({
	infinite: true,
	slidesToShow: 5,
	slidesToScroll: 1,
	autoplay: true,
	dots: false,
	arrows: false,
	responsive: [
		{
			breakpoint: 1024,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 1,
			},
		},
		{
			breakpoint: 600,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 1,
			},
		},
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
			},
		},
		{
			breakpoint: 400,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			},
		},
	],
});

// scroll-spy
let sectionIds = $("header.navigation a.nav-link");
$(document).scroll(function () {
	sectionIds.each(function () {
		let container = $(this).attr("href");
		let containerOffset = $(container).offset().top;
		let containerHeight = $(container).outerHeight();
		let containerBottom = containerOffset + containerHeight;
		let scrollPosition = $(document).scrollTop();

		if (
			scrollPosition < containerBottom - 20 &&
			scrollPosition >= containerOffset - 20
		) {
			$(this).parent().addClass("active");
		} else {
			$(this).parent().removeClass("active");
		}
	});
});