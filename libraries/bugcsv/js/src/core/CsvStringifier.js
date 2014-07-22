/*
 * Copyright (c) 2014 airbug inc. http://airbug.com
 *
 * bugcsv may be freely distributed under the MIT license.
 */


//-------------------------------------------------------------------------------
// Annotations
//-------------------------------------------------------------------------------

//@Export('bugcsv.CsvStringifier')

//@Require('Class')
//@Require('Obj')


//-------------------------------------------------------------------------------
// Context
//-------------------------------------------------------------------------------

require('bugpack').context("*", function(bugpack) {

    //-------------------------------------------------------------------------------
    // BugPack
    //-------------------------------------------------------------------------------

    var Class   = bugpack.require('Class');
    var Obj     = bugpack.require('Obj');


    //-------------------------------------------------------------------------------
    // Declare Class
    //-------------------------------------------------------------------------------

    /**
     * @class
     * @extends {Obj}
     */
    var CsvStringifier = Class.extend(Obj, {

        _name: "bugcsv.CsvStringifier",


        //-------------------------------------------------------------------------------
        // Constructor
        //-------------------------------------------------------------------------------

        /**
         * @constructs
         * @param {Array.<Array.<string>>} csvArray
         * @param {CsvStringBuilder} csvStringBuilder
         */
        _constructor: function(csvArray, csvStringBuilder) {

            this._super();


            //-------------------------------------------------------------------------------
            // Private Properties
            //-------------------------------------------------------------------------------

            /**
             * @private
             * @type {Array.<Array.<string>>}
             */
            this.csvArray           = csvArray;

            /**
             * @private
             * @type {CsvStringBuilder}
             */
            this.csvStringBuilder   = csvStringBuilder;
        },


        //-------------------------------------------------------------------------------
        // Getters and Setters
        //-------------------------------------------------------------------------------

        /**
         * @return {Array.<Array.<string>>}
         */
        getCsvArray: function() {
            return this.csvArray;
        },

        /**
         * @return {CsvStringBuilder}
         */
        getCsvStringBuilder: function() {
            return this.csvStringBuilder;
        },


        //-------------------------------------------------------------------------------
        // Public Methods
        //-------------------------------------------------------------------------------

        /**
         *
         */
        stringify: function() {
            var _this = this;
            this.csvArray.forEach(function(csvLineArray) {
                csvLineArray.forEach(function(csvItem) {
                    _this.csvStringBuilder.addToItem(csvItem);
                    _this.csvStringBuilder.completeItem();
                });
                _this.csvStringBuilder.completeLine();
            });
        }
    });


    //-------------------------------------------------------------------------------
    // Exports
    //-------------------------------------------------------------------------------

    bugpack.export('bugcsv.CsvStringifier', CsvStringifier);
});
