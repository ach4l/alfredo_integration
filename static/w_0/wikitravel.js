

window['GoogleAnalyticsObject'] = 'ga';
  window['ga'] = window['ga'] || function() {
    (window['ga'].q = window['ga'].q || []).push(arguments)
  };
  
  
function read_cookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}


//hotel ad stuff.
function findElementTop(obj) {
  curtop = 0;
  if (obj.offsetParent) {
    while (obj.offsetParent) {
      curtop += obj.offsetTop;
      obj = obj.offsetParent;
    }
  } //if offsetParent exists
  else if (obj.y) {
    curtop += obj.y
  }

  return curtop;
}//findElementPosY

function are_ads_hidden(prefix) {
  var result = read_cookie(prefix + "HideAds");
  return result;
}

function wtIsLoggedIn(prefix)
{
  return (read_cookie(prefix + '_session') &&
    read_cookie(prefix + 'UserID') &&
    read_cookie(prefix + 'UserName'));
}
             


function getSleepsAnchor() {
  for (var i = 0; i < document.anchors.length; i++) {
    if(document.anchors[i].name.toLowerCase() == 'sleep') {
      return document.anchors[i];
    }
  }
  return null;
}

function spaceHotelAd() {
  var sleep = getSleepsAnchor();
  if(!sleep) {
    return;
  }
  var adSpacer = document.getElementById('hotelAdSpacer');
  var adBlock = document.getElementById('hotelAdBlock');
  if(!adBlock || !adSpacer) {
    return;
  }

/*
  sleeptop = findElementTop(sleep);
  adtop = findElementTop(adSpacer);



  if(adtop < sleeptop) {
    var space = sleeptop - adtop;
    adSpacer.style.marginTop =  space + 'px';
  }
*/

  adBlock.style.display = 'block';
}



