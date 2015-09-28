(function(root){

	"use strict";

	root.jQuery = root.$ = require("jquery");
	require("jquery-ui");
	require("jquery-validation");
	require("../lib/mobileDetector");
	require("../lib/emulateTouchHover");

	var ToggleInput = require("../lib/ToggleInput"),
		AuthController = require("../controllers/authController"),
		BookController = require("../controllers/bookController"),
		ReviewController = require("../controllers/reviewController");

	$("form").each(function(){
		$(this).validate();
	});

	$(function(){
		new BookController();
		new ReviewController();
		new ToggleInput();
		new AuthController();
	});

})(window);