window.onload = function() { 

function WTgdrpCallBack(){

   // IF User logged IN
    if(mw.config.get('wgUserName')){
        MakeAjaxCall('insertUser', mw.config.get('wgUserName'), mw.config.get('wgUserLanguage'));
    }
}


function handleUser(data){
    if(data.exists){
        //set cookie
        var timestamp = Math.round((new Date()).getTime() / 1000);
        var d = new Date(), expires;
		d.setTime(d.getTime() + (3650 * 24 * 60 * 60 * 1000));
		expires = 'expires=' + d.toUTCString();
		document.cookie = 'ibeugdpr' + '=' + 'INEUCONSENTED:' + timestamp + '; ' + expires + '; path=/';
    }
    else{
        IBEUGDPR.displayBanner({onConsent: WTgdrpCallBack });
    }


}

// If user logged out, Clickstream code
if(!mw.config.get('wgUserName')){
	(function(src,config){var script=document.createElement('script');script.onload=script.onreadystatechange=function(e){var event=e||window.event;if(event.type==='load'||/loaded|complete/.test(script.readyState)&&document.documentMode<=11){script.onload=script.onreadystatechange=script.onerror=null;new IBTracker(config);}};script.onerror=function(){script.onload=script.onreadystatechange=script.onerror=null;};script.async=1;script.src=src;script.setAttribute('crossorigin','anonymous');document.getElementsByTagName('head')[0].appendChild(script);}('https://ibclick.stream/assets/js/track/dist/js/v1/tracker.min.js',{site:'wikitravel.org',vertical:'travel',autoPageViewTracking:true,autoClickTracking:true,snippetVersion:'1.2'}));
}

// Check if cookie not present
if(document.cookie.indexOf('ibeugdpr') == -1){
    // User logged IN
    if(mw.config.get('wgUserName')){
        // check if already agreed
        MakeAjaxCall('checkUser', mw.config.get('wgUserName'), mw.config.get('wgUserLanguage'));
    }
    // User logged OUT    
    else{
        IBEUGDPR.displayBanner({onConsent: WTgdrpCallBack });
        }
}

function MakeAjaxCall(aType, aUserName, aLang){


    jQuery.ajax({
      url: "../gdpr/wtgdpr.php",
      type: 'POST',
      dataType: 'json',
      data: { action: aType, username: aUserName, lang: aLang }
    })
      .done(function( data ) {
        if (data.status == 'success'){
            if(aType == 'checkUser'){
                handleUser(data);
            }
            //console.log(aType + ' OK');
        }
        else{
            //console.log(aType + data.error);
        }
      })
      .fail(function() {
        //console.log( "Database error");
      });

}

}




    

