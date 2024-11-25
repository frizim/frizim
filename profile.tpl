{{#each all_langs}}
{{ langBadge id }} 
{{/each}}

[{{ logoBadge "LinkedIn" "linkedin" "auto" "for-the-badge"}}](https://www.linkedin.com/in/friedrich-z)
## {{ about_me.title }}
- {{ working_with }} {{ logoBadge "Java" "openjdk" "brown" }} {{ logoBadge "JavaScript" "javascript"}} {{ logoBadge "TypeScript" "typescript"}} {{ logoBadge "PHP" "php" }} {{ logoBadge "SQL" "adminer" }} {{ logoBadge "HTML" "html5" }} {{ logoBadge "CSS" "css3" }}
- {{ using_secondary }} {{ logoBadge "Python" "python" }} {{ logoBadge "Kotlin" "kotlin" }} {{ logoBadge "LaTeX" "latex" }}
- {{ learning }} {{ logoBadge "C++" "cplusplus" }} {{ logoBadge "Rust" "rust" }} {{ logoBadge "Quarkus" "quarkus"}} {{ logoBadge "Nix" "nixos"}}
- {{ tools }} {{ logoBadge "Maven" "apachemaven" }} {{ logoBadge "Gradle" "gradle" }} {{ logoBadge "CMake" "cmake" }} {{ logoBadge "VS Code" "assets/vscode.svg" "#0065A9"}} {{ logoBadge "SonarLint" "sonarlint"}} {{ logoBadge "NixOS" "nixos"}} {{ logoBadge "Docker" "docker"}} {{ logoBadge "Debian" "debian" }}
{{#each about_me.text}}
- {{ this }}
{{/each}}

## {{ projects.title }}
{{ projects.description }}
| {{ projects.header.project }} | {{ projects.header.state }} | Link |
| ----------------------------- | --------------------------- | ---- |
{{#each projects.entries }}
| {{ this.name }} | {{ this.state }} | {{#if this.repo }}![{{ this.repo }}](https://github.com/frizim/{{ this.repo }}){{/if}} |
{{/each}}

## {{ statistics }}
![GitHub Statistics](https://github-readme-stats.vercel.app/api?username=frizim)