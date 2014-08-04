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
//@Require('Exception')
//@Require('Obj')


//-------------------------------------------------------------------------------
// Context
//-------------------------------------------------------------------------------

require('bugpack').context("*", function(bugpack) {

    //-------------------------------------------------------------------------------
    // BugPack
    //-------------------------------------------------------------------------------

    var Class       = bugpack.require('Class');
    var Exception   = bugpack.require('Exception');
    var Obj         = bugpack.require('Obj');


    //-------------------------------------------------------------------------------
    // Declare Class
    //-------------------------------------------------------------------------------

    /**
     * @class
     * @extends {Obj}
     */
    var CsvParser = Class.extend(Obj, {

        _name: "bugcsv.CsvParser",


        //-------------------------------------------------------------------------------
        // Constructor
        //-------------------------------------------------------------------------------

        /**
         * @constructs
         * @param {string} text
         * @param {CsvArrayBuilder} csvArrayBuilder
         */
        _constructor: function(text, csvArrayBuilder) {

            this._super();


            //-------------------------------------------------------------------------------
            // Private Properties
            //-------------------------------------------------------------------------------

            /**
             * @private
             * @type {CsvArrayBuilder}
             */
            this.csvArrayBuilder    = csvArrayBuilder;

            /**
             * @private
             * @type {number}
             */
            this.endIndex           = text.length - 1;

            /**
             * @private
             * @type {number}
             */
            this.index              = -1;

            /**
             * @private
             * @type {string}
             */
            this.text               = text;
        },


        //-------------------------------------------------------------------------------
        // Getters and Setters
        //-------------------------------------------------------------------------------

        /**
         * @return {CsvArrayBuilder}
         */
        getCsvArrayBuilder: function() {
            return this.csvArrayBuilder;
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
            this.csvArrayBuilder.newLine();
            this.csvArrayBuilder.newItem();
            while (this.hasNextChar()) {
                this.parseItem();
            }
            this.completeItemAndLine();
        },


        //-------------------------------------------------------------------------------
        // Private Methods
        //-------------------------------------------------------------------------------

        /**
         * @private
         */
        completeItem: function() {
            this.csvArrayBuilder.completeItem();
            if (this.hasNextChar()) {
                this.csvArrayBuilder.newItem();
            }
        },

        /**
         * @private
         */
        completeItemAndLine: function() {
            this.csvArrayBuilder.completeItem();
            this.csvArrayBuilder.completeLine();
            if (this.hasNextChar()) {
                this.csvArrayBuilder.newItem();
                this.csvArrayBuilder.newLine();
            }
        },

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
        parseAfterCarriageReturn: function() {
            this.completeItemAndLine();
            var nextChar = this.nextChar();
            if (nextChar === "\"") {
                this.parseQuotedItem();
            } else if (nextChar === "\n") {
                // Do nothing ... \r\n is considered a single line ending
            } else if (nextChar === "\r") {
                this.completeItemAndLine();
                this.parseAfterCarriageReturn();
            }else if (nextChar === ",") {
                this.completeItem();
            } else {
                this.csvArrayBuilder.addToItem(nextChar);
                this.parseNonQuotedItem();
            }
        },

        /**
         * @private
         */
        parseAfterPossibleClosingQuote: function() {
            var nextChar = this.nextChar();
            //escaped quote
            if (nextChar === "\"") {
                this.csvArrayBuilder.addToItem(nextChar);
                this.parseQuotedItem();
            } else if (nextChar === "\n") {
                this.completeItemAndLine();
            } else if (nextChar === "\r") {
                this.parseAfterCarriageReturn();
            } else if (nextChar === ",") {
                this.completeItem();
            } else {
                this.throwBadCsvFormat();
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
                this.completeItemAndLine();
            } else if (nextChar === "\r") {
                this.parseAfterCarriageReturn();
            }else if (nextChar === ",") {
                this.completeItem();
            } else {
                this.csvArrayBuilder.addToItem(nextChar);
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
                    this.completeItemAndLine();
                    break;
                } else if (nextChar === "\r") {
                    this.parseAfterCarriageReturn();
                }else if (nextChar === ",") {
                    this.completeItem();
                    break;
                } else if (nextChar === "\"") {
                    this.throwBadCsvFormat();
                } else {
                    this.csvArrayBuilder.addToItem(nextChar);
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
                    this.parseAfterPossibleClosingQuote();
                    break;
                } else {
                    this.csvArrayBuilder.addToItem(nextChar);
                }
            }
        },

        /**
         * @private
         */
        throwBadCsvFormat: function() {
            var toIndex = this.index;
            var fromIndex = 0;
            if (toIndex >= 100) {
                fromIndex = toIndex - 100;
            }
            throw new Exception("BadCsvFormat", {}, "Incorrectly formatted CSV file at '" + this.text.substring(fromIndex, toIndex + 1) + "'");
        }
    });


    //-------------------------------------------------------------------------------
    // Exports
    //-------------------------------------------------------------------------------

    bugpack.export('bugcsv.CsvParser', CsvParser);
});
