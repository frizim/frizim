"use strict";

import {makeBadge} from "badge-maker";
import fs from "node:fs/promises";
import * as icons from 'simple-icons';

function svgToBase64(svgString) {
    return "data:image/svg+xml;base64," + btoa(svgString);
}

function iconObjectBySlug(slug) {
    return icons["si" + slug.charAt(0).toUpperCase() + slug.substring(1)];
}

async function getPng(fileName) {
    const png = (await fs.readFile(fileName)).toString("base64");

    if(!png) {
        return undefined;
    }

    return "data:image/png;base64," + png;
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

function createLogoBadge(name, logo, color = "auto", type = "flat", darkMode = false) {
    console.log("Building logo badge " + logo);
    let path = "./assets/badge-" + (name.length == 0 ? logo.split("/")[0] : name).toLowerCase().replace(" ", "") + (darkMode ? "-dark" : "") + ".svg";

    let taskFetchLogo;
    let actualColor;
    if(logo.endsWith(".svg")) {
        taskFetchLogo = getSvg("./" + logo);
        actualColor = color == "auto" ? "silver" : color;
    }
    else if(logo.endsWith(".png")) {
        taskFetchLogo = getPng("./" + logo);
        actualColor = color == "auto" ? "silver" : color;
    }
    else {
        taskFetchLogo = downloadSvg("https://cdn.simpleicons.org/" + logo + (darkMode ? "/black" : "/white"));
        actualColor = color == "auto" ? iconObjectBySlug(logo).hex : color;
    }

    taskFetchLogo.then(async (svg) => {
        await fs.writeFile(path, makeBadge({
            color: actualColor,
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