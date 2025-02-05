import { logger } from "../logger";
import { type Express } from "express";

// https://stackoverflow.com/a/46397967/14889638
// от себя я только типы добавил
export function printRoutes(app: Express) {
    function print(path: string[], layer: { method: string; handle: { stack: any[] }; name: string; regexp: any; route: { path: string; stack: any[] } }) {
        if (layer.route) {
            layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))));
        } else if (layer.name === "router" && layer.handle.stack) {
            layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))));
        } else if (layer.method) {
            logger.debug("%s %s /%s", "Available method: ", layer.method.toUpperCase(), path.concat(split(layer.regexp)).filter(Boolean).join("/"));
        }
    }

    function split(thing: string | { fast_slash: any }) {
        if (typeof thing === "string") {
            return thing.split("/");
        } else if (thing.fast_slash) {
            return "";
        } else {
            var match = thing
                .toString()
                .replace("\\/?", "")
                .replace("(?=\\/|$)", "$")
                .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//);
            return match && match[1] ? match[1].replace(/\\(.)/g, "$1").split("/") : "<complex:" + thing.toString() + ">";
        }
    }

    app._router.stack.forEach(print.bind(null, []));
}
