import m from "mithril";

import apis from "./apis.json";

var bulk = {
        view : (vnode) => m("div",
            m("p", "Request Parameters"),
            m("h3", m("pre", "ids")),
            m("p", "The ", m("pre", "ids"), " parameter is either a single numeric ID or a comma-separated list of numeric IDs"),
            vnode.attrs.api.all && m("p", "It also accepts the special ", m("pre", "all"), " parameter to return all available entries"),
            m("h3", m("pre", "page")),
            m("p", "The page number requested. Pages begin at 0"),
            m("h3", m("pre", "page_size")),
            m("p", "Adjust the number of results per page. Max of 50")
        )
    },

    responses = {
        view : (vnode) => m("div",
            Object.keys(vnode.attrs.api.data).map((name) => [
                m("h3", name),
                m("p", vnode.attrs.api.data[name])
            ])
        )
    };

export default {
    oninit : (vnode) => {
        var api = apis[vnode.attrs.version][vnode.attrs.api];

        vnode.state.example  = `https://api.guildwars2.com${api.url}?ids=aloha,box`;
        vnode.state.response = "Loading...";
        
        m.request(vnode.state.example).then((data) =>
            (vnode.state.response = JSON.stringify(data, null, 4))
        );
    },

    view : (vnode) => {
        var api = apis[vnode.attrs.version][vnode.attrs.api];

        return m("div",
            m("h1", api.name),
            m("code",
                `${api.http} ${api.url}`
            ),
            m("p", api.info),
            m(bulk, { api : api }),
            m(responses, { api : api }),
            m("h2", "Example Response"),
            m("code", vnode.state.example),
            m("pre", vnode.state.response)
        );
    }
};
