/*
 * Copyright (c) 2014 airbug inc. http://airbug.com
 *
 * bugcsv may be freely distributed under the MIT license.
 */


//-------------------------------------------------------------------------------
// Annotations
//-------------------------------------------------------------------------------

//@Export('bugcsv.CsvArrayBuilder')

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
    var CsvArrayBuilder = Class.extend(Obj, {

        _name: "bugcsv.CsvArrayBuilder",


        //-------------------------------------------------------------------------------
        // Constructor
        //-------------------------------------------------------------------------------

        /**
         * @constructs
         */
        _constructor: function() {

            this._super();


            //-------------------------------------------------------------------------------
            // Private Properties
            //-------------------------------------------------------------------------------

            /**
             * @private
             * @type {Array.<Array.<string>>}
             */
            this.csvArray       = [];

            /**
             * @private
             * @type {string}
             */
            this.currentItem    = null;

            /**
             * @private
             * @type {Array.<string>}
             */
            this.currentLine    = null;
        },


        //-------------------------------------------------------------------------------
        // Getters and Setters
        //-------------------------------------------------------------------------------

        /**
         * @returns {Array.<Array.<string>>}
         */
        getCsvArray: function() {
            return this.csvArray;
        },

        /**
         * @return {string}
         */
        getCurrentItem: function() {
            return this.currentItem;
        },

        /**
         * @return {Array.<string>}
         */
        getCurrentLine: function() {
            return this.currentLine;
        },


        //-------------------------------------------------------------------------------
        // Public Methods
        //-------------------------------------------------------------------------------

        /**
         * @param {string} data
         */
        addToItem: function(data) {
            this.currentItem += data;
        },

        /**
         *
         */
        completeItem: function() {
            this.currentLine.push(this.currentItem);
            this.currentItem = null;
        },

        /**
         *
         */
        completeLine: function() {
            this.csvArray.push(this.currentLine);
            this.currentLine = null;
        },

        /**
         *
         */
        newItem: function() {
            this.currentItem = "";
        },

        /**
         *
         */
        newLine: function() {
            this.currentLine = [];
        }
    });


    //-------------------------------------------------------------------------------
    // Exports
    //-------------------------------------------------------------------------------

    bugpack.export('bugcsv.CsvArrayBuilder', CsvArrayBuilder);
});
