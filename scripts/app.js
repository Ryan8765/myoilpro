$(document).ready(function() {

	//slick carousel setup for .testamonials
	$('.testamonials').slick({
		dots: true,
		autoplay: true,
		autoplaySpeed: 8000,
		arrows: false
	});

	//slick-nav pluggin initialization - media queries take care of hide/show
	$(function(){
		$('.menu').slicknav();
	});

	//scroll user to signup form on button click
	$('.button-scroll').on('click', function() {
		$('html, body').animate({
			scrollTop: ($('.contact-glyph').offset().top)-(20)
		}, 1000);
	});

	//object to position and fade in subscribe and contact us buttons on page scroll
	var showSubscribe = {
		fadedInAlready: false,
		fadeInSubscribe: function () {
			//position of scrollbar
			var scrollPosition, 
				//submit and contact div to fade in
			    fadeInElement  = $('#scroll-nav'),
			    //cross browser window innerwidth
			    windowWidth    = window.innerWidth
								 || document.documentElement.clientWidth
								 || document.body.clientWidth;

			//set current scroll position - cross browser compatible IE8
			if (window.pageXOffset !== undefined) { 
				// 	All browsers, except IE9 and earlier
	    		scrollPosition = window.pageYOffset;
			} else { 
				// IE9 and earlier
	    		scrollPosition = document.documentElement.scrollTop;
			}

			//hide fadeInElement on smaller devices
			if(this.fadedInAlready && windowWidth < 760) {
				fadeInElement.hide();
				this.fadedInAlready = false;
			}
			//fadein subscribe and contact buttons if not already fadedIn and scroll is past the main navigation
			if(!this.fadedInAlready && scrollPosition > 111 && windowWidth > 760) {
				fadeInElement.fadeIn(1500);
				this.fadedInAlready = true;
			}

			//hide subscribe and contact buttons if already faded in and scroll is less than 111 (navigation height)
			if(this.fadedInAlready && scrollPosition < 111) {
				fadeInElement.hide();
				this.fadedInAlready = false;
			}
		}
	}; //end showSubscribe object

	//create a popup that blocks user from leaving the website to show the subscribe popup (.popup)
	// localStorage.setItem("alreadyShown", "false");
	var beforeExit = {
		mouseHasEntered: false,
		alreadyShown: false,
		showPopup: function() {
			var localAlreadyShown = localStorage.getItem("alreadyShown");
			//only show the popup once
			if(this.alreadyShown === false && localAlreadyShown !== "true" && this.mouseHasEntered === true) {
				$('.outer-wrapper').hide();
				$('.popup').fadeIn(1000);

				this.alreadyShown = true;
				//local storage save for popup
				if(typeof(Storage) !== "undefined" && localAlreadyShown !== "true") {
				    localStorage.setItem("alreadyShown", "true");
				}
			}
		}
	};

	//show and hide privacy statement on subscribe form popup
	$('#show-hide-privacy').on('click', function() {
		$('#privacy-statement').slideToggle(400);
	});

	//show and hide subscribe popup on .bookmark-button click 
	$('.bookmark-button').on('click', function() {
		$('.outer-wrapper').hide();
		$('.popup').fadeIn(1000);
		beforeExit.alreadyShown = true;
	});

	$('.exit-button').on('click', function() {
		$('.outer-wrapper').show();
		$('.popup').hide();
	});


	//functions to run on page load
	showSubscribe.fadeInSubscribe();



	//functions to run on window resize
	$(window).resize(function(){
		showSubscribe.fadeInSubscribe();
	});



	//functions to run on window scroll
	$(window).scroll(function() {
		showSubscribe.fadeInSubscribe();
	});


	//before user exits page 
	$(window).mousemove(function( event ) {
		var mouseTriggerSet = beforeExit.mouseHasEntered;
		//make sure mouse has entered page, so as to not show popup when mouse enters
		if(event.clientY > 20 && mouseTriggerSet === false) {
			beforeExit.mouseHasEntered = true;
		}
		//when user moves mouse to address bar show popup
  		if(event.clientY < 20 && mouseTriggerSet === true) {
  			beforeExit.showPopup();
  		}
	});


});//end document.ready