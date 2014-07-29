/*
 * Copyright (c) 2014 airbug inc. http://airbug.com
 *
 * bugcsv may be freely distributed under the MIT license.
 */


//-------------------------------------------------------------------------------
// Annotations
//-------------------------------------------------------------------------------

//@TestFile

//@Require('ArrayUtil')
//@Require('Class')
//@Require('Obj')
//@Require('TypeUtil')
//@Require('bugcsv.BugCsv')
//@Require('bugmeta.BugMeta')
//@Require('bugunit.TestTag')


//-------------------------------------------------------------------------------
// Context
//-------------------------------------------------------------------------------

require('bugpack').context("*", function(bugpack) {

    //-------------------------------------------------------------------------------
    // BugPack
    //-------------------------------------------------------------------------------

    var ArrayUtil   = bugpack.require('ArrayUtil');
    var Class       = bugpack.require('Class');
    var Obj         = bugpack.require('Obj');
    var TypeUtil    = bugpack.require('TypeUtil');
    var BugCsv      = bugpack.require('bugcsv.BugCsv');
    var BugMeta     = bugpack.require('bugmeta.BugMeta');
    var TestTag     = bugpack.require('bugunit.TestTag');


    //-------------------------------------------------------------------------------
    // Simplify References
    //-------------------------------------------------------------------------------

    var bugmeta     = BugMeta.context();
    var test        = TestTag.test;


    //-------------------------------------------------------------------------------
    // Declare Tests
    //-------------------------------------------------------------------------------

    var bugCsvGetInstanceTest = {

        // Setup Test
        //-------------------------------------------------------------------------------

        setup: function() {
            this.testBugCsv     = BugCsv.getInstance();
            this.testBugCsv2    = BugCsv.getInstance();
        },


        // Run Test
        //-------------------------------------------------------------------------------

        test: function(test) {
            test.assertTrue(Class.doesExtend(this.testBugCsv, BugCsv),
                "Assert BugCsv.getInstance method returns an instance of BugCsv");
            test.assertTrue(Obj.equals(this.testBugCsv, this.testBugCsv2),
                "Assert that BugCsv.getInstance returns the same instance each time it's called");
        }
    };

    var bugCsvParseSyncBasicTest = {

        // Setup Test
        //-------------------------------------------------------------------------------

        setup: function() {
            this.testBugCsv     = BugCsv.getInstance();
            this.testCsvData    = "A,\"B\n\",C\nD,\"E\"\"\",F";
        },


        // Run Test
        //-------------------------------------------------------------------------------

        test: function(test) {
            var csvArray = this.testBugCsv.parseSync(this.testCsvData);
            test.assertTrue(TypeUtil.isArray(csvArray),
                "Assert BugCsv.parseSync returned an Array");
            if (TypeUtil.isArray(csvArray)) {
                test.assertEqual(csvArray.length, 2,
                    "Assert csvArray has two lines");
                if (csvArray.length === 2) {
                    var csvLine0 = csvArray[0];
                    var csvLine1 = csvArray[1];
                    test.assertTrue(TypeUtil.isArray(csvLine0),
                        "Assert csvLine0 is an Array");
                    if (TypeUtil.isArray(csvLine0)) {
                        var expected0 = ["A", "B\n", "C"];
                        test.assertTrue(ArrayUtil.isEqual(csvLine0, ["A", "B\n", "C"]),
                            "Assert csv line 0 is correctly parsed - csvLine0:" + csvLine0 + " expected:" + expected0);
                    }
                    if (TypeUtil.isArray(csvLine1)) {
                        var expected1 = ["D", "E\"", "F"];
                        test.assertTrue(ArrayUtil.isEqual(csvLine1, expected1),
                            "Assert csv line 1 is correctly parsed - csvLine:" + csvLine1 + " expected:" + expected1);
                    }
                }
            }
        }
    };

    var bugCsvParseSyncEmptyTest = {

        // Setup Test
        //-------------------------------------------------------------------------------

        setup: function() {
            this.testBugCsv     = BugCsv.getInstance();
            this.testCsvData    = "";
        },


        // Run Test
        //-------------------------------------------------------------------------------

        test: function(test) {
            var csvArray = this.testBugCsv.parseSync(this.testCsvData);
            test.assertTrue(TypeUtil.isArray(csvArray),
                "Assert BugCsv.parseSync returned an Array");
            if (TypeUtil.isArray(csvArray)) {
                test.assertEqual(csvArray.length, 1,
                    "Assert csvArray has one line");
                if (csvArray.length === 1) {
                    var csvLine0 = csvArray[0];
                    test.assertTrue(TypeUtil.isArray(csvLine0),
                        "Assert csvLine0 is an Array");
                    if (TypeUtil.isArray(csvLine0)) {
                        var expected0 = [""];
                        test.assertTrue(ArrayUtil.isEqual(csvLine0, expected0),
                                "Assert csv line 0 is correctly parsed - csvLine0:" + csvLine0 + " expected:" + expected0);
                    }
                }
            }
        }
    };


    //-------------------------------------------------------------------------------
    // BugMeta
    //-------------------------------------------------------------------------------

    bugmeta.tag(bugCsvGetInstanceTest).with(
        test().name("BugCsv - #getInstance test")
    );
    bugmeta.tag(bugCsvParseSyncBasicTest).with(
        test().name("BugCsv - #parseSync basic test")
    );
    bugmeta.tag(bugCsvParseSyncEmptyTest).with(
        test().name("BugCsv - #parseSync empty test")
    );
});
