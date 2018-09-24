function autosize() {
	var control = $('textarea.form-control');

	if (control.length) {
		control.textareaAutoSize();
	}
}

function controlEffect() {
	var control = $('.form-group .form-control');

	if (control.length) {
		control.focusout(function(){
			var item = $(this);

			if(item.val() != ""){
				item.addClass("has-content");
			}else{
				item.removeClass("has-content");
			}
		});
	}

}

function sliderTeam() {
	var slider = $('.js_slider-team'),
		arrows = $('.module-team__arrows');

	if (slider.length) {
		slider.slick({
			dots: false,
			draggable: false,
			infinite: true,
			speed: 800,
			slidesToShow: 2,
			slidesToScroll: 1,
			appendArrows: arrows,
			prevArrow: '<span class="module-team__prev"><svg class="icon icon-prev"><use xlink:href="#icon-prev"></svg></span>',
			nextArrow: '<span class="module-team__next"><svg class="icon icon-next"><use xlink:href="#icon-next"></svg></span>',
			responsive: [
				{
					breakpoint: 767,
					settings: {
						slidesToShow: 1,
						draggable: true,
						arrows: false,
						infinite: false
					}
				},
			]
		});
	}
}

function getScrollBarWidth() {
	var w1 = window.innerWidth,
		w2 = document.documentElement.clientWidth;
	return (w1 - w2);
}

function panel() {
	var burger = $('.js_burger'),
		scrollBarWidth = getScrollBarWidth(),
		menuTime,
		menuTimer,
		linksTimer,
		panelTimer,
		panelTime;

	function detectMenu() {
		if ($('.main-menu').css("display") == "none") {
			menuTime = 600;
			panelTime = 800;
		} else {
			menuTime = 1400;
			panelTime = 1000;
		}
	}

	detectMenu();

	$(window).on('resize', function() {
		detectMenu();
	});

	function openPanel(link) {
		link.addClass('burger_active');
		clearTimeout(panelTimer);
		$('html').addClass('open-panel');
		$('.layout-header, .layout').css('margin-right', scrollBarWidth+'px');
		window.scrollTo(0,0);

		linksTimer = setTimeout(function() {
			$('.layout-panel .footer-links').addClass('animate');
			$('.layout-header').addClass('layout-header_color');
		},1200);

		menuTimer = setTimeout(function() {
			$('.menu-success__links').addClass('animate');
		},menuTime);
	}

	function closePanel(link) {
		$('html').addClass('open-panel_close');
		window.scrollTo(0,0);
		clearTimeout(linksTimer);
		clearTimeout(menuTimer);

		$('.layout-panel .footer-links').removeClass('animate');
		$('.menu-success__links').removeClass('animate');
		$('.layout-header, .layout').css('margin-right', 0);
		$('.layout-header').removeClass('layout-header_color');

		link.removeClass('burger_active');

		panelTimer = setTimeout(function() {
			$('html').removeClass('open-panel');
			$('html').removeClass('open-panel_close');
		},panelTime);

	}


	burger.on('click', function() {
		var link = $(this);

		if (link.hasClass('burger_active')) {
			closePanel(link);
		} else {
			openPanel(link);
		}

		return false;

	});

	$(document).on('keyup',function(e) {
		if (e.keyCode == 27) {
			closePanel(burger);
		}
	});
}

function menuSuccess() {
	var menuPreview = $('.menu-success__preview'),
		menuLink = $('.menu-success__link');

	menuLink.on('mouseenter', function() {
		var linkPreview = $(this).data('preview'),
			item = $(this);

		item.attr("hovered", true);

		setTimeout(function(){
			if(item.attr("hovered") == 'true') {
				menuPreview.css('background-image', 'url(' + linkPreview + ')').addClass('show');
			}
		}, 200);

	});

	menuLink.on('mouseleave', function() {
		var item = $(this);

		item.attr("hovered", false);
		menuPreview.removeAttr('style').removeClass('show');
	});

}

function wiki() {
	var headline = $('.module-wiki__head'),
		close = $('.module-wiki__close');

	headline.on('click', function(e) {
		e.preventDefault();
		var item = $(this),
			hash = item.attr('href');


		if(history.pushState) {
			history.pushState(null, null, hash);
		}
		else {
			location.hash = hash;
		}


		if (item.closest('.module-wiki__item').hasClass('module-wiki_open')) {
			item.closest('.module-wiki__item').removeClass('module-wiki_open');
			item.next('.module-wiki__body').stop(true, true).slideUp(200);
		} else {
			item.closest('.module-wiki__item').addClass('module-wiki_open');
			item.next('.module-wiki__body').stop(true, true).slideDown(200);
		}



	});

	close.on('click', function() {
		var item = $(this);

		item.closest('.module-wiki__item').removeClass('module-wiki_open');
		item.closest('.module-wiki__body').stop(true, true).slideUp(200);
	});
}

