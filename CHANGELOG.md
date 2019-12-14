# Changelog

## 0.3

- `workspace-terminals.switchTerminal` setting allows focusing terminal depending on active text editor
- `multi-root` option of `workspace-terminals.auto` setting is now called `multiRoot`
- after opening terminals terminal that belongs to active text editor is focused
- fix creating terminals when adding workspace folders

## 0.2

- Per default, terminals only open automatically in multi-root workspaces.

**BREAKING CHANGE:**
`workspace-terminals.auto` setting changes from boolean to an enum with the options `always`, `multi-root` (default) and `never`.

## 0.1

Initial Release
