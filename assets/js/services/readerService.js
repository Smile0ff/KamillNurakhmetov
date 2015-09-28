(function($, root){

	"use strict";

	function ReaderService(options){
		this._path = options.path || "";
		this._data = options.data || {};
		this.initialize.apply(this, arguments);
	}
	ReaderService.prototype = {
		initialize: initialize,
		getContents: getContents
	}

	function initialize(){

	}
	function getContents(contentsID){
		if(!contentsID) return;
		return $.get(this._path, {id: contentsID});
	}

	module.exports = ReaderService;

})(jQuery, window);