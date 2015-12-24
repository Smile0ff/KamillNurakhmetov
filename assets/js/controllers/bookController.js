"use strict";

export default class BookController{

    constructor(){
        this.el = $("#book-list");
        this.reviewHolder = $("#review-holder");
        this.reviewBookID = this.reviewHolder.find("#review-book-id");

        this.UIevents();
    }
    UIevents(){
        this.el.on("click", ".review-button", $.proxy(this.toggleReviews, this));
		this.reviewHolder.on("click", ".close-button", $.proxy(this.closeReviews, this));
    }
    toggleReviews(e){
        let target = $(e.target).closest(".review-button"),
            bookID = target.data("book-id");

        this.reviewHolder.find(".book-id-" + bookID).addClass("active").siblings(".review").removeClass("active");
        this.reviewHolder.find("#review-form").removeClass("hide");
        this.reviewHolder.find("#response-holder").empty();
        this.reviewBookID.val(bookID);
        this.reviewHolder.addClass("active");
        $("html, body").addClass("no-scroll");

        return false;
    }
    closeReviews(e){
        let target = $(e.target);

		if(target.closest(".inner-holder").length <= 0 || target.hasClass("close-button")){
			this.reviewHolder.removeClass("active");
			$("html, body").removeClass("no-scroll");
		}
		return false;
    }
}
