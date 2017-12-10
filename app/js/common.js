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


	// Calculator on Product page

	if( $(".product-calc").length ) {
		var overtime = $("#overtime"),
			insideTtk = $("#inside-ttk"),
			addPriceTtk = $("#addPriceTtk"),
			mkadKm = $("#mkad-km"),
			mkadKmTotal = 0,
			mkadKmCounted = 0,
			addPriceKm = $("#addPriceKm"),
			kmPrice = parseInt( $("input[name='mkadKmPrice']").val() ), // Цена за км сверх 10км
			total = $("#totalVal"),
			rentPrice = parseFloat( $(".rent-price > span").text() ),
			overall = rentPrice,
			addPriceOvertime = $("#addPriceOvertime"),
			overtimeTotal = 0,
			overtimeCounted = 0,
			overtimePrice = parseInt( $("input[name='overtimePrice']").val() ),  // Часы сверх смены
			ttkPrice = parseInt( $("input[name='ttkPrice']").val() );		  		// Внутри ТТК
			totalVal = total.text( rentPrice );

		overtime.on("keypress", function(e) {
			validateNumb(e);
		});
		
		mkadKm.on("keypress", function(e) {
			validateNumb(e);
		});

		overtime.on("change", function(e) {
			overtimeTotal = overtime.val() * overtimePrice;
			addPriceOvertime.text( overtimeTotal );
			overall += overtimeTotal - overtimeCounted;
			total.text( overall );

			overtimeCounted = overtimeTotal;
		});	

		insideTtk.on("change", function(e) {
			if (insideTtk.prop('checked')) {
				overall += ttkPrice;
				addPriceTtk.text( ttkPrice );
			} else {
				overall -= ttkPrice;
				addPriceTtk.text( 0 );
			}

			total.text( overall );
		});	

		mkadKm.on("change", function(e) {
			if (mkadKm.val() > 10) {
				mkadKmTotal = (mkadKm.val() - 10) * 100;
				addPriceKm.text( mkadKmTotal );
			} else {
				addPriceKm.text( 0 );
			}

			overall += mkadKmTotal - mkadKmCounted;
			total.text( overall );
			mkadKmCounted = mkadKmTotal; 
			mkadKmTotal = 0;
		});	
	}

	$("#orderItem").on("click", function() {
		if ( isNumber(overall) ) {
			$(".modal input[name='totalPrice']").val( overall );
			$(".modal input[name='overtimeVal']").val( overtime.val() );
			$(".modal input[name='insideTtk']").val( insideTtk.prop('checked') );
			$(".modal input[name='mkadKmCounted']").val( mkadKm.val() );
		}
	});

});

// Validate function - if Number 

function validateNumb(evt) {
	var theEvent = evt || window.event;
	var key = theEvent.keyCode || theEvent.which;
	key = String.fromCharCode( key );
	var regex = /[0-9]|\./;
	
	if( !regex.test(key) ) {
		theEvent.returnValue = false;

		if( theEvent.preventDefault ) theEvent.preventDefault();
	}
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}






// load SVG-Sprite to LocalStorage

;( function( window, document ) {
	'use strict';

	var file     = 'img/sprite.svg',
	revision = 6;

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
