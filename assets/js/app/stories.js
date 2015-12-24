"use strict";

import jquery from "jquery";
import validate from "jquery-validation";
import touchHover from "../lib/emulateTouchHover";
import ToggleInput from "../lib/ToggleInput";
import AuthController from "../controllers/authController";
import StoriesController from "../controllers/StoriesController";
import ReviewController from "../controllers/reviewController";
import SeoText from "../lib/seoText";

$(function(){

    new StoriesController();
    new ReviewController();
    new ToggleInput();
    new AuthController();
    new SeoText();

    $("form").validate();
});
