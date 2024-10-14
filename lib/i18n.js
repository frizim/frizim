"use strict";

export class I18n {
    #i18n;
    #languages;

    constructor(data) {
        this.#i18n = data;
        this.#languages = [];
        for(const language of Object.keys(data)) {
            this.#languages.push({id: language, name: data[language].name});
        }
    }

    lang(language_code) {
        return this.#i18n[language_code];
    }

    get available_languages() {
        return this.#languages;
    }
}