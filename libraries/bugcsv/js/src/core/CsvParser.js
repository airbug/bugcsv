/*
 * Copyright (c) 2014 airbug inc. http://airbug.com
 *
 * bugcsv may be freely distributed under the MIT license.
 */


//-------------------------------------------------------------------------------
// Annotations
//-------------------------------------------------------------------------------

//@Export('bugcsv.CsvParser')

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
    var CsvParser = Class.extend(Obj, {

        _name: "CsvParser",


        //-------------------------------------------------------------------------------
        // Constructor
        //-------------------------------------------------------------------------------

        /**
         * @constructs
         * @param {string} text
         * @param {CsvBuilder} csvBuilder
         */
        _constructor: function(text, csvBuilder) {

            this._super();


            //-------------------------------------------------------------------------------
            // Private Properties
            //-------------------------------------------------------------------------------

            /**
             * @private
             * @type {CsvBuilder}
             */
            this.csvBuilder     = csvBuilder;

            /**
             * @private
             * @type {number}
             */
            this.endIndex       = text.length - 1;

            /**
             * @private
             * @type {number}
             */
            this.index          = -1;

            /**
             * @private
             * @type {string}
             */
            this.text           = text;
        },


        //-------------------------------------------------------------------------------
        // Getters and Setters
        //-------------------------------------------------------------------------------

        /**
         * @return {CsvBuilder}
         */
        getCsvBuilder: function() {
            return this.csvBuilder;
        },

        /**
         * @return {number}
         */
        getEndIndex: function() {
            return this.endIndex;
        },

        /**
         * @return {number}
         */
        getIndex: function() {
            return this.index;
        },


        //-------------------------------------------------------------------------------
        // Public Methods
        //-------------------------------------------------------------------------------

        /**
         *
         */
        parse: function() {
            this.csvBuilder.newLine();
            this.csvBuilder.newItem();
            while (this.hasNextChar()) {
                this.parseItem();
            }
        },


        //-------------------------------------------------------------------------------
        // Private Methods
        //-------------------------------------------------------------------------------

        /**
         * @private
         * @return {boolean}
         */
        hasNextChar: function() {
            return this.index < this.endIndex;
        },

        /**
         * @private
         * @returns {string}
         */
        nextChar: function() {
            this.index++;
            return this.text[this.index];
        },

        /**
         * @private
         */
        parseAfterQuote: function() {
            var nextChar = this.nextChar();
            //escaped quote
            if (nextChar === "\"") {
                this.csvBuilder.addToItem(nextChar);
                this.parseQuotedItem();
            } else if (nextChar === "\n") {
                this.csvBuilder.completeItem();
                this.csvBuilder.completeLine();
                if (this.hasNextChar()) {
                    this.csvBuilder.newItem();
                    this.csvBuilder.newLine();
                }
            } else if (nextChar === ",") {
                this.csvBuilder.completeItem();
                if (this.hasNextChar()) {
                    this.csvBuilder.newItem();
                }
            }
        },

        /**
         * @private
         */
        parseItem: function() {
            var nextChar = this.nextChar();
            if (nextChar === "\"") {
                this.parseQuotedItem();
            } else if (nextChar === "\n") {
                this.csvBuilder.completeItem();
                this.csvBuilder.completeLine();
                if (this.hasNextChar()) {
                    this.csvBuilder.newItem();
                    this.csvBuilder.newLine();
                }
            } else if (nextChar === ",") {
                this.csvBuilder.completeItem();
                if (this.hasNextChar()) {
                    this.csvBuilder.newItem();
                }
            } else {
                this.csvBuilder.addToItem(nextChar);
                this.parseNonQuotedItem();
            }
        },

        /**
         * @private
         */
        parseNonQuotedItem: function() {
            while (this.hasNextChar()) {
                var nextChar = this.nextChar();
                if (nextChar === "\n") {
                    this.csvBuilder.completeItem();
                    this.csvBuilder.completeLine();
                    if (this.hasNextChar()) {
                        this.csvBuilder.newItem();
                        this.csvBuilder.newLine();
                    }
                    break;
                } else if (nextChar === ",") {
                    this.csvBuilder.completeItem();
                    if (this.hasNextChar()) {
                        this.csvBuilder.newItem();
                    }
                    break;
                } else if (nextChar === "\"") {
                    var toIndex = this.index;
                    var fromIndex = 0;
                    if (toIndex >= 100) {
                        fromIndex = toIndex - 100;
                    }
                    throw new bugcore.Exception("BadCsvFormat", {}, "Incorrectly formatted CSV file at '" + this.text.substring(fromIndex, toIndex + 1) + "'");
                } else {
                    this.csvBuilder.addToItem(nextChar);
                }
            }
        },

        /**
         * @private
         */
        parseQuotedItem: function() {
            while (this.hasNextChar()) {
                var nextChar = this.nextChar();
                if (nextChar === "\"") {
                    this.parseAfterQuote();
                    break;
                } else {
                    this.csvBuilder.addToItem(nextChar);
                }
            }
        }
    });


    //-------------------------------------------------------------------------------
    // Exports
    //-------------------------------------------------------------------------------

    bugpack.export('bugcsv.CsvParser', CsvParser);
});
