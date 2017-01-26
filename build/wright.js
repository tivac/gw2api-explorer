"use strict";

var wright = require("wright"),
    rollup = require("rollup").rollup;

wright({
    main  : "public/index.html",
    debug : true,
    run   : "m.redraw",
    js    : {
        watch   : "src/**/*.js",
        compile : () =>
            rollup({
                entry   : "src/index.js",
                plugins : [
                    require("rollup-plugin-node-resolve")(),
                    require("rollup-plugin-commonjs")(),
                    require("rollup-plugin-json")(),
                    // require("modular-css/rollup")({
                        
                    // })
                ]
            })
            .then((bundle) => bundle.generate({ format: 'iife' }).code)
    }
});
