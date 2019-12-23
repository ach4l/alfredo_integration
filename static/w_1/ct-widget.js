var _ctq = _ctq || [];
var sidebarPartner = "Clicktripz";
var minGuests = 1;
var maxGuests = 8;
var minRooms = 1;
var maxRooms = 4;

////////////////////
// ClickTripz API //
////////////////////


            
function initCTHotels() {
/*    // set hotels
    _ctq.push(['newCompareToStrip', 'ctHotelsForm']);
    _ctq.push(['ctHotelsForm.setFormID', 'ctHotelsForm']);
    _ctq.push(['ctHotelsForm.setReferralURL', document.title]);
    _ctq.push(['ctHotelsForm.setPublisherID', 2575]);
    _ctq.push(['ctHotelsForm.setAnchorID', 'ctHotelsAnchor']);
    _ctq.push(['ctHotelsForm.setCityNameID', 'ctHotelsCity']);
    _ctq.push(['ctHotelsForm.setCheckInID', 'ctHotelsDateCheckIn']);
    _ctq.push(['ctHotelsForm.setCheckOutID', 'ctHotelsDateCheckOut']);
    _ctq.push(['ctHotelsForm.setGuestsID', 'ctHotelsGuests']);
    _ctq.push(['ctHotelsForm.setRoomsID', 'ctHotelsRooms']);
    // options
    _ctq.push(['ctHotelsForm.optMaxAdvertisers', '6']);
    _ctq.push(['ctHotelsForm.optMaxChecked', 4]);
    _ctq.push(['ctHotelsForm.optPrePop', 'false']);
    _ctq.push(['ctHotelsForm.optCascadeWindows', 'true']);
    _ctq.push(['ctHotelsForm.optForceTabbedMode', 'true']);
    // draw Hotels Compare
    _ctq.push(['ctHotelsForm.draw']);
*/    
    // set hotels
       
            //var formName = 'booking-form-hotels';
            //var formNameSuffix = formName.match(/-.*/) === null ? '' : formName.match(/-.*/);
            
            var form = jQuery('form#booking-form-hotels');
            var formName = jQuery(form).attr("id");

            _ctq.push(['newCompareToStrip', formName]);
            _ctq.push([formName + '.setFormID', formName]);
            _ctq.push([formName + '.setReferralURL', document.title]);
            _ctq.push([formName + '.setPublisherID', 2575]);
            _ctq.push([formName + '.setAnchorID', jQuery(form).find(".booking-form-compare-providers").attr('id')]);
            _ctq.push([formName + '.setCheckInID', jQuery(form).find("[name=booking-input-checkin]").attr('id')]);
            _ctq.push([formName + '.setCheckOutID', jQuery(form).find("[name=booking-input-checkout]").attr('id')]);
            _ctq.push([formName + '.setGuestsID', jQuery(form).find("[name=booking-input-guests]").attr('id')]);
            _ctq.push([formName + '.setRoomsID', jQuery(form).find("[name=booking-input-rooms]").attr('id')]);
            // options
            _ctq.push([formName + '.optMaxAdvertisers', '6']);
            _ctq.push([formName + '.optMaxChecked', 4]);
            _ctq.push([formName + '.optPrePop', 'false']);
            _ctq.push([formName + '.optCascadeWindows', 'true']);
            _ctq.push([formName + '.optForceTabbedMode', 'true']);
            // draw Hotels Compare
            _ctq.push([formName + '.setCityNameID', jQuery(form).find("[name=booking-input-city]").attr('id')]);
            _ctq.push([formName + '.draw']);
        

}

function initCTScript() {
    var ct = document.createElement('script');
    ct.type = 'text/javascript';
    ct.async = true;
    ct.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'static.clicktripz.com/scripts/js/ct.js?v=2.6';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ct, s);
    
    jQuery('body').on('click', '.booking-display-checkin-checkout', function(e) {
                jQuery(this).next().datepicker('show');
     });                
                

