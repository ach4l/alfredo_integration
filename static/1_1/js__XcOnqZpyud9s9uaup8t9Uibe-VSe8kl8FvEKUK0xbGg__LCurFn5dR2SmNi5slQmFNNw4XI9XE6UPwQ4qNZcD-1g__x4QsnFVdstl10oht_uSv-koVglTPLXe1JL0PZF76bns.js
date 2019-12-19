(function ($) {

Drupal.behaviors.quote = {
  attach: function(context, settings) {
    var level = Drupal.settings.quote_nest - 1;
    if (level >= 0) {
      var top = $('blockquote.quote-nest-1', context);
      $('blockquote.quote-msg:eq(' + level + ')', top)
      .hide()
      .after('<div class="quote-snip">' + Drupal.t('<a href="#">[snip]</a>') + '</div>')
      .next('.quote-snip')
      .children('a')
      .click(function(e) {
        $(this).parent().siblings('.quote-msg').toggle();
        e.preventDefault();
      });
    }
  }
};

}(jQuery));

;/*})'"*/
;/*})'"*/
(function($){

  Drupal.behaviors.pt_copyright = {
    /**
     * Most blog entries have inline images inserted directly into the body markup.
     * We want to ensure that the images all have Origin/Copyright information
     * displayed underneath the image.
     *
     * Most blog posts created in the Drupal 7 era have this automatically; the
     * Insert module templates already include the 'origin' text. But older blog
     * posts probably do not show Origin text with their inline images. Since it
     * is inline markup, it's too difficult to try to fix the markup server-side.
     *
     * This attach behavior finds all inline images, determines if it needs
     * source/copyright text, and programmatically inserts the text markup below
     * the image if so. The text associated with each image is supplied in
     * Drupal.settings, which comes from the pt_blog_node_view() hook.
     *
     * @see pt_blog_node_view()
     * @see https://teamten7.atlassian.net/browse/PT-233
     */
    attach: function (context, settings) {
      // Find all .insertArea elements.
      $('.insertArea', context).each(function(index){
        // Skip this .insertArea if it already has origin text.
        var hasOriginText = $(this).find('.insertArea--origin').text().trim();
        if (hasOriginText.length > 0) {
          return true;
        }
        // Find the proper origin text in Drupal.settings for this particular image.
        var fileSrc = $(this).find('img').attr('src');

        // If a broken image has been removed we need to escape otherwise a source
        // will be added to an empty image and the indexOf on fileSrc below will fail.
        if (typeof fileSrc == 'undefined') {
          return;
        }

        var originText = '';
        $.each(Drupal.settings.pt_copyright, function (index, value){
          // The 'index' corresponds to the stored image file name. However, the
          // actual img src attribute may have appended a '_0' before the file
          // extension, which would break the string match. To work around this,
          // we search the fileSrc attribute for only the part of the filename
          // without the extension, since that string will match regardless of
          // a '_0' appendix.
          // Because that new file string may be extremely generic, like 'image',
          // we also search for a leading slash in front of it.
          var imagename = '/' + index.substring(0, index.indexOf('.'));
            if (fileSrc.indexOf(imagename) > -1 && value !== '') {
              originText = value;
              return false;
            }
        });
        // Prepare and insert the origin text markup into the image's containing
        // DIV.
        var $imgContainer = $(this).find('.insert-inner');
        $imgContainer.append('<div class="subtext insertArea--origin">Source: ' + originText + '</div>');
      });
    }
  }

})(jQuery);

