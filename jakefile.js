task("default", ["lint"]);
desc("lint everything");
task("lint", [], function(){
    var lint = require("./build/lint/lint.js");
    lint.validateFile("jakefile.js", {}, {});
});