/*    jQuery(document).on('click', '.ct-widget__drop-down-guests .dropdown-menu', function (e) {
        e.stopPropagation();
    }).on('click', '.icon-operator', function(e){
        e.preventDefault();
        var operator = jQuery(this);

        if( !operator.hasClass('icon-inactive') ){
            var currGuests   = parseFloat(jQuery("#ctHotelsGuests").val());
            var currRooms    = parseFloat(jQuery("#ctHotelsRooms").val());
            var inactiveElem = operator.parent().find('.icon-inactive');

            switch(operator.data('type')) {
                case "guest":
                    var newGuests = (operator.hasClass('icon-plus')) ? currGuests + 1 : ((operator.hasClass('icon-minus')) ? currGuests - 1 : '');
                    var legendGuestsText = newGuests.toString() + " Guest" + ((newGuests > 1) ? "s" : "");

                    jQuery("#ctHotelsGuests").val(newGuests);
                    jQuery(".legend-guests").html(legendGuestsText);

                    if(newGuests >= maxGuests || newGuests <= minGuests){
                        operator.addClass('icon-inactive');
                    } else if(inactiveElem){
                        inactiveElem.removeClass('icon-inactive');
                    }

                    break;
                case "room":
                    var newRooms = (operator.hasClass('icon-plus')) ? currRooms + 1 : ((operator.hasClass('icon-minus')) ? currRooms - 1 : '');
                    var legendRoomsText = newRooms.toString() + " Room" + ((newRooms > 1) ? "s" : "");

                    jQuery("#ctHotelsRooms").val(newRooms);
                    jQuery(".legend-rooms").html(legendRoomsText);

                    if(newRooms >= maxRooms || newRooms <= minRooms){
                        operator.addClass('icon-inactive');
                    } else if(inactiveElem){
                        inactiveElem.removeClass('icon-inactive');
                    }

                    break;
            }
        }
    }); */
};

/**
 * Returns a String to pass to ClickTripz API as a method call
 * @param {jQuery} $form   form as jQuery object that should call the method
 * @param {String} command name of method to call
 */
function setCTZCommand(form, command) {
    var ctzCommand = jQuery(form).attr("id") + "." + command;
    return ctzCommand;
};

/*
function initBSDatepickers() {
    jQuery.fn.datepicker.defaults.maxViewMode = 2;
    jQuery.fn.datepicker.defaults.orientation = "bottom";
    jQuery.fn.datepicker.defaults.autoclose = true;
    jQuery.fn.datepicker.defaults.disableTouchKeyboard = true;
    jQuery.fn.datepicker.defaults.zIndexOffset = 300;
    
    jQuery('.topbanner').on('focus', '.ct-widget__datepicker--start', function() {
        jQuery(this).datepicker({
            startDate: "0d"
        }).off('changeDate').on('changeDate', function(e){
            var $endPicker = jQuery(e.target).parent().next('.ct-widget__form-group-checkout').children('.ct-widget__datepicker--end');
            var startDate = jQuery(e.target).datepicker('getDate');
            var endDate = $endPicker.datepicker('getDate');
            
            $endPicker.datepicker('setStartDate', startDate);
            if (endDate < startDate) {
                $endPicker.datepicker('update', new Date(startDate.setDate(startDate.getDate() + 2)));
            }

            sendGAEvent(jQuery(this).closest("form"), "Interaction", sidebarPartner);
        });
    });
    
    jQuery('.topbanner').on('focus', '.ct-widget__datepicker--end', function(){
        jQuery(this).datepicker({
            startDate: jQuery(this).parent().prev('.ct-widget__form-group-checkin').children('.ct-widget__datepicker--start').datepicker('getDate')
        }).off('changeDate').on('changeDate', function(e){
            sendGAEvent(jQuery(this).closest("form"), "Interaction", sidebarPartner);
        });
    });
*/    
    /* Fix Datepickers not closing on iOS Safari */
 /*     var bIsIOSSafari = (/(iPhone|iPod|iPad)(?:.*)(Mobile)(?!\s)(?:.*)(Safari)/).test(navigator.userAgent);
    if (bIsIOSSafari) {
        jQuery('.topbanner').css({"cursor": "pointer"});
    }
}
*/

