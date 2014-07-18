/*
 * Copyright (c) 2014 airbug inc. http://airbug.com
 *
 * bugcore may be freely distributed under the MIT license.
 */


//-------------------------------------------------------------------------------
// Annotations
//-------------------------------------------------------------------------------

//@Export('BugCsv')

//@Require('Class')
//@Require('Obj')
//@Require('Proxy')
//@Require('bugcsv.CsvBuilder')
//@Require('bugcsv.CsvParser')


//-------------------------------------------------------------------------------
// Context
//-------------------------------------------------------------------------------

require('bugpack').context("*", function(bugpack) {

    //-------------------------------------------------------------------------------
    // BugPack
    //-------------------------------------------------------------------------------

    var Class               = bugpack.require('Class');
    var Obj                 = bugpack.require('Obj');
    var Proxy               = bugpack.require('Proxy');
    var CsvBuilder          = bugpack.require('bugcsv.CsvBuilder');
    var CsvParser           = bugpack.require('bugcsv.CsvParser');


    //-------------------------------------------------------------------------------
    // Declare Class
    //-------------------------------------------------------------------------------

    /**
     * @class
     * @extends {Obj}
     */
    var BugCsv = Class.extend(Obj, {

        _name: "BugCsv",


        //-------------------------------------------------------------------------------
        // Constructor
        //-------------------------------------------------------------------------------

        /**
         * @constructs
         */
        _constructor: function() {

            this._super();


            //-------------------------------------------------------------------------------
            // Public Properties
            //-------------------------------------------------------------------------------

            /**
             * @type {function(new:CsvBuilder)}
             */
            this.CsvBuilder         = CsvBuilder;

            /**
             * @type {function(new:CsvParser)}
             */
            this.CsvParser          = CsvParser;
        },


        //-------------------------------------------------------------------------------
        // Public Methods
        //-------------------------------------------------------------------------------

        /**
         * @param {string} text
         * @return {Array.<Array.<string>>}
         */
        parseSync: function(text) {
            var builder = new CsvBuilder();
            var parser  = new CsvParser(text, builder);
            parser.parse();
            return builder.getCsvArray();
        }
    });


    //-------------------------------------------------------------------------------
    // Private Static Properties
    //-------------------------------------------------------------------------------

    /**
     * @static
     * @private
     * @type {BugCsv}
     */
    BugCsv.instance = null;


    //-------------------------------------------------------------------------------
    // Static Methods
    //-------------------------------------------------------------------------------

    /**
     * @static
     * @return {BugCore}
     */
    BugCsv.getInstance = function() {
        if (BugCsv.instance === null) {
            BugCsv.instance = new BugCsv();
        }
        return BugCsv.instance;
    };


    //-------------------------------------------------------------------------------
    // Static Proxy
    //-------------------------------------------------------------------------------

    Proxy.proxy(BugCsv, Proxy.method(BugCsv.getInstance), [
        "parseSync"
    ]);


    //-------------------------------------------------------------------------------
    // Exports
    //-------------------------------------------------------------------------------

    bugpack.export('BugCsv', BugCsv);
});