function handleAds(prefix) {
  if(are_ads_hidden(prefix)) {
    var adColumn = document.getElementById('adTableCell');
    if(adColumn) {
      adColumn.style.display = 'none';
    }
    return;
  }

  spaceHotelAd();
}


	function PageBanner1(){
		if(jQuery('div#toc').length && jQuery('div.topbanner').length){
			var sMenu = '';
			var l_iLoop = 0;

			//
			//  These TOC elements must be in lowercase or they will not match
			//  the elements being processed in the article
			//

			var de_toc_array = ["hintergrund",	"anreise", "mobilität", "sehenswürdigkeiten", "aktivitäten", "einkaufen", "küche", "stadtteile", "unterkunft", "sicherheit"];   

			var en_toc_array = ["understand",	"get in", "get around", "see", "do", "buy", "eat", "districts", "sleep", "stay safe"];   

			var es_toc_array = ["comprenda",	"llegar", "circule", "vea", "haga", "compre", "coma", "distritos", "duerma", "seguridad"];   

			var fi_toc_array = ["ymmärrä",		"tule", "liiku", "näe", "tee", "osta", "syö", "kaupunginosat", "nuku", "pysy turvassa"];   

			var fr_toc_array = ["comprendre",	"arriver", "se déplacer", "a voir", "a faire", "emplettes", "se restaurer", "districts", "passer la nuit", "sécurité"];   

			var it_toc_array = ["da sapere",	"come arrivare", "come spostarsi", "ca vedere", "cosa fare", "acquisti", "dove mangiare", "distretti", "dove alloggiare", "sicurezza personale"];   

			var ja_toc_array = ["分かる",		"着く", "動く", "観る", "遊ぶ", "買う", "食べる", "地区", "泊まる", "気を付ける"];   

			var nl_toc_array = ["begrijpen",	"arriveren", "rondreizen", "bekijken", "doen", "kopen", "eten", "buurten", "overnachten", "veiligheid"];   

			var pl_toc_array = ["charakterystyka",	"dojazd", "komunikacja", "zobacz", "zrób", "zakupy", "gastronomia", "dzielnice", "noclegi", "bezpieczeństwo"];   

			var pt_toc_array = ["entenda",		"chegar", "circular", "veja", "faça", "compre", "coma", "distritos", "durma", "segurança"];   

			var ru_toc_array = ["понять",		"как добраться", "транспорт", "достопримечательности", "чем заняться", "покупки", "еда", "районы", "где остановиться", "меры предосторожности"];   

			var zh_toc_array = ["了解",		"到达", "出行", "看", "做", "买", "吃", "区", "睡", "注意安全"];   


			var wMenu = "";
			
			var realMenu = jQuery('div#toc');

			realMenu.removeClass('toc');			
			realMenu.addClass('tocFloat');
			realMenu.attr('cellspacing','0');
			realMenu.children('.toctitle').remove();
			
			realMenu.children('ul').addClass('tocUl');
			
			realMenu.find('li').removeClass();
			
			realMenu.children('ul').find('li').each(function(){
			//console.log(jQuery(this).html());
				var e = jQuery(this);
				if(e.children('ul').children('li').length !== 0) {
					e.addClass('li-with-submenu');
				}
				e.children('ul').addClass('sub-menu');
			});
			
			realMenu.find('a').each(function(){
				var element = jQuery(this);
				element.text(element.children('span.toctext').text());
				element.children('span').remove();
			});
			
			realMenu.children('ul').children('li').children('a').each(function(){
				var toc = jQuery(this);
				var tocText = toc.text().toLowerCase();
				
				if (
					jQuery.inArray(tocText,de_toc_array) != (-1) ||
					jQuery.inArray(tocText,en_toc_array) != (-1) ||
					jQuery.inArray(tocText,es_toc_array) != (-1) ||
					jQuery.inArray(tocText,fi_toc_array) != (-1) ||
					jQuery.inArray(tocText,fr_toc_array) != (-1) ||
					jQuery.inArray(tocText,it_toc_array) != (-1) ||
					jQuery.inArray(tocText,ja_toc_array) != (-1) ||
					jQuery.inArray(tocText,nl_toc_array) != (-1) ||
					jQuery.inArray(tocText,pl_toc_array) != (-1) ||
					jQuery.inArray(tocText,pt_toc_array) != (-1) ||
					jQuery.inArray(tocText,ru_toc_array) != (-1) ||
					jQuery.inArray(tocText,zh_toc_array) != (-1)
				) {
					
				}
				else {
					toc.parent().remove();
				}
			});
			//console.log(realMenu.html());
			
			// for default page banner
			if(jQuery('div.topbanner-toc div.tocbox-b').is(':empty')){
				// move toc
				jQuery('div#toc').appendTo(jQuery('div.topbanner-toc div.tocbox-b'));
			
			}
			
			
	/*
			//var innerMenu =  jQuery('div#toc ul.xoxo.wt-toc > li > a').not('a.toc-arrow').each(function(){
			var innerMenu =  jQuery('div#toc ul > li.toclevel-1 > a').each(function(){
				var toc = jQuery(this);
				//console.log(toc.html());
				//toc.detach();
				//console.log(toc);
				toc.children('span.tocnumber').remove();
				
				var tocText = toc.children('span.toctext').text().toLowerCase();
				if (
					jQuery.inArray(tocText,de_toc_array) != (-1) ||
					jQuery.inArray(tocText,en_toc_array) != (-1) ||
					jQuery.inArray(tocText,es_toc_array) != (-1) ||
					jQuery.inArray(tocText,fi_toc_array) != (-1) ||
					jQuery.inArray(tocText,fr_toc_array) != (-1) ||
					jQuery.inArray(tocText,it_toc_array) != (-1) ||
					jQuery.inArray(tocText,ja_toc_array) != (-1) ||
					jQuery.inArray(tocText,nl_toc_array) != (-1) ||
					jQuery.inArray(tocText,pl_toc_array) != (-1) ||
					jQuery.inArray(tocText,pt_toc_array) != (-1) ||
					jQuery.inArray(tocText,ru_toc_array) != (-1) ||
					jQuery.inArray(tocText,zh_toc_array) != (-1)
				) {
					
				}
			});
			*/
			
/*			// remove parenthesis
			var topbannerName = jQuery(".topbanner .name");

			topbannerName.text(function(_, text) {
			    return text.replace(/\(.*?\)/, '');
			}).prop("title", topbannerName.html());
*/
			//jQuery('div.topbanner-toc div.hlist').html('<div id="toc" class="toc tocFloat" cellspacing="0"> <ul class="tocUl">' + sMenu + '</ul> </div>');
			//jQuery('div.topbanner-toc div.hlist').html('<div id="toc" class="tocFloat" cellspacing="0"> <ul class="tocUl">' + wMenu + '</ul> </div>');
			//
			// remove old TOC (when default banner is inserted
			//if(jQuery('div#toc.toc').length){
				//jQuery('div#toc.toc').remove();
			//}


			// add class to elements with submenu
			//jQuery('.hlist.tocbox-b #toc li:has(ul.sub-menu li)').addClass('li-with-submenu');

			// remove moved title div
			//jQuery('#moved_title').remove();

			var monthNames = ["Jan", "Feb", "Mar","Apr", "May", "June", "July","Aug", "Sept", "Oct","Nov", "Dec"];
			// set dates
			var currentDate = new Date();
			var checkInDate = new Date(currentDate.setDate(currentDate.getDate() + 9));
			var checkOutDate = new Date(currentDate.setDate(currentDate.getDate() + 2));
			//var strCheckInDate = ("0" + (checkInDate.getMonth() + 1)).slice(-2) + '/' + ("0" + checkInDate.getDate()).slice(-2);
			var strCheckInDate = monthNames[checkInDate.getMonth()] + ' ' + ("0" + checkInDate.getDate()).slice(-2);
			//var strCheckOutDate = ("0" + (checkOutDate.getMonth() + 1)).slice(-2) + '/' + ("0" + checkOutDate.getDate()).slice(-2);
			var strCheckOutDate = monthNames[checkOutDate.getMonth()] + ' ' + ("0" + checkOutDate.getDate()).slice(-2);
			var strCheckInDate2 = ("0" + (checkInDate.getMonth() + 1)).slice(-2) + '/' + ("0" + checkInDate.getDate()).slice(-2) +'/' + checkInDate.getFullYear();
			var strCheckOutDate2 = ("0" + (checkOutDate.getMonth() + 1)).slice(-2) + '/' + ("0" + checkOutDate.getDate()).slice(-2)  +'/' + checkOutDate.getFullYear();
			
			
            /*
            var clickTripzForm = 
            			'<div class="widget-header">Book a Hotel</div>'+
			    '<form id="ctHotelsForm" class="ct-widget__form clearfix" name="ctHotelsForm" method="get" action="javascript:void(0)" data-form="ctHotels">'+
                        '<div class="ct-widget__form-group-city">'+
                            '<input name="ctHotelsCity" id="ctHotelsCity" type="hidden" value="' + jQuery("#firstHeading").html() + '" class="ct-sidebar__input">'+
                            '<input name="ctHotelsGuests" id="ctHotelsGuests" type="hidden" value="2" class="ct-sidebar__input">'+
                            '<input name="ctHotelsRooms" id="ctHotelsRooms" type="hidden" value="1" class="ct-sidebar__input">'+
                            '<span role="status" aria-live="polite" class="ui-helper-hidden-accessible"></span>'+
                        '</div>'+
                    '<div class="ct-widget__form-group-checkin">'+
                        '<input name="ctHotelsDateCheckIn" id="ctHotelsDateCheckIn" type="text" placeholder="Check-in" value="'+ strCheckInDate +'" class="ct-widget__datepicker--start" autocomplete="off">'+
                        '<div class="pre-icon-calendar">In</div>'+
                        '<div class="icon icon-calendar"></div>'+
                    '</div>'+
                    '<div class="ct-widget__form-group-checkout">'+
                        '<input name="ctHotelsDateCheckOut" id="ctHotelsDateCheckOut" type="text" placeholder="Check-out" value="'+ strCheckOutDate +'" class="ct-widget__datepicker--end" autocomplete="off">'+
                        '<div class="pre-icon-calendar">Out</div>'+
                        '<div class="icon icon-calendar"></div>'+
                    '</div>'+
                    '<div id="ctHotelsAnchor" class="ct-widget__compare-providers"></div>'+
                    '<button type="submit" class="ct-widget__submit">Check Rates</button>'+
                '</form>'+
                '<div style="clear:both"></div>';
                */
                
             var clickTripzForm = 
            			'<div class="widget-header">Find a Hotel</div>'+
			    '<div class="booking-widget-container"><div id="booking-widget" class="ct-new booking-widget">'+
		'<form id="booking-form-hotels" class="booking-widget-form booking-form-hotels ct-widget__form" name="booking-form-hotels" method="get" action="javascript:void(0)" data-form="ctHotels">'+
			'<div class="booking-form-group booking-form-group-city">'+
				'<input name="booking-input-city" id="booking-input-city" type="hidden" value="' + jQuery("#firstHeading").html() + '" class="booking-form-input">'+
				'<span role="status" aria-live="polite" class="ui-helper-hidden-accessible"></span>'+
			'</div>'+
			'<div class="booking-form-group booking-form-group-checkin-checkout">'+
                '<button class="booking-display-button booking-display-checkin-checkout" type="button" name="booking-display-checkin-checkout">'+
                    '<span class="booking-display-label">'+
                        'Check-In / Check-Out'+
                    '</span>'+
                    '<i class="fa fa-calendar prefix-icon"></i>'+
                    '<span class="booking-display-value display-value-checkin">' + strCheckInDate + '</span>'+
                    '<i class="fa fa-long-arrow-right"></i>'+
                    '<span class="booking-display-value display-value-checkout">' + strCheckOutDate + '</span>'+
                    '<i class="fa fa-chevron-down"></i>'+
                '</button>'+
				'<input name="booking-input-checkin" id="booking-input-checkin" type="text" value="' + strCheckInDate2 + '" class="booking-form-input booking-datepicker-start">'+
				'<input name="booking-input-checkout" id="booking-input-checkout" type="text" value="' + strCheckOutDate2 + '" class="booking-form-input booking-datepicker-end">'+
			'</div>'+
			'<div class="booking-form-group booking-form-group-guests-rooms dropdown">'+
                '<button class="booking-display-button booking-display-guests-rooms dropdown-toggle" type="button" name="booking-display-guests-rooms" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+
                    '<span class="booking-display-label">'+
                        'Guests / Rooms'+
                    '</span>'+
                    '<i class="fa fa-user prefix-icon"></i>'+
                   ' <span class="booking-display-value display-value-guests">2 Guests</span>'+
                    '<span> , </span>'+
                   ' <span class="booking-display-value display-value-rooms">1 Room</span>'+
                    '<i class="fa fa-chevron-down"></i>'+
                '</button>'+
                '<ul class="booking-display-dropdown dropdown-menu">'+
                    '<li>'+
                        '<div class="booking-value-input value-input-guests" data-value="2">'+
                            '<span class="value-input-display">2 Guests</span>'+
                            '<div class="booking-value-input-increment">'+
                                '<button class="value-input-increment-btn value-input-subtract" type="button" name="value-input-subtract"><i class="fa fa-minus" aria-hidden="true"></i></button>'+
                                '<button class="value-input-increment-btn value-input-add" type="button" name="value-input-add"><i class="fa fa-plus" aria-hidden="true"></i></button>'+
                            '</div>'+
                        '</div>'+
                    '</li>'+
                    '<li>'+
                        '<div class="booking-value-input value-input-rooms" data-value="1">'+
                            '<span class="value-input-display">1 Room</span>'+
                            '<div class="booking-value-input-increment">'+
                                '<button class="value-input-increment-btn value-input-subtract" type="button" name="value-input-subtract"><i class="fa fa-minus" aria-hidden="true"></i></button>'+
                                '<button class="value-input-increment-btn value-input-add" type="button" name="value-input-add"><i class="fa fa-plus" aria-hidden="true"></i></button>'+
                            '</div>'+
                        '</div>'+
                    '</li>'+
                    '<li>'+
                        '<div class="booking-value-input value-input-submit">'+
                            '<button class="value-input-submit-btn value-input-cancel" type="button" name="value-input-cancel">Cancel</button>'+
                            '<button class="value-input-submit-btn value-input-apply" type="button" name="value-input-apply">Apply</button>'+
                       ' </div>'+
                   ' </li>'+
                '</ul>'+
                '<input name="booking-input-guests" id="booking-input-guests" type="text" value="2" class="booking-form-input">'+
                '<input name="booking-input-rooms" id="booking-input-rooms" type="text" value="1" class="booking-form-input">'+
			'</div>'+
            '<div id="booking-form-anchor" class="booking-form-compare-providers"></div>'+
			'<button type="submit" class="booking-form-submit"><i class="fa fa-arrow-right"></i></button>'+
		'</form>'+
    '</div>'+
'</div>'+
                '<div style="clear:both"></div>';

			// set clicktripz widget
			if(!bIsMainPage){
			    jQuery.when(jQuery('.ct-widget__body').html(clickTripzForm)).done(function(){
				    jQuery.when(setDatePicker()).done(function(){
					    setClickTripz();
				    });
			    });
			}
			
			
			
		}
		
		//remove heading
		jQuery("h1#firstHeading").remove();
		
		// change main title if is mainpage
		if(bIsMainPage){
		
		    jQuery('div#mf-pagebanner div.topbanner div.name').remove();
		    /*switch (sLang) {
              case 'ar':
                jQuery('div#mf-pagebanner div.topbanner div.name').text('مرحبا بكم في ويكي ترافيل');
                break;
              case 'ca':
                jQuery('div#mf-pagebanner div.topbanner div.name').text('Benvinguda a Wikitravel');
                break;
              case 'eo':
                jQuery('div#mf-pagebanner div.topbanner div.name').text('Bonvenon al Wikitravel');
                break;
              case 'es':
                jQuery('div#mf-pagebanner div.topbanner div.name').text('Bienvenido a Wikitravel');
                break;
              case 'fi':
                jQuery('div#mf-pagebanner div.topbanner div.name').text('Tervetuloa Wikitravel');
                break;
              case 'fr':
                jQuery('div#mf-pagebanner div.topbanner div.name').text('Bienvenue sur Wikitravel');
                break;
              case 'he':
                jQuery('div#mf-pagebanner div.topbanner div.name').text('ברוכים הבאים לוויקיטיול');
                break;
              case 'hi':
                jQuery('div#mf-pagebanner div.topbanner div.name').text('विकिट्रैवल में आपका स्वागत है');
                break;
              case 'hu':
                jQuery('div#mf-pagebanner div.topbanner div.name').text('Üdvözöljük a Wikitravel oldalán');
                break;
              case 'ko':
                jQuery('div#mf-pagebanner div.topbanner div.name').text('Wikitravel에 오신 것을 환영합니다');
                break;
              case 'ro':
                jQuery('div#mf-pagebanner div.topbanner div.name').text('Bine ați venit la Wikitravel');
                break;
              case 'sv':
                jQuery('div#mf-pagebanner div.topbanner div.name').text('Välkommen till Wikitravel');
                break;
              case 'ru':
                jQuery('div#mf-pagebanner div.topbanner div.name').text('Добро пожаловать в Wikitravel');
                break;
              case 'pt':
                jQuery('div#mf-pagebanner div.topbanner div.name').text('Seja bem-vindo a Wikitravel');
                break;
              case 'pl':
                 jQuery('div#mf-pagebanner div.topbanner div.name').text('Witamy na Wikitravel');
                break;
              case 'de':
                jQuery('div#mf-pagebanner div.topbanner div.name').text('Willkommen auf Wikitravel');
                break;
              case 'zh':
                jQuery('div#mf-pagebanner div.topbanner div.name').text('欢迎来到维客旅行');
                break;
              case 'nl':
               jQuery('div#mf-pagebanner div.topbanner div.name').text('Welkom bij Wikitravel');
                break;
              case 'it':
                jQuery('div#mf-pagebanner div.topbanner div.name').text('Benvenuti su Wikitravel');
                break;
              case 'ja':
                jQuery('div#mf-pagebanner div.topbanner div.name').text('ウィキトラベルへようこそ');
                break;
              default:
                jQuery('div#mf-pagebanner div.topbanner div.name').text('Welcome to Wikitravel');
            }*/
		}
	}

	function setDatePicker(){
		if(typeof(jQuery) != 'undefined' && jQuery.isReady ){
			var datePickerElem = document.createElement( 'script' );
			datePickerElem.type = 'text/javascript';
			datePickerElem.src = '/mw/skins/common/bootstrap-datepicker.js';
			jQuery('head').append( datePickerElem );

			var bootstrapElem = document.createElement( 'script' );
			bootstrapElem.type = 'text/javascript';
			bootstrapElem.src = '/mw/skins/common/bootstrap.min.js';
			jQuery('head').append( bootstrapElem );


		} else {
			setTimeout('setDatePicker()', 100);
		}
	}

	function PageBanner2(){
		/// PAGEBANNER2 TESTING
			if(jQuery('div#toc').length && jQuery('div.topbanner').length){
				
				var sMenu = '<li class="wt-toc"><span style="font-weight: bold;">CONTENTS</span></li>';
				var innerMenu =  jQuery('div#toc ul.xoxo.wt-toc > li > a').not('a.toc-arrow').each(function(){
					sMenu += '<li class="wt-toc"><a href="' + jQuery(this).attr('href') + '">' + jQuery(this).html() + '</a></li>';
				});

				jQuery('div.topbanner-toc div.hlist').html('<div id="toc" class="toc tocFloat" cellspacing="0"> <ul class="tocUl">' + sMenu + '</ul> </div>');
				jQuery('div#toc').remove();
				
				// move banner
			//jQuery("#mf-pagebanner").detach().appendTo(".article-banner");
			// move breadcrums
			//jQuery("div#contentSub").appendTo("div#breadcrums");
			// delete title
			//jQuery("#firstHeading").remove();
			jQuery(".topbanner .name").remove();
			
			//move title
			var lTitle = jQuery("#firstHeading span").html();
			jQuery("#firstHeading").remove();
			jQuery("div#moved_title").html(lTitle);
		}
}

