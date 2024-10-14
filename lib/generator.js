"use strict";

import Handlebars from "handlebars";
import { createLanguageBadge, createLogoBadge } from "./badges.js";
import { I18n } from "./i18n.js";
import fs from "node:fs/promises";

export class ReadmeGenerator {

    #i18n;
    #template;

    constructor(template, i18n) {
        Handlebars.registerHelper("logoBadge", (name, logo, color, style) => {
            return "![" + name + "](" + createLogoBadge(name, logo, typeof(color) == "string" ? color : "silver", style == null ? "flat" : style) + ")";
        });
        
        Handlebars.registerHelper("langBadge", (language_code) => {
            return "[![" + language_code + "](./assets/badge-" + language_code + ".svg)](" + ReadmeGenerator.getReadmeName(language_code) + ")";
        });

        this.#i18n = new I18n(i18n);
        this.#template = template.toString();
    }

    static getReadmeName(languageId) {
        return "README" + (languageId == "en" ? "" : "-" + languageId) + ".md";
    }    

    async createReadme(language) {
        const out = Handlebars.compile(this.#template)({
            ...this.#i18n.lang(language.id),
            all_langs: this.#i18n.available_languages.filter(val => val != language)
        });
    
        fs.writeFile(ReadmeGenerator.getReadmeName(language.id), out);
        createLanguageBadge(language.name, language.id);
    }

    createAll() {
        for(const lang of this.#i18n.available_languages) {
            this.createReadme(lang);
        }
    }

}