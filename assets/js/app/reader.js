(function(root){

	"use strict";

	root.jQuery = root.$ = require("jquery");
	require("jquery-ui");
	require("../lib/mobileDetector");
	require("../lib/emulateTouchHover");

	var ReaderController = require("../controllers/readerController");

	$(function(){
		new ReaderController();
	});

})(window);