;/*})'"*/
;/*})'"*/
(function($){

  Drupal.behaviors.pt_ads = {
    attach: function (context, settings) {

      /**
       *
       * Script for making Blog Entry ads scroll with page
       * We'll set ad to fixed position fixed when it hits the top of page and has scrolled less the available height of its scrolling 'runway'
       *
       */
      // Function for getting page scroll position
      function getScrollTop() {
        if (typeof window.pageYOffset !== 'undefined' ) {
          // Most browsers
          return window.pageYOffset;
        }

        var d = document.documentElement;
        if (d.clientHeight) {
          // IE in standards mode
          return d.scrollTop;
        }

        // IE in quirks mode
        return document.body.scrollTop;
      }

      // Do this after window load bc loading ads is slow and won't return a height until fully loaded
      $(window).load(function() {
        // How much space to leave between the ad and the top of the screen.
        page_top =  79;

        // Call all the necessary ad functions in order
        // we do this for blog entries and articles
        //adscroll_600_setup();
        /**
         * Place ads in Blog Entries
         */
        if ( $('body').hasClass('node-type-blog-entry') ) {
          inline_ads_setup('.field-name-body');

          // Place incontent ads based on window width ( aka precense of sidebar)
          if (window.innerWidth > 991) {
            // place_inline_desktop_ads('.field-name-body');
            place_inline_desktop_ads_slots('.field-name-body');
          } else {
            // place_inline_tablet_ads('.field-name-body');
            place_inline_desktop_ads_slots('.field-name-body');
          }

          // Place clinical pathways if present and at lg, 2-column width
          if (window.innerWidth < 1200) {
            if ($('.node').hasClass('node-blog-entry--has-clinical-pathway')) {
              place_pathways_slots();
            }
          }

          // Place essential reads in-body
          if (window.innerWidth < 992) {
            if ($('.node').hasClass('node-blog-entry--has-clinical-pathway')) {
              place_essential_reads_slots();
            }
          }

        }

        /**
         * Place ads in Articles
         */
        if ( $('body').hasClass('node-type-article')  ) {
          inline_ads_setup('.field-name-body');

          // Place incontent ads based on window width ( aka precense of sidebar)
          if (window.innerWidth > 800) {
            place_inline_desktop_ads('.field-name-body');
          } else {
            place_inline_tablet_ads('.field-name-body');
          }
        }

      //  set_ad_runway_600(ads_inserted);


        // This code runs as the user scrolls
        window.onscroll = function() {
          // Update scroll position tracker
          var scroll_pos = getScrollTop();

          // Make sure the right ads are loaded on the page before executing the js
          if ($('.block-pt-ads-300x-right-www').length) {

            // Pass the right node type selector
            if ( $('body').hasClass('node-type-blog-entry') || $('body').hasClass('node-type-article') || $('body').hasClass('page-news')  ) {
              adscroll_250(scroll_pos);
            }
          }

          //if ($('#block-pt-ads-300x600-right2-www-site').length) {
          //  adscroll_600(scroll_pos);
          //}
        }
        // End Ad Scrolling code

      }); // end $(window).load()

      /*
        * Insert an inline ad in blog entry bodies
       * - Insert after the end of the 600px tall sidebar ad
       * - Insert every three paragraphs following that
       * - Don't insert if there are fewer than 2 paragraphs remaining
       */

      function inline_ads_setup(selector) {
        // Get the ad units set in pt_ads.module
        units = Drupal.settings.pt_ads;

        // Initiate a variable with the bottom position of second sidebar ad, add height including 'Advertisement' label
        sidebar_tall_ad_position = $('#block-pt-ads-300x600-right2-www-site .block__content').offset().top + 630;

        // Initiate tracking variable starting at the the top position of the blog entry
        p_end = $(selector).offset().top;

        // Initiate tracking variable for number of remaining paragraphs
        p_count = $(selector +  ' > *').not('div.insertArea > .image-article-inline-half').length;

        // GLOBAL: Initiate a variable to track the number of ads we've inserted
        ads_inserted = 0;

        // Initiate a variable to sum paragraph heights after we start inserting ads;
        ad_spacing = 0;

        // The number of pixels spacing between first and second incontent ads
        incontent_ad_spacing = 750;

        // Tablet/mobile doesn't have sidebar so place incontent ads after this number of paragraphs
        tablet_first_placement = 4;

        // Get all the insertion slots and find the first with top position > sidebar_tall_ad_position
        allSlots = $('.markup-replacement-slot');
        validSlots = [];

        allSlots.each(function() {
          if (window.innerWidth > 991) {
            if ($(this).offset().top > sidebar_tall_ad_position) {
              validSlots.push({
                'slotIndex': $(this).data('slot-position'),
                'content': null
              });
            }
          }
          else {
            validSlots.push({
              'slotIndex': $(this).data('slot-position'),
              'content': null
            });
          }
        });

        // Get the ad slot positions from Drupal Settings values set in site admin
        ad_slot_positions = [
          Drupal.settings.pt_ad_slot_positions.ad_1_position,
          Drupal.settings.pt_ad_slot_positions.ad_2_position,
          Drupal.settings.pt_ad_slot_positions.ad_3_position,
          Drupal.settings.pt_ad_slot_positions.ad_4_position
        ];
        pathways_slot_positions = [
          Drupal.settings.pt_ad_content_positions.content_1,
          Drupal.settings.pt_ad_content_positions.content_2
          ];

        // Send the valid slots object to Drupal settings in case we need it somewhere else
        Drupal.settings.validBlogSlots = validSlots;
      }


      function place_inline_desktop_ads_slots() {

        var in_content_ad_unit = null;

        for (i=0; i < ad_slot_positions.length; i++) {
          if (ads_inserted < 4 && units.length > 0) {
            var currentSlotPosition = validSlots[ad_slot_positions[i]];

            var $slotSelector = (typeof currentSlotPosition !== 'undefined') ? $('.markup-replacement-slot-' + currentSlotPosition.slotIndex) : null;
            if ($slotSelector && currentSlotPosition.slotIndex !== 'last') {
              in_content_ad_unit = units.shift();
              $slotSelector.replaceWith(in_content_ad_unit.markup);
              validSlots[ad_slot_positions[i]].content = 'ad';
              ads_inserted++;
            }
          }
        }
      }

      function place_pathways_slots() {
        var clinicalPathwaysMenu = $('.node-blog-entry--has-clinical-pathway .reference_card');

        if (ads_inserted >= 3) {
          var $slotSelector = (typeof validSlots[pathways_slot_positions[0]] !== 'undefined') ? $('.markup-replacement-slot-' + validSlots[pathways_slot_positions[0]].slotIndex) : null;
          if ($slotSelector) {
            $slotSelector.replaceWith(clinicalPathwaysMenu);
            validSlots[pathways_slot_positions[0]].content = 'content';
          }
        } else if (ads_inserted === 2) {
          $slotSelector = $('.markup-replacement-slot-last');
          if ($slotSelector) {
            $slotSelector.replaceWith(clinicalPathwaysMenu);
            validSlots[validSlots.length - 1].content = 'content';
          }
        }
      }

      function place_essential_reads_slots() {
        if (ads_inserted === 4) {
          var $essentialReadsBlock = $('#block-pt-blog-clinical-paths-essentials-rr');
          var $slotSelector = (typeof validSlots[pathways_slot_positions[1]] !== 'undefined') ? $('.markup-replacement-slot-' + validSlots[pathways_slot_positions[1]].slotIndex) : null;
          if ($slotSelector && $essentialReadsBlock) {
            $slotSelector.replaceWith($essentialReadsBlock);
            validSlots[pathways_slot_positions[1]].content = 'content';
          }
        }
      }

      function place_inline_desktop_ads(selector) {
        var in_content_ad_unit = null;

        $(selector + ' > *').not('div.insertArea > .image-article-inline-half').each(function () {

          // Decriment the paragraph counter
          // Break out of this each loop if there are fewer than 2 paragraphs left
          p_count--;
          if (p_count <= 2) {
            return false;
          }

          // Track bottom position of each p (with margin)
          p_end += $(this).outerHeight(true);

          // If the bottom of this p is after the 600px sidebar ad, insert inline ad into body
          if (p_end > sidebar_tall_ad_position) {

            // Insert second ad if first has already been added
            if (ads_inserted >= 1 && ads_inserted < 4) {

              // Track p heights after first ad insert; second ad goes in after 750px
              ad_spacing += $(this).outerHeight(true);

              if (p_count > 2 && ad_spacing > incontent_ad_spacing) {
                in_content_ad_unit = units.shift();
                if (in_content_ad_unit) {
                  $(this).after(in_content_ad_unit.markup);
                  ads_inserted++;
                }

                // break out after three incontent ads have been placed
                if (ads_inserted > 3) {return false;}

                // Restart ad spacing distance tracker after each add placed
                ad_spacing = 0;
              }
            }

            // Insert first ad
            if (ads_inserted == 0 && p_count > 2) {
              in_content_ad_unit = units.shift();
              $(this).after(in_content_ad_unit.markup);
              ads_inserted++;
            }

          }
        });
      }


      function place_inline_tablet_ads(selector) {
        var tablet_p_count = 0;

        $(selector + ' > *').not('div.insertArea > .image-article-inline-half').each(function () {

          // Decriment the paragraph counter
          // Break out of this each loop if there are fewer than 2 paragraphs left
          p_count--;
          if (p_count <= 2) {
            return false;
          }

          // Track bottom position of each p (with margin)
          p_end += $(this).outerHeight(true);

          tablet_p_count++;

          // Skip the set number of items before placing incontent ads
          if (tablet_p_count >= tablet_first_placement ) {

            // Insert second ad if first has already been added
            if (ads_inserted >= 1 && ads_inserted <= 3) {

              // Track p heights after first ad insert; second ad goes in after 750px
              ad_spacing += $(this).outerHeight(true);

              if (p_count > 2 && ad_spacing > incontent_ad_spacing) {
                $(this).after(units.shift().markup);

                ads_inserted++;

                // break out after three incontent ads have been placed
                if (ads_inserted > 3) {return false;}

                // Restart ad spacing distance tracker after each add placed
                ad_spacing = 0;
              }
            }

            // Insert first ad
            if (ads_inserted == 0 && p_count > 2) {
              ads_inserted++;
              $(this).after(units.shift().markup);
            }

          }
        });
      }




      // Setup ad scrolling function for 250x300 sidebar ads
      function adscroll_250(scroll_pos) {
        // Setup variables we'll need to ad scrolling for Blog Entry ad units
        var ad_container = $('.sidebar_first .block-pt-ads-300x-right-www');
        var ad_container_top = 0;
        if (ad_container.length) {
          ad_container_top = ad_container.offset().top;
        }
        var ad = ad_container.find('.block__content');

        // Code for scrolling FIRST ad unit on Blog Entry page
        // Only activate ad scrolling on sidebar ads that are 300x250
        // with 'Advertisement' label, ad height is 270 (250px + 20px)
        if (ad.innerHeight() <= 270) {
          // Set ad container height so ad has a 'runway' to scroll with (10px margin)
          ad_container.css('height', '620px');

          if ((scroll_pos + page_top) >= ad_container_top && (scroll_pos + page_top) <= (ad_container_top + 350)) {
            ad.css({
              'position': 'fixed',
              'top': page_top,
              'width': '300px'
            });
          }
          else if ((scroll_pos + page_top) >= (ad_container_top + 351)) {
            ad.css({
              'position': 'relative',
              'top': '351px',
            });
          }
          else {
            ad.css({
              'position': 'relative',
              'top': '',
              'width': ''
            });
          }
        };
      } // end adscroll_250

      // Setup ad scrolling function for 600x300 sidebar ads
      function adscroll_600(scroll_pos) {
        // Code for scrolling SECOND ad unit on Blog Entry page
        // Height of ad unit with 'Advertisement' label == 620px
        if ( second_ad_runway_height > 620 ) { // only initiate if calculated runway is bigger than the ad itself
          if ((scroll_pos + page_top) >= second_ad_container_top && (scroll_pos + page_top) <= (second_ad_container_top + second_ad_runway_height - 620 )) {
            second_ad.css({
              'position': 'fixed',
              'top': page_top,
              'width': '300px'
            });
          }
          else if ((scroll_pos + page_top) >= (second_ad_container_top + second_ad_runway_height - 620)) {
            second_ad.css({
              'position': 'relative',
              'top': (second_ad_runway_height - 620) + 'px',
            });
          }
          else {
            second_ad.css({
              'position': 'relative',
              'top': '',
              'width': ''
            });
          }
        }
      } // end adscroll_600

      function adscroll_600_setup() {
        // Calculate top of second ad unit to social media icons on blog entries
        social_bottom = 0;
        if ($('.pt-social-media-bottom').length) {
          social_bottom = $('.pt-social-media-bottom').offset().top - 5; //
        }

        second_ad_container = $('#block-pt-ads-300x600-right2-www-site');
        second_ad_container_top = second_ad_container.offset().top;
        second_ad = second_ad_container.find('.block__content');
      } // end adscroll_600_setup


      function set_ad_runway_600(num_ads) {
        second_ad_runway_height = (social_bottom - second_ad_container_top);

        if (num_ads > 0) {
          var inline_ad_height = $('.field-name-body .pt-ads-300').once().outerHeight(true);
          second_ad_runway_height += (num_ads * inline_ad_height);
        }
        second_ad_container.css('height', second_ad_runway_height);
      }
    }
  }
})(jQuery);

;/*})'"*/
;/*})'"*/