function bindNewDatepickers() {
    jQuery.fn.datepicker.defaults.maxViewMode = 2;
    jQuery.fn.datepicker.defaults.orientation = "bottom";
    jQuery.fn.datepicker.defaults.autoclose = false;
    jQuery.fn.datepicker.defaults.disableTouchKeyboard = true;
    jQuery.fn.datepicker.defaults.zIndexOffset = 300;
    //$.fn.datepicker.defaults.format = "M dd"; // cause error on MacOS Safari

    jQuery('.booking-form-group-checkin-checkout').each(function() {
        jQuery(this).datepicker({
            inputs: $(this).find('.booking-datepicker-start, .booking-datepicker-end'),
            startDate: "0d",
            templates: {
                leftArrow: '<i class="fa fa-long-arrow-left"></i>',
                rightArrow: '<i class="fa fa-long-arrow-right"></i>'
            }
        });
    });

    jQuery('body').on('click', '.booking-display-checkin-checkout', function(e) {
        jQuery(this).next().datepicker('show');
    });

    jQuery('.booking-datepicker-start').on('changeDate', function(e){
        var display = $(e.target).parent().find('.display-value-checkin');
        jQuery(display).text(e.format('M dd'));
        jQuery(e.target).next().datepicker('show');
        jQuery(e.target).datepicker('hide');
        sendGAEvent(jQuery(this).closest("form"), "Interaction", sidebarPartner);
        
    });

    jQuery('.booking-datepicker-end').on('changeDate', function(e){
        var display = jQuery(e.target).parent().find('.display-value-checkout');
        jQuery(display).text(e.format('M dd'));
        jQuery(e.target).datepicker('hide');
        sendGAEvent(jQuery(this).closest("form"), "Interaction", sidebarPartner);

    });

    /* Fix Datepickers not closing on iOS Safari */
    var bIsIOSSafari = (/(iPhone|iPod|iPad)(?:.*)(Mobile)(?!\s)(?:.*)(Safari)/).test(navigator.userAgent);
    if (bIsIOSSafari) {
        jQuery('topbanner').css({"cursor": "pointer"});
    }
}

function bindIncrementDropdowns(toggle) {
    if (toggle || typeof toggle === "undefined") {
        jQuery(".booking-form-group-guests-rooms").on("show.bs.dropdown", function(e) {
            // Create guests and rooms data objects
            var guests = {
                input: {
                    element: jQuery(jQuery(e.target).find('[name=booking-input-guests]')),
                    value: function(val) {
                        if (arguments.length) {
                            jQuery(this.element).val(val);
                        }
                        return jQuery(this.element).val();
                    }
                },
                temp: {
                    element: jQuery(jQuery(e.target).find('.value-input-guests')),
                    value: function(val) {
                        if (arguments.length) {
                            jQuery(this.element).data("value", val);
                        }
                        return jQuery(this.element).data("value");
                    },
                    max: 8
                }
            };
            var rooms = {
                input: {
                    element: jQuery(jQuery(e.target).find('[name=booking-input-rooms]')),
                    value: function(val) {
                        if (arguments.length) {
                            jQuery(this.element).val(val);
                        }
                        return jQuery(this.element).val();
                    }
                },
                temp: {
                    element: jQuery(jQuery(e.target).find('.value-input-rooms')),
                    value: function(val) {
                        if (arguments.length) {
                            jQuery(this.element).data("value", val);
                        }
                        return jQuery(this.element).data("value");
                    },
                    max: 4
                }
            };
            // on dropdown open, reset temp values equal to input values
            guests.temp.value(guests.input.value());
            rooms.temp.value(rooms.input.value());
            // set display text and disable increment buttons
            jQuery(guests.temp.element).find(".value-input-increment-btn").prop("disabled", false);
            switch (parseInt(guests.temp.value())) {
                case 1:
                    jQuery(guests.temp.element).find(".value-input-display").text(guests.temp.value() + " Guest");
                    jQuery(guests.temp.element).find(".value-input-subtract").prop("disabled", true);
                    break;
                case guests.temp.max:
                    jQuery(guests.temp.element).find(".value-input-add").prop("disabled", true);
                default:
                    jQuery(guests.temp.element).find(".value-input-display").text(guests.temp.value() + " Guests");
            }
            jQuery(rooms.temp.element).find(".value-input-increment-btn").prop("disabled", false);
            switch (parseInt(rooms.temp.value())) {
                case 1:
                    jQuery(rooms.temp.element).find(".value-input-display").text(rooms.temp.value() + " Room");
                    jQuery(rooms.temp.element).find(".value-input-subtract").prop("disabled", true);
                    break;
                case rooms.temp.max:
                    jQuery(rooms.temp.element).find(".value-input-add").prop("disabled", true);
                default:
                    jQuery(rooms.temp.element).find(".value-input-display").text(rooms.temp.value() + " Rooms");
            }
            // attach data objects to booking-form-group element
            jQuery(this).data("guests", guests);
            jQuery(this).data("rooms", rooms);
        });

        jQuery(".value-input-increment-btn").on("click", function(e) {
            var data = jQuery(this).closest(".booking-form-group-guests-rooms").data();
            var valueInput = jQuery(this).closest(".booking-value-input");
            var increment = 0;
            var display = "";
            // set increment to add or subtract
            if (jQuery(this).hasClass("value-input-subtract")) {
                increment--;
            } else if (jQuery(this).hasClass("value-input-add")) {
                increment++;
            }
            // set which field to increment
            if (jQuery(valueInput).hasClass("value-input-guests")) {
                data = data.guests;
                display = "Guest";
            } else if (jQuery(valueInput).hasClass("value-input-rooms")) {
                data = data.rooms;
                display = "Room";
            }
            // increment value
            data.temp.value(parseInt(data.temp.value())+increment);
            // set display text in dropdown
            if (data.temp.value() > 1) {
                display += "s";
            }
            jQuery(data.temp.element).find(".value-input-display").text(data.temp.value() + " " + display);
            // disable increment buttons for min and max values
            if (data.temp.value() == data.temp.max || data.temp.value() == 1) {
                jQuery(this).prop("disabled", true);
            } else {
                jQuery(this).siblings().addBack().prop("disabled", false);
            }
            // show cancel button
            jQuery(this).closest(".booking-form-group-guests-rooms").find(".value-input-cancel").prop("disabled", false).show();
            sendGAEvent(jQuery(this).closest("form"), "Interaction", sidebarPartner);
        });

        jQuery(".value-input-apply").on("click", function(e) {
            var parent = jQuery(this).closest(".booking-form-group-guests-rooms");
            var data = jQuery(parent).data();
            // set input values to temp values
            data.guests.input.value(data.guests.temp.value());
            data.rooms.input.value(data.rooms.temp.value());
            // set display text in dropdown button to display text in increment dropdown
            jQuery(parent).find(".display-value-guests").text(jQuery(data.guests.temp.element).find(".value-input-display").text());
            jQuery(parent).find(".display-value-rooms").text(jQuery(data.rooms.temp.element).find(".value-input-display").text());
            // disable and hide cancel button, close the dropdown
            jQuery(this).siblings(".value-input-cancel").prop("disabled", true).hide();
            jQuery(parent).find(".dropdown-toggle").dropdown("toggle");
        });

        jQuery(".value-input-cancel").on("click", function(e) {
            jQuery(this).prop("disabled", true).hide();
            jQuery(this).closest(".booking-form-group-guests-rooms").find(".dropdown-toggle").dropdown("toggle");
        });
        // Allow button clicks on dropdown and prevent it from closing
        jQuery('ul.dropdown-menu.booking-display-dropdown').on('click', function(e){
            e.stopPropagation();
        });
    }
}

