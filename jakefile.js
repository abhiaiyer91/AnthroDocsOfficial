task("default", [], function(){
    console.log("default");
});

desc("Example Description");
task("example", ["dependency"], function(){
    console.log("Example Task");
});

task("dependency", function(){
    console.log("dependency");
});