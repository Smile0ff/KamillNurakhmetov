(function($, root){
	
	"use strict";

	function AuthController(){
		this.el = $("#authorization-holder");
		this.initialize.apply(this, arguments);
	}
	AuthController.prototype = {
		activationButtons: [],
		initialize: initialize,
		_events: _events,
		handleButtons: handleButtons,
		handleClose: handleClose
	}

	function initialize(){
		this.activationButtons = $(".auth-action");
		this._events();
	}
	function _events(){
		this.activationButtons.on("click touchstart", $.proxy(this.handleButtons, this));
		this.el.on("click touchstart", $.proxy(this.handleClose, this));
	}
	function handleButtons(e){
		e.preventDefault();
		var target = $(e.target).closest(".auth-action"),
			authAction = target.data("auth-action");

		if(!this.el.hasClass("active")) this.el.addClass("active");
		this.el.find("." + authAction).addClass("active").siblings(".inner").removeClass("active");
	}
	function handleClose(e){
		var target = $(e.target);

		if(target.closest(".inner").length <= 0 || target.hasClass("close-holder") || target.parent().hasClass("close-holder")){
			this.el.removeClass("active");
		}
	}

	module.exports = AuthController;

})(jQuery, window);