function validateForm($form) {
    var $fields = $form.find("input[type='text'], select.ct-widget__select > option:selected");
    var numNotValid = 0;

    $fields.each(function() {
        if (jQuery(this).val() == "") {
            if (jQuery(this).is("option")) {
                jQuery(this).parent(".ct-widget__select").addClass("ct-widget__input--invalid");
            } else {
                jQuery(this).addClass("ct-widget__input--invalid");
            }
            ++numNotValid;
        }
    });

    if (numNotValid != 0) {
        return false;
    } else {
        return true;
    }
}

function handleCTSubmit(e) {
    var formId = jQuery(e.target).attr("id");
    //var ctzCommand = setCTZCommand(jQuery("#"+formId), "disable");
    //_ctq.push([ctzCommand]);

    if (!(validateForm(jQuery(e.target)))) {
        return false;
    } else {
        //ctzCommand = setCTZCommand(jQuery("#"+formId), "enable");
        //_ctq.push([ctzCommand]);
        _ctq.push([formId + '.enable']);
        sendGAEvent(jQuery(e.target), "Submit", sidebarPartner);
    }
}

function bindFormHandlers() {
    jQuery("body").on("submit", "form.ct-widget__form", function(e) {
        handleCTSubmit(e);
    });

    // Remove invalid class when user leaves focus from an input or select
    jQuery('.ct-widget__input, .ct-widget__datepicker--start, .ct-widget__datepicker--end, .ct-widget__select').on("blur", function() {
        jQuery(this).removeClass("ct-widget__input--invalid");
    });

    // Remove invalid class when user selects a different option
    jQuery('.ct-widget__select').on("change", function() {
        jQuery(this).removeClass("ct-widget__input--invalid");
    })
}

//////////////////////
// Google Analytics //
//////////////////////
function sendGAEvent($form, label, category) {
    ga('send', 'event', {
        eventCategory: category,
        eventAction: 'Click',
        eventLabel: label
    });
};

function bindAnalytics() {
    // Send Analytics Event on input and select Interaction
    jQuery("body").on("focus", ".ct-widget__input, .ct-widget__select", function(e) {
        sendGAEvent(jQuery(e.target).closest("form"), "Interaction", sidebarPartner);
    });
}


function setClickTripz(){

    initCTHotels();
    initCTScript();
    //initBSDatepickers();
    bindNewDatepickers();
    bindIncrementDropdowns();

    bindFormHandlers();
    bindAnalytics();

}
