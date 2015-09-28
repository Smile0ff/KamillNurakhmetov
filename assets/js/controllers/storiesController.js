(function($, root){

	"use strict";

	function StoriesController(){
		this.el = $("#stories-list");
		this.initialize.apply(this, arguments);
	}
	StoriesController.prototype = {
		reviewHolder: [],
		inputStorieId: [],
		initialize: initialize,
		_events: _events,
		openReviews: openReviews,
		closeReviews: closeReviews
	}

	function initialize(){
		this.reviewHolder = $("#review-holder");
		this.inputStorieId = $("#review-storie-id");
		this._events();
	}
	function _events(){
		this.el.on("click", ".review-button", $.proxy(this.openReviews, this));
		this.reviewHolder.on("click", ".close-button", $.proxy(this.closeReviews, this));
	}
	function openReviews(e){
		if(this.reviewHolder.hasClass("active")) return;
		e.preventDefault();

		var storieID = $(e.currentTarget).data("storie-id");
		this.reviewHolder
			.addClass("active")
			.find(".storie-id-" + storieID)
			.addClass("active")
			.siblings()
			.removeClass("active");

		this.reviewHolder.find("#review-form").removeClass("hide");
		this.reviewHolder.find("#response-holder").empty();
		this.inputStorieId.val(storieID);
	}
	function closeReviews(e){
		e.preventDefault();
		this.reviewHolder.removeClass("active");
	}

	module.exports = StoriesController;

})(jQuery, window);