// define(['c'],function(c) {

define(function () {
    return {
        a: 1
    }
}()), define("a", function () {}), define(function () {
    return {
        c: 10
    }
}()), define("c", function () {}), define("b", ["c"], function (n) {
    return {
        b: 2,
        add: function () {
            return this.b * n.c
        }
    }
}), require(["a", "b"], function (n, e) {
    console.log(n.a + e.add())
}), define("js/require/main", function () {});