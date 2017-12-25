$(document).ready(function(){

	"use strict";

    $(".preloader").fadeOut("slow");

    // Main Animations
    var sections = $('.owl-sections');
    sections.owlCarousel({
        singleItem: true,
        autoPlay: false,
        navigation: false,
        pagination: false,
        slideSpeed: 0,
        paginationSpeed: 0,
        rewindSpeed: 0,
        mouseDrag: false,
        touchDrag: false,
        addClassActive: true,
        rewindNav: false,
        transitionStyle: 'fade',
    });

    $('.js-main-animate').on('click', 'a:not(.no-main-animate)', function(){
    	var th = $(this),
    		section_curent = $('.section.active'),
    		section_next = $(th.attr('href')),
    		section_next_pos = section_next.closest('.owl-item').index(),
    		main_container = $('.main-container'),
    		contacts = $('.footer');

    	if(section_curent.attr('id') != section_next.attr('id')) {

    		contacts.removeClass('active');
            section_curent.removeClass('top');

    		$('.js-main-animate a:not(.no-main-animate)').removeClass('active');
            $('a[href="'+th.attr('href')+'"]').addClass('active');
	
    		// Animation: Section About
    		if(section_curent.attr('id') == 'about') {
    			section_curent.addClass('out');

    			setTimeout(function(){
    				main_container.addClass('fade-out');
    			}, 400);

    			setTimeout(function(){
					sections.trigger('owl.goTo', section_next_pos);
					main_container.addClass('fade-in');

					section_next.addClass('active');
					section_curent.removeClass('out active');
				}, 1300);    			
    		}
    		// Animation: Section Other
    		else {
    			main_container.addClass('fade-out');

    			setTimeout(function(){
					sections.trigger('owl.goTo', section_next_pos);
					main_container.addClass('fade-in');
					
					section_next.addClass('active');
					section_curent.removeClass('active');
				}, 1000); 
    		}
    		
    		setTimeout(function(){
    			main_container.removeClass('fade-in');
    			main_container.removeClass('fade-out');
    		}, 1700); 
    	}

    	return false;
    });

    $('.js-show-contacts').on('click', function(){
    	var contacts = $('.footer');

        if(!contacts.hasClass('active')) {
            contacts.addClass('active');
            $('.section.active').addClass('top');
        }
        else {
            contacts.removeClass('active');
            $('.section.active').removeClass('top');
        }
        return false;
    });

    // Parallax for Section 1
    var scene = document.getElementById('scene');
	var parallax = new Parallax(scene, {
		limitX: 0,
	});

    $('.news-article__title a').hover(
        function(){
            $(this).closest('.news-article').find('.news-article__img').addClass('hover');
        },
        function(){
            $(this).closest('.news-article').find('.news-article__img').removeClass('hover');
        }
    );

// end document.ready
});