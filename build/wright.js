"use strict";

var wright = require("wright"),
    rollup = require("rollup").rollup,
    previousBundle;

wright({
    main  : "public/index.html",
    debug : true,
    run   : "m.redraw",
    js    : {
        watch   : "src/**/*.js",
        path    : "/js/app.js",
        compile : () =>
            rollup({
                entry   : "src/index.js",
                cache   : previousBundle,
                plugins : [
                    require("rollup-plugin-node-resolve")(),
                    require("rollup-plugin-commonjs")(),
                    require("rollup-plugin-json")(),
                ]
            })
            .then((bundle) => {
                previousBundle = bundle;

                return bundle.generate({ format : "iife" }).code;
            })
    }
});
