(function(root){

	"use strict";

	root.jQuery = root.$ = require("jquery");
	require("jquery-ui");
	require("jquery-validation");
	require("../lib/mobileDetector");
	require("../lib/emulateTouchHover");

	var ToggleInput = require("../lib/ToggleInput"),
		AuthController = require("../controllers/authController");

	$("form").each(function(){
		$(this).validate();
	});

	$(function(){
		new ToggleInput();
		new AuthController();
	});

})(window);