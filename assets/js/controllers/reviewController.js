(function($, root){

	"use strict";

	var ReviewService = require("../services/reviewService");

	function ReviewController(){
		this.el = $("#review-form");
		this.initialize.apply(this, arguments);
	}
	ReviewController.prototype = {
		reviewService: {},
		responseHolder: [],
		initialize: initialize,
		_events: _events,
		handleReview: handleReview,
		handleSuccess: handleSuccess,
		handleError: handleError
	}

	function initialize(){
		this._events();
		this.el.validate();

		this.responseHolder = $("#response-holder");
		this.reviewService = new ReviewService();
	}
	function _events(){
		this.el.on("submit", $.proxy(this.handleReview, this));

		$(root)
			.on("review-success", $.proxy(this.handleSuccess, this))
			.on("review-error", $.proxy(this.handleError, this));
	}
	function handleReview(e){
		e.preventDefault();

		if(!this.el.valid()) return;
		var path = this.el.attr("action"),
			formData = this.el.serializeArray();

		this.reviewService._send(path, formData);
	}
	function handleSuccess(e, response){
		this.el.addClass("hide");
		this.responseHolder.html("<h3 class='success'>"+ response.message +"</h3>");
		this.el[0].reset();
	}
	function handleError(e, message){
		this.el.addClass("hide");
		this.responseHolder.html("<h3 class='error'>"+ message +"</h3>");
		this.el[0].reset();
	}

	module.exports = ReviewController;

})(jQuery, window);