// Generated by CoffeeScript 1.3.1
(function() {

  (function($, window, undefined_) {
    var Naaav;
    Naaav = function($el, options) {
      this.$el = $el;
      this.config = $.extend({}, $.fn.naaav.defaults, options || {});
      return this._init();
    };
    Naaav.prototype = {
      _init: function() {
        var hasEasingFunc, self;
        self = this;
        this._setElems();
        hasEasingFunc = $.isFunction($.easing[this.config.easing]);
        if (!hasEasingFunc) {
          this.config.easing = "swing";
        }
        this.animateMethod;
        switch (this.config.animation) {
          case "fade":
            this.animateMethod = {
              show: "fadeIn",
              hide: "fadeOut"
            };
            break;
          case "slide":
            this.animateMethod = {
              show: "slideDown",
              hide: "slideUp"
            };
            break;
          default:
            this.animateMethod = {
              show: "fadeIn",
              hide: "fadeOut"
            };
        }
        return this.$items.bind({
          mouseenter: function(e) {
            var $item, $subnav, fn;
            $item = $(this);
            $subnav = self._getSubNav($item);
            fn = ($.isFunction(self.config.showFunc) ? self.config.showFunc : self._show);
            return fn.apply(self, [$item, $subnav]);
          },
          mouseleave: function(e) {
            var $item, $subnav, fn;
            $item = $(this);
            $subnav = self._getSubNav($item);
            fn = ($.isFunction(self.config.hideFunc) ? self.config.hideFunc : self._hide);
            return fn.apply(self, [$item, $subnav]);
          }
        });
      },
      _animate: function($subnav, type) {
        return $subnav.stop(false, true)[this.animateMethod[type]](this.config[type], this.config.easing, function() {
          return $(this)[type]();
        });
      },
      _show: function($item, $subnav) {
        var self;
        self = this;
        this.hideAll($item);
        $item.children("a").addClass(this.config.activeClass);
        window.clearTimeout($item.data("timeoutId"));
        return $item.data("timeoutId", window.setTimeout(function() {
          return self._animate($subnav, "show");
        }, this.config.delayIn));
      },
      _hide: function($item, $subnav) {
        var self;
        self = this;
        $item.children("a").removeClass(this.config.activeClass);
        window.clearTimeout($item.data("timeoutId"));
        return $item.data("timeoutId", window.setTimeout(function() {
          return self._animate($subnav, "hide");
        }, this.config.delayOut));
      },
      _getSubNav: function($link) {
        return $link.children("ul").first();
      },
      _setElems: function() {
        this.$items = this.$el.children("li");
        this.$links = this.$items.children("a");
        return this.$subnavs = this.$items.children("ul");
      },
      hideAll: function($item) {
        this.$links.removeClass(this.config.activeClass);
        return this.$subnavs.stop(false, true).hide();
      }
    };
    $.fn.naaav = function(options) {
      var args, inst;
      if (!this.length) {
        return this;
      }
      args = (arguments[1] ? Array.prototype.slice.call(arguments, 1) : null);
      inst = void 0;
      this.each(function() {
        var $elem;
        $elem = $(this);
        if (!$elem.find("ul").length) {
          return;
        }
        if (typeof options === "string") {
          inst = $elem.data("naaav");
          if (inst[options]) {
            return inst[options].apply(inst, args);
          } else {
            return $.error("Method " + options + " does not exist on jQuery.naaav");
          }
        } else {
          if ($elem.data("naaav")) {
            return this;
          }
          inst = new Naaav($elem, options);
          return $elem.data("naaav", inst);
        }
      });
      return this;
    };
    return $.fn.naaav.defaults = {
      activeClass: "active",
      animation: "fade",
      easing: "swing",
      show: 100,
      hide: 100,
      delayIn: 100,
      delayOut: 200,
      showFunc: null,
      hideFunc: null
    };
  })(jQuery, window);

}).call(this);
