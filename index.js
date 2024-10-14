"use strict";

import { ReadmeGenerator } from "./lib/generator.js";
import fs from "node:fs/promises";

let gen = new ReadmeGenerator(await fs.readFile("./profile.tpl"), JSON.parse(await fs.readFile("./i18n.json")));
gen.createAll();