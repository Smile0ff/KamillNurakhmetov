"use strict";

import jquery from "jquery";
import validate from "jquery-validation";
import touchHover from "../lib/emulateTouchHover";
import ToggleInput from "../lib/ToggleInput";
import AuthController from "../controllers/authController";
import BookController from "../controllers/bookController";
import ReviewController from "../controllers/reviewController";

$(function(){

    new BookController();
    new ReviewController();
    new ToggleInput();
    new AuthController();

    $("form").validate();
});
