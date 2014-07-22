/*
 * Copyright (c) 2014 airbug inc. http://airbug.com
 *
 * bugcsv may be freely distributed under the MIT license.
 */


//-------------------------------------------------------------------------------
// Annotations
//-------------------------------------------------------------------------------

//@Export('bugcsv.CsvStringBuilder')

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
    var CsvStringBuilder = Class.extend(Obj, {

        _name: "CsvStringBuilder",


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
             * @type {string}
             */
            this.csvString      = "";

            /**
             * @private
             * @type {string}
             */
            this.currentItem    = "";

            /**
             * @private
             * @type {string}
             */
            this.currentLine    = "";
        },


        //-------------------------------------------------------------------------------
        // Getters and Setters
        //-------------------------------------------------------------------------------

        /**
         * @returns {string}
         */
        getCsvString: function() {
            return this.csvString;
        },

        /**
         * @return {string}
         */
        getCurrentItem: function() {
            return this.currentItem;
        },

        /**
         * @return {string}
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
            if (this.currentLine !== "") {
                this.currentLine += ",";
            }
            this.currentLine += this.escapeCsvItem(this.currentItem);
            this.currentItem = "";
        },

        /**
         *
         */
        completeLine: function() {
            if (this.csvString !== "") {
                this.csvString += "\n";
            }
            this.csvString += this.currentLine;
            this.currentLine = "";
        },


        //-------------------------------------------------------------------------------
        // Private Methods
        //-------------------------------------------------------------------------------

        /**
         * @private
         * @param {string} csvItem
         * @returns {string}
         */
        escapeCsvItem: function(csvItem) {
            if (csvItem.indexOf("\n") > -1 || csvItem.indexOf(",") > -1) {
                return "\"" + csvItem.replace("\"", "\"\"") + "\"";
            }
            return csvItem;
        }
    });


    //-------------------------------------------------------------------------------
    // Exports
    //-------------------------------------------------------------------------------

    bugpack.export('bugcsv.CsvStringBuilder', CsvStringBuilder);
});
