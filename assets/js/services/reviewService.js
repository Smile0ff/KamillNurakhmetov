(function($, root){

	"use strict";

	function ReviewService(){
		this.initialize.apply(this, arguments);
	}
	ReviewService.prototype = {
		initialize: initialize,
		_send: _send
	}

	function initialize(){
		
	}
	function _send(path, data){

		$.ajax({
			url: path,
			type: "POST",
			data: data
		})
		.done(function(response){
			response = JSON.parse(response);
			$(root).trigger("review-success", [response]);
		})
		.fail(function(error){
			$(root).trigger("review-error", [error.responseText]);
		});
	}

	module.exports = ReviewService;

})(jQuery, window);