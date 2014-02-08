
(function( $ ){
  jQuery.fn.parallax = function(xpos, speedFactor) {
    var $this = $(this); 
    var $window = $(window);

    var setNewImageHeight = function (e) {
      var windowHeight = $window.height();
      $this.height(windowHeight);
    }

    var update = function (e) {
      var windowHeight = $window.height();
      var windowTop = $window.scrollTop();
      var windowBottom = windowTop + windowHeight;
      $this.each(function () {
        var $element = $(this);
        var sectionHeight = $element.height();
        var sectionTop = $element.offset().top;
        var sectionBottom = sectionTop + sectionHeight;
        
        var bgY;
        var maxY;
         
        if (typeof(e) == 'undefined' || e.type == 'resize') {
          $element.find('.parallax-bg').height(sectionHeight + (sectionHeight * speedFactor));
          $element.find('.story').css('max-height', sectionHeight);
        }
        
        if (sectionTop < windowBottom && sectionBottom > windowTop) {
          bgY = Math.round(-(windowTop - sectionTop) * speedFactor);
          $element.find('.parallax-bg').css('background-position', '50% ' + bgY + 'px');
        }
      });
    }

    $window.resize(setNewImageHeight);
    $window.on('scroll', update).resize(update);
    setNewImageHeight();
    update();


    var sectionNexts = $('.field-name-field-splash-next').get().reverse();
    var currentHref = false;
    var prevHref;

    $.each(sectionNexts, function (i, item) {
      item = $(item);
      
      prevHref = item.find('a').attr('href');
      if (currentHref) {
        item.find('a').attr('href', currentHref);
      }
      else {
        item.hide();
      }
      currentHref = prevHref;
      
    });
    return this;
  }

})(jQuery);
