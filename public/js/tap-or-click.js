(function($){
	$.fn.touched = function(handler) {
		return this
			.unbind('click')
			.bind('click',function(ev) {
				ev.preventDefault();
				handler(ev);
			})
			.unbind('mousedown')
			.bind('mousedown',function(ev) {
				ev.preventDefault();
				jQuery(this).addClass('touched');
			})
			.unbind('mousemove')
			.bind('mousemove',function(ev) {
				ev.preventDefault();
				jQuery(this).removeClass('touched');
			})
			.unbind('mouseup')
			.bind('mouseup',function(ev) {
				ev.preventDefault();
				jQuery(this).removeClass('touched');
			})
			.unbind('touchstart')
			.bind('touchstart',function(ev){
				ev.preventDefault();
				jQuery(this).addClass('touched');
			})
			.unbind('touchmove')
			.bind('touchmove',function(ev){
				ev.preventDefault();
				jQuery(this).removeClass('touched');
			})
			.unbind('touchend')
			.bind('touchend',function(ev){
				ev.preventDefault();
				if ($(this).hasClass('touched')) {
					jQuery(this).removeClass('touched');

					handler(ev);
				}
			});
	};
})(jQuery);


jQuery.event.special.tapOrClick = {
    setup: function (data, namespaces, eventHandle) {
        var elem = this, $elem = jQuery(elem);

        if (window.Touch) {
            $elem.bind('touchstart', jQuery.event.special.tapOrClick.onTouchStart);
            $elem.bind('touchmove', jQuery.event.special.tapOrClick.onTouchMove);
            $elem.bind('touchend', jQuery.event.special.tapOrClick.onTouchEnd);
        } else {
        	$elem.bind('click', jQuery.event.special.tapOrClick.click);
        }

        return $elem;
    },

    click: function (event) {
        event.type = "tapOrClick";
        jQuery.event.handle.apply(this, arguments);
    },

    teardown: function (namespaces) {
        if (window.Touch) {
            $elem.unbind('touchstart', jQuery.event.special.tapOrClick.onTouchStart);
            $elem.unbind('touchmove', jQuery.event.special.tapOrClick.onTouchMove);
            $elem.unbind('touchend', jQuery.event.special.tapOrClick.onTouchEnd);
        } else {
            $elem.unbind('click', jQuery.event.special.tapOrClick.click);
        }
        return $elem;
    },

    onTouchStart: function (e) {
        this.moved = false;
        var elem = this, $elem = jQuery(elem);

        $elem.addClass('touched');
    },

    onTouchMove: function (e) {
        this.moved = true;
    },

    onTouchEnd: function (event) {
        var elem = this, $elem = jQuery(elem);

        $elem.removeClass('touched');
        if (!this.moved) {
            event.type = "tapOrClick";
            jQuery.event.handle.apply(this, arguments)
        }
    }
};