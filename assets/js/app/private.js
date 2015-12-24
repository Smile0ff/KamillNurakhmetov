"use strict";

import jquery from "jquery";
import validate from "jquery-validation";
import EmulateTouch from "../lib/EmulateTouchHover";
import ToggleInput from "../lib/ToggleInput";
import AuthController from "../controllers/AuthController";

$(function(){
    new ToggleInput();
    new AuthController();

    $("form").validate();
});
