import m from "mithril";

import apis from "./apis.json";

var versions = Object.keys(apis);

// Make available so wright can call m.redraw()
window.m = m;

m.route(document.body, "/", {
    "/" : {
        view : () =>
            m("div",
                m("h1", "API Explorer"),
                m("h2", "Versions"),
                m("hr"),
                versions.map((version) =>
                    m("p",
                        m("a", { href : `/${version}`, oncreate : m.route.link },
                            `/${version}`
                        )
                    )
                )
            )
    },

    "/:version" : {
        view : (vnode) => m("div",
            m("h1", `/${vnode.attrs.version}`),
            Object.keys(apis.v2).map((api) =>
                m("p",
                    m("a", { href     : `/${vnode.attrs.version}/${api}`, oncreate : m.route.link },
                        `/${vnode.attrs.version}/${api}`
                    )
                )
            )
        )
    },

    "/:version/:api..." : {
        view : (vnode) => m("div",
            m("h1", `/${vnode.attrs.version}/${vnode.attrs.api}`)
        )
    }
});
