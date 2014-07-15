/*global desc, task, jake, fail, complete */
(function() {
    "use strict";

    desc("Build and test");
    task("default", ["lint", "test"]);

    desc("Lint everything");
    task("lint", [], function() {
        var lint = require("./build/lint/lint.js");

        var files = new jake.FileList();
        files.include("**/*.js");
        files.exclude("node_modules");
        var options = nodeLintOptions();
        var passed = lint.validateFileList(files.toArray(), options, {});
        if (!passed) fail("Lint failed");
    });

    desc("Test everything");
    task("test", [], function() {
        var reporter = require("nodeunit").reporters["default"];
        reporter.run(['src/server/_server_test.js'], null, function(failures) {
            if (failures) fail("Tests failed");
            complete();
        });
    }, {async: true});

    desc("Integrate");
    task("integrate", ["default"], function() {
        console.log("1. Make sure 'git status' is clean.");
        console.log("2. Build on the integration box.");
        console.log("   a. Walk over to integration box.");
        console.log("   b. 'git pull'");
        console.log("   c. 'jake'");
        console.log("   d. If jake fails, stop! Try again after fixing the issue.");
        console.log("3. 'git checkout integration'");
        console.log("4. 'git merge master --no-ff --log'");
        console.log("5. 'git checkout master'");
    });

    task("node", [], function() {
        var NODE_VERSION = "v0.10.29";

        sh("node --version", function(stdout) {

            if(stdout.trim() === NODE_VERSION) {
                console.log(stdout);
            } else {
                fail("Incorrect node version. Expected " + NODE_VERSION);
            }
            complete();
        });
    }, {async: true});

    function sh(command, callback) {
        console.log("> " + command);

        var stdout = "";
        var process = jake.createExec(command, {printStdout:true, printStderr: true});
        process.on("stdout", function(chunk) {
            stdout += chunk;
        });
        process.on("cmdEnd", function() {
            console.log();
            callback(stdout);
        });
        process.run();
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