function sliderDefault() {
	var gallery = $('.slider-default'),
		arrows = $('.module-gallery__nav');

	if (gallery.length) {

		gallery.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
			var counter = $('.module-gallery__counter'),
				i = (currentSlide ? currentSlide : 0) + 1;

			if (counter.length) {
				$('.counter__start').text(i);
				$('.counter__end').text(slick.slideCount);
			}

		});

		gallery.on('init reInit beforeChange', function (event, slick, currentSlide, nextSlide) {
			var headline = $('.module-gallery__headline'),
				i = (nextSlide ? nextSlide : 0) + 1;

			if (headline.length) {
				var title = $('.slider-default .slider-default__item').eq(i).data('headline');
				headline.text(title);
			}

		});


		gallery.slick({
			dots: false,
			infinite: true,
			speed: 800,
			slidesToShow: 1,
			slidesToScroll: 1,
			appendArrows: arrows,
			prevArrow: '<span class="nav-arrows__link"><svg class="icon icon-prev"><use xlink:href="#icon-prev"></svg></span>',
			nextArrow: '<span class="nav-arrows__link"><svg class="icon icon-next"><use xlink:href="#icon-next"></svg></span>'
		});

	}
}

function fileUpload() {
	var linkUpload = $(''),
		linkUrl = $('.js_file-link'),
		linkClear = $('.js_file-clear');

	$('#upload-control').change(function() {
		var filepath = this.value;
		var m = filepath.match(/([^\/\\]+)$/);
		var filename = m[1];
		$(this).closest('.file-upload').find('.form-control').val(filename).focus();
		$(this).closest('.file-upload').addClass('file-upload_change');
	});

	linkUrl.on('click', function() {
		$(this).closest('.file-upload').addClass('file-upload_change');
		$(this).closest('.file-upload').find('.form-control').focus();
		return false;
	});

	linkClear.on('click', function() {
		$(this).closest('.file-upload').removeClass('file-upload_change');
		$(this).closest('.file-upload').find('.form-control').val('').focusout();;
		return false;
	});
}

function smoothScroll() {
	var linkHash = window.location.hash,
		sectionWiki = $('.module-wiki');

	if ($(linkHash).length && !sectionWiki) {
		$('html, body').animate({
			scrollTop: $(linkHash).offset().top
		}, 800, 'linear');
	}

	$('a[data-scroll]').on('click', function (e) {
		e.preventDefault();

		$('html, body').animate({
			scrollTop: $($(this).data('scroll')).offset().top
		}, 800, 'linear');
	});
}

function videoAutoPlay() {
	var obj = '.module-media__video';

	if ($(obj).length) {
		inView.offset(200);

		inView(obj).on('enter', function(el) {
			el.play();
		})
		.on('exit', function(el) {
			el.pause();
		});
	}

}

function animatePage() {
	var sectionMainList = $('.section-main .list-inline'),
		listAnimate = 'list-inline_animate';

	$('html').addClass('layout-animate');

	if (sectionMainList.length) {
		setTimeout(function() {
			sectionMainList.addClass(listAnimate);
		},1200);
	}

}

function pagePreloader() {
	var preloaderContainer = $('.layout-preloader'),
		preloaderOpen = $('.layout-preloader__open'),
		preloaderChange = $('.layout-preloader__change'),
		// example
		linkChange = $('#pages a, .logo-qbt');

	if (preloaderOpen.length) {
		preloaderOpen.addClass('active');
		setTimeout(function() {
			preloaderContainer.hide();
			preloaderOpen.removeClass('active');
			animatePage();
		},600);
	}

	if (preloaderChange.length) {

		linkChange.on('click', function(e) {
			e.preventDefault();

			var linkHref = this.href;
			preloaderOpen.hide();
			preloaderContainer.show();
			preloaderChange.addClass('active');

			setTimeout( function() {
				window.location = linkHref;
			}, 1200);
		});

	}
}

function animateScrollText() {
	var objText = '.js_animate';

	if ($(objText).length) {
		inView(objText).on('enter', function(el) {
			el.classList.add('animate-fade-complete');
		});
	}
}

