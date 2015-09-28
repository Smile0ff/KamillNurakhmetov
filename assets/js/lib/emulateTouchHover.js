(function($, root){

	"use strict";

	function TouchHover(){
		this.el = $(".touch-hover");
		this.initialize.apply(this, arguments);
	}
	TouchHover.prototype = {
		initialize: initialize,
		_events: _events,
		handleTouchStart: handleTouchStart,
		handleTouchEnd: handleTouchEnd
	}

	function initialize(){
		if(!root.isMobile) return;
		this._events();
	}
	function _events(){
		this.el
			.on("touchstart", this.handleTouchStart)
			.on("touchend", this.handleTouchEnd);
	}
	function handleTouchStart(e){
		$(this).removeClass("touch-hover-end").addClass("touch-hover-start");
	}
	function handleTouchEnd(e){
		$(this).removeClass("touch-hover-start").addClass("touch-hover-end");
	}

	module.exports = new TouchHover;

})(jQuery, window);