# commitlint-plugin-imperative

commitlint plugin to ensure that commits are made using imperative mood using NLP model

# About

This plugin is based off of [ngx-devs/commitlint-plugin-imperative](https://github.com/ngx-devs/commitlint-plugin-imperative), which has been unmaintained for quite a long time and [produces false positives very frequently · (Issue #2)](https://github.com/ngx-devs/commitlint-plugin-imperative/issues/2).

This plugin uses NLP tools instead of relying on simple checks to achieve greater accuracy.

# Installation

```bash
#install
npm install -D @ragav-ks/commitlint-plugin-imperative
```

And then, in your commitlint config:

```ts
{
    plugins: ["@ngx-devs/commitlint-plugin-imperative"],
    rules: {
        "imperative-subject": [2, "always", ]
    }
}
```

# Usage

Commitlint automatically checks for the subject to be in imperative mood.

Sample commit messages that has a valid subject:

```
chore(README): add the description about the extension
feat(extension): implement the core logic for the extension
feat(ci): change the pipeline name to better suit it's purpose
fix(ci): revert "feat(ci): change pipeline name to better suit its purpose"
chore(something): merge the pull request #123 from someuser/somebranch
```

Examples of invalid commit messages:

```bash
$ git commit -m "chore(README): adding description about the extension"

⧗   input: chore(README): adding description about the extension
✖   The subject is not in imperative form. [imperative-subject]

✖   found 1 problems, 0 warnings
```

```bash
$ git commit -m "chore(README): added description about the extension"

⧗   input: chore(README): added description about the extension
✖   The subject is not in imperative form. [imperative-subject]

✖   found 1 problems, 0 warnings
```

# License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
