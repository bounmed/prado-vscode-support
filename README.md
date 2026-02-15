# Prado Template for Visual Studio Code

[![GitHub Stars](https://img.shields.io/github/stars/bounmed/prado-vscode-support?logo=github)](https://github.com/bounmed/prado-vscode-support)
[![GitHub closed issues](https://img.shields.io/github/issues-closed/bounmed/prado-vscode-support)](https://github.com/bounmed/prado-vscode-support/issues)

This extension provides [Prado Template](https://www.pradoframework.net/) support for Visual Studio Code.
Supports `{...}` and `{{...}}` delimiters. Available for both VSCode [desktop](https://code.visualstudio.com/Download) and [web](https://vscode.dev/).

## Features

* Syntax highlighting
* Snippet completion
* Code formatting
* Code folding
* Code navigation
* Comment toggling
* Bracket autoclosing
* Bracket autosurrounding
* Hover documentation
* Auto Indentation

## What it looks like

![Settings](images/preview.gif)

## Requirements

* VS Code `1.84.0` or higher

## Extension Settings

![Settings](images/settings-preview.png)

* **`prado.highlight`**: Enable/disable highlight decoration of prado tags documents.
* **`prado.highlightColor`**: Highlight decoration color based on dark/light theme kind.

**For example:**

```jsonc
"prado.highlight": true,
"prado.highlightColor": {
  "dark": "#FFFFFF25",
  "light": "#FFFA0040"
}
```

## Formatting Settings

Here is the list of native vscode settings used in prado document formatting.

```jsonc
{
  // The number of spaces a tab is equal to.
  "editor.tabSize": 4,

  // Indent using spaces.
  "editor.insertSpaces": true,

  // End with a newline.
  "html.format.endWithNewline": false,

  // Indent `<head>` and `<body>` sections.
  "html.format.indentInnerHtml": false,

  // Maximum number of line breaks to be preserved in one chunk. Use `null` for unlimited.
  "html.format.maxPreserveNewLines": null,

  // Controls whether existing line breaks before elements should be preserved.
  "html.format.preserveNewLines": true,

  // Wrap attributes.
  //  - auto: Wrap attributes only when line length is exceeded.
  //  - force: Wrap each attribute except first.
  //  - force-aligned: Wrap each attribute except first and keep aligned.
  //  - force-expand-multiline: Wrap each attribute.
  //  - aligned-multiple: Wrap when line length is exceeded, align attributes vertically.
  //  - preserve: Preserve wrapping of attributes.
  //  - preserve-aligned: Preserve wrapping of attributes but align.
  "html.format.wrapAttributes": "auto",

  // Maximum amount of characters per line (0 = disable).
  "html.format.wrapLineLength": 120
}
```

## User Settings

**For Emmet Abbreviations:**

Paste the following into your `settings.json`

```jsonc
"emmet.includeLanguages": {
  "prado": "html"
}
```

**For Netbeans Style Theme:**

![Netbeans Theme](images/netbeans-theme-preview.png)

Paste the following into your `settings.json`

<details>
  <summary>Click to expand settings!</summary>

  ```jsonc
  "editor.tokenColorCustomizations": {
    "textMateRules": [
      {
        "scope": [
          "punctuation.section.embedded.begin.prado",
          "punctuation.section.embedded.end.prado"
        ],
        "settings": {
          "foreground": "#FFA500",
          "fontStyle": "bold"
        }
      },
      {
        "scope": [
          "keyword.control.prado",
          "support.function.built-in.prado"
        ],
        "settings": {
          "foreground": "#16A016",
          "fontStyle": "bold"
        }
      },
      {
        "scope": ["variable.parameter.prado"],
        "settings": {
          "foreground": "#AE23A3",
          "fontStyle": "bold"
        }
      },
      {
        "scope": ["source.prado"],
        "settings": {
          "foreground": "#D17C32"
        }
      }
    ]
  }
  ```

</details>

## Issues

Submit the [issues](https://github.com/bounmed/prado-vscode-support/issues) if you find any bug or have any suggestion.

## Release Notes

Detailed release notes are available [here](CHANGELOG.md).
