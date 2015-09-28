(function($, root){

	"use strict";

	function ToggleInput(){
		this.el = $(".toggle-input");
		this.initialize.apply(this, arguments);
	}
	ToggleInput.prototype = {
		initialize: initialize,
		_events: _events,
		handleInput: handleInput
	}
	function initialize(){
		this._events();
	}
	function _events(){
		this.el.on("blur", $.proxy(this.handleInput, this));
	}
	function handleInput(e){
		var target = $(e.target);
		target.val().length > 0 ? target.addClass("filled") : target.removeClass("filled");
	}

	module.exports = ToggleInput;

})(jQuery, window);