function RecursiveJQCheck(){
	if(typeof(jQuery) != 'undefined' && jQuery.isReady ){
		PageBanner1();
	}
	else{
		setTimeout('RecursiveJQCheck()', 300);
	}


}

RecursiveJQCheck();

// refresh last side ad after 35 seconds
setInterval(function(){ 
                        googletag.pubads().refresh([gptadslots[5]]);
                      }, 35000);

//jQuery(document).ready(function(){
	//var randomNum = Math.floor((Math.random() * 10) + 1) % 2;
	
	//if(randomNum == 0)

//	PageBanner1();
	//else
	//	PageBanner2();	
	
	
//});

// Sticky Nav
var navbar = document.getElementsByClassName("topbanner-toc");
var RCheck = 0;

function RgetNav(){

    RCheck++;
    // prevent endless loop
    if(RCheck > 100) return;
    
    if((typeof(navbar) != 'undefined') && (typeof(navbar[0]) != 'undefined')){
        // When the user scrolls the page, execute myFunction 
        window.onscroll = function() {scrollCheck()};
    }
    else{
        setTimeout('RgetNav()', 500);
    }
}



// Get the navbar
RgetNav();


// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function scrollCheck() {
  if (window.pageYOffset >= 590) {
    navbar[0].classList.add("stickynav")
  } else {
    navbar[0].classList.remove("stickynav");
  }
}

