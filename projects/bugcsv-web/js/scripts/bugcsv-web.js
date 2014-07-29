/*
 * Copyright (c) 2014 airbug inc. http://airbug.com
 *
 * bugcsv may be freely distributed under the MIT license.
 */


//-------------------------------------------------------------------------------
// Script
//-------------------------------------------------------------------------------

(function(window) {
    var bugpack     = require("bugpack").context();
    var BugCsv      = bugpack.require("bugcsv.BugCsv");
    window.bugcsv   = window.bugcsv || BugCsv.getInstance();
})(window);
