$(function() {

	// Fancybox

	$("[data-fancybox]").fancybox();

	
	// Mask

	$("input[name='phone']").mask("+7 (999) 999-9999");


	// Sliders

	$(".gallery-work").slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		infinity: true,
		nextArrow: '<button type="button" class="slick-next"><svg class="arrow-i arrow-next-i"><use xlink:href="#arrow-light"></use></svg></button>',
		prevArrow: '<button type="button" class="slick-prev"><svg class="arrow-i arrow-prev-i"><use xlink:href="#arrow-light"></use></svg></button>',
		responsive: [
		{
			breakpoint: 991,
			settings: {
	      	slidesToShow: 2,
	      	slidesToScroll: 2
	      }
		},
		{
			breakpoint: 767,
			settings: {
	      	slidesToShow: 1,
	      	slidesToScroll: 1
	      }
		}
		]
	});


	$(".article-slider").slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		infinity: true,
		nextArrow: '<button type="button" class="slick-next"><svg class="arrow-i arrow-next-i"><use xlink:href="#arrow-light"></use></svg></button>',
		prevArrow: '<button type="button" class="slick-prev"><svg class="arrow-i arrow-prev-i"><use xlink:href="#arrow-light"></use></svg></button>',
		responsive: [
		{
			breakpoint: 991,
			settings: {
	      	slidesToShow: 2,
	      	slidesToScroll: 2
	      }
		},
		{
			breakpoint: 767,
			settings: {
	      	slidesToShow: 1,
	      	slidesToScroll: 1
	      }
		}
		]
	});


	// Catalog info modal compiler

	$(".card [data-target='#vehicle-info-modal']").on("click", function() {
		$("#vehicle-info-modal-title > span").text( $(this).parents(".card").find(".card-title").text() );
		$(".vehicle-info-modal .vehicle-info-text").text( $(this).parents(".card").find(".card-info").text() );
	});



	// Up button

	var upBtn = '<div class="upBtn"><svg class="upBtn-i"><use xlink:href="#arrow-light"></use></svg></btn>';
	
	$('.main-footer').append( upBtn );	

	$(".upBtn").on("click", function() {
		$("html, body").animate({
			scrollTop: 0
		}, 800)
	});

// NAV

	$( ".navbar-toggler" ).on("click", function() {
		$( ".navbar-toggler" ).toggleClass("active");
	});


// Dropdowns in Catalog Filter

	// Default dropdown action to show/hide dropdown content
	
	$('.js-dropp-action').click(function(e) {
		e.preventDefault();

		$(this).toggleClass('js-open');
		$(this).parent().next('.drop-select-body').toggleClass('js-open');
	});

  // Using as fake input select dropdown
  
  	$('.drop-select-body > label').click(function() {
		$(this).addClass('js-open').siblings().removeClass('js-open');
  		$('.drop-select-body, .js-dropp-action').removeClass('js-open');
  	});
  
  // get the value of checked input radio and display as dropp title

	$('input[name="drop-select"]').change(function(e) {
		var value = $(this).val();
		$(this).parents('.drop-select').find('.js-value').text( value );
	});

	// $('input[name="drop-select"] .filter-info-btn').on('click', function(e) {
	// 	e.preventDefault();
	// 	e.stopPropagation();
	// })

});










// load SVG-Sprite to LocalStorage

;( function( window, document ) {
	'use strict';

	var file     = '../img/sprite.svg',
	revision = 4;

	if( !document.createElementNS || !document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' ).createSVGRect )
		return true;

	var isLocalStorage = 'localStorage' in window && window[ 'localStorage' ] !== null,
	request,
	data,
	insertIT = function()
	{
		document.body.insertAdjacentHTML( 'afterbegin', data );
	},
	insert = function()
	{
		if( document.body ) insertIT();
		else document.addEventListener( 'DOMContentLoaded', insertIT );
	};

	if( isLocalStorage && localStorage.getItem( 'inlineSVGrev' ) == revision )
	{
		data = localStorage.getItem( 'inlineSVGdata' );
		if( data )
		{
			insert();
			return true;
		}
	}

	try
	{
		request = new XMLHttpRequest();
		request.open( 'GET', file, true );
		request.onload = function()
		{
			if( request.status >= 200 && request.status < 400 )
			{
				data = request.responseText;
				insert();
				if( isLocalStorage )
				{
					localStorage.setItem( 'inlineSVGdata',  data );
					localStorage.setItem( 'inlineSVGrev',   revision );
				}
			}
		}
		request.send();
	}
	catch( e ){}

}( window, document ) );
