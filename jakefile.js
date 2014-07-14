/*global desc, task, jake, fail, complete */
(function() {
    "use strict";
    var Mocha = require("mocha");

    task("default", ["lint"]);

    desc("Lint everything");
    task("lint", [], function() {
        var lint = require("./build/lint/lint.js");

        var files = new jake.FileList();
        files.include("**/*.js");
        files.exclude("node_modules");
        var options = nodeLintOptions();
        lint.validateFileList(files.toArray(), options, {});
    });

    desc("Run tests");
    task("test", [], function() {
        var mocha = new Mocha({ui: "bdd"});
        testFiles().forEach(mocha.addFile.bind(mocha));

        var failures = false;
        mocha.run()
            .on("fail", function() {
                failures = true;
            }).on("end", function() {
                if (failures) fail("Tests failed");
                complete();
            });
    }, {async: true});

    function testFiles() {
        var files = new jake.FileList();
        files.include("src/**/_*_test.js");
        return files.toArray();
    }


    function nodeLintOptions() {
        return {
            bitwise:true,
            curly:false,
            eqeqeq:true,
            forin:true,
            immed:true,
            latedef:true,
            newcap:true,
            noarg:true,
            noempty:true,
            nonew:true,
            regexp:true,
            undef:true,
            strict:true,
            trailing:true,
            node:true
        };
    }
}());