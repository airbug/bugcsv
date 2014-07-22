/*
 * Copyright (c) 2014 airbug inc. http://airbug.com
 *
 * bugcsv may be freely distributed under the MIT license.
 */


//-------------------------------------------------------------------------------
// Annotations
//-------------------------------------------------------------------------------

//@Export('bugcsv.BugCsv')

//@Require('Class')
//@Require('Obj')
//@Require('Proxy')
//@Require('bugcsv.CsvArrayBuilder')
//@Require('bugcsv.CsvParser')
//@Require('bugcsv.CsvStringBuilder')
//@Require('bugcsv.CsvStringifier')


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
    var CsvArrayBuilder     = bugpack.require('bugcsv.CsvArrayBuilder');
    var CsvParser           = bugpack.require('bugcsv.CsvParser');
    var CsvStringBuilder    = bugpack.require('bugcsv.CsvStringBuilder');
    var CsvStringifier      = bugpack.require('bugcsv.CsvStringifier');


    //-------------------------------------------------------------------------------
    // Declare Class
    //-------------------------------------------------------------------------------

    /**
     * @class
     * @extends {Obj}
     */
    var BugCsv = Class.extend(Obj, {

        _name: "bugcsv.BugCsv",


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
             * @type {function(new:CsvArrayBuilder)}
             */
            this.CsvArrayBuilder    = CsvArrayBuilder;

            /**
             * @type {function(new:CsvParser)}
             */
            this.CsvParser          = CsvParser;

            /**
             * @type {function(new:CsvStringBuilder)}
             */
            this.CsvStringBuilder   = CsvStringBuilder;

            /**
             * @type {function(new:CsvStringifier)}
             */
            this.CsvStringifier     = CsvStringifier;
        },


        //-------------------------------------------------------------------------------
        // Public Methods
        //-------------------------------------------------------------------------------

        /**
         * @param {string} text
         * @return {Array.<Array.<string>>}
         */
        parseSync: function(text) {
            var builder = new CsvArrayBuilder();
            var parser  = new CsvParser(text, builder);
            parser.parse();
            return builder.getCsvArray();
        },

        /**
         * @param {Array.<Array.<string>>} csvArray
         * @return {string}
         */
        stringifySync: function(csvArray) {
            var builder         = new CsvStringBuilder();
            var stringifier     = new CsvStringifier(csvArray, builder);
            stringifier.stringify();
            return builder.getCsvString();
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
     * @return {BugCsv}
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
        "parseSync",
        "stringifySync"
    ]);


    //-------------------------------------------------------------------------------
    // Exports
    //-------------------------------------------------------------------------------

    bugpack.export('bugcsv.BugCsv', BugCsv);
});