function backgroundFixed() {
	if(navigator.userAgent.match(/Trident\/7\./)) {
		document.body.addEventListener("mousewheel", function() {
			event.preventDefault();
			var wd = event.wheelDelta;
			var csp = window.pageYOffset;
			window.scrollTo(0, csp - wd);
		});
	}
}

function moduleShare() {
	var share = $('.module-share');

	if ($('html').hasClass('touchevents')) {
		$('.module-share__body').on('click', function() {
			var item = $(this),
				container = $(this).closest('.module-share');

			if (container.hasClass('module-share_open')) {
				container.removeClass('module-share_open');
			} else {
				container.addClass('module-share_open');
			}

			return false;
		});

		$('.module-share .icon-plus').on('click', function() {
			var item = $(this),
				container = item.closest('.module-share');

			if (container.hasClass('module-share_open')) {
				container.removeClass('module-share_open');
			} else {
				container.addClass('module-share_open');
			}

			return false;
		});
	}
}

function supportsVideoType(type) {
	var video;

	var formats = {
		ogg: 'video/ogg; codecs="theora"',
		h264: 'video/mp4; codecs="avc1.42E01E"',
		webm: 'video/webm; codecs="vp8, vorbis"',
		vp9: 'video/webm; codecs="vp9"',
		hls: 'application/x-mpegURL; codecs="avc1.42E01E"'
	};

	if(!video) {
		video = document.createElement('video')
	}

	return video.canPlayType(formats[type] || type);
}

function getMobileOperatingSystem() {
	var userAgent = navigator.userAgent || navigator.vendor || window.opera;

	if (/windows phone/i.test(userAgent)) {
		return "Windows Phone";
	}

	if (/android/i.test(userAgent)) {
		return "Android";
	}

	if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
		return "iOS";
	}

	return "unknown";
}

function videoSupport() {
	var os = getMobileOperatingSystem();

	if(supportsVideoType('h264') === "probably") {
		if (os == 'Android') {
			$('html').addClass('player-disable');
		}
	} else {
		$('html').addClass('player-disable');
	}
}

function sliderTeamMobile() {
	var slider = $('.js_team');

	if (slider.length) {

			function initSlider(sliderFlag) {
				if (sliderFlag == true ) {
					if (slider.hasClass('slick-initialized')) {
						return false;
					} else {
						slider.slick({
							arrows: false,
							slidesToShow: 1,
							slidesToScroll:1,
							dots: false,
							adaptiveHeight: true
						});
					}
				}

				if (sliderFlag == false && slider.hasClass('slick-initialized')) {
					slider.slick('unslick');
				}
			}

			function sliderDetect() {
				var burger = $('.burger');

				if (burger.css("display") == "block") {
					var sliderFlag = true;
					initSlider(sliderFlag);
				} else {
					var sliderFlag = false;
					initSlider(sliderFlag);
				}
			}

			function resizePage() {
				sliderDetect();

				$(window).on('resize', function() {
					sliderDetect();
				});
			}

			resizePage();

		}
}

function wikiHash() {
	var wiki = $('.module-wiki'),
		hashInit = window.location.hash;


	function openWiki(hashInit) {
		var item = $(hashInit);

		if (item.hasClass('module-wiki_open')) {
			return false;
		}

		$('html, body').animate({
			scrollTop: $(item).offset().top - 100
		}, 600, 'linear');

		item.addClass('module-wiki_open');
		item.find('.module-wiki__body').stop(true, true).slideDown(200);
	}

	if ($(hashInit).length && wiki.length) {
		openWiki(hashInit);
	}

	$( window ).on( 'hashchange', function( e ) {
		var hash = window.location.hash;
		openWiki(hash);
	} );

}

function buttonScrollTop() {
	var button = $('.js_scroll-top');


	$(window).scroll(function() {

		var positionTop = $(this).scrollTop();

		if (positionTop > 200 ) {
			button.addClass('scroll-top_show');
		} else {
			button.removeClass('scroll-top_show');
		}
	});

	button.on('click', function() {
		$('html, body').animate({
			scrollTop: 0
		}, 800);
		return false;
	});
}

$(document).ready(function() {
	autosize();
	controlEffect();
	sliderTeam();
	sliderTeamMobile();
	panel();
	menuSuccess();
	wiki();
	wikiHash();
	sliderDefault();
	fileUpload();
	smoothScroll();
	videoAutoPlay();
	pagePreloader();
	animateScrollText();
	backgroundFixed();
	moduleShare();
	videoSupport();
	supportsVideoType();
	buttonScrollTop();
});
