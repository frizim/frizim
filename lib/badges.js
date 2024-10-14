"use strict";

import {makeBadge} from "badge-maker";
import fs from "node:fs/promises";

function svgToBase64(svgString) {
    return "data:image/svg+xml;base64," + btoa(svgString);
}

async function getSvg(fileName) {
    const svg = (await fs.readFile(fileName)).toString();
    if(svg) {
        return svgToBase64(svg);
    }

    return undefined;
}

async function downloadSvg(url) {
    const svg = (await (await fetch(url)).text()).toString();
    if(svg) {
        return svgToBase64(svg);
    }

    console.log("Download failed: " + url)

    return undefined;
}

function createLogoBadge(name, logo, color, type = "flat") {
    let path = "./assets/badge-skill-" + (name.length == 0 ? logo.split("/")[0] : name).toLowerCase().replace(" ", "") + ".svg";
    (logo.endsWith(".svg") ? getSvg("./" + logo) : downloadSvg("https://cdn.simpleicons.org/" + logo)).then(async svg => {
        await fs.writeFile(path, makeBadge({
            color: color,
            message: name,
            logoBase64: svg,
            style: type
        }));
    });
    return path;
}

function createLanguageBadge(language_name, language_code) {
    let path = "./assets/badge-" + language_code + ".svg";
    getSvg("./assets/" + language_code + ".svg").then(async svg => {
        await fs.writeFile(path, makeBadge({
            message: language_name,
            color: "blue",
            style: "flat-square",
            logoBase64: svg
        }));    
    });
    return path;
}

export { createLogoBadge, createLanguageBadge };