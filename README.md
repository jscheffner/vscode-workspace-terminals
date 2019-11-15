# Workspace Terminals

Opens terminals for each workspace folder and names them so you don't lose track.

[Multi-root workspaces](https://code.visualstudio.com/docs/editor/multi-root-workspaces) are great tools to work on related projects at the same time. However, it is easy to lose track of the opened terminals since the terminal name doesn't mention the project they belong to. **Workspace Terminals** comes to your rescue: As soon as you enter a multi-root workspace it'll open terminals for each of them and names them so you can easily find the one you need.

## 

Per default, **Workspace Terminals** will open a terminal per workspace folder if you are in a multi-root workspace. It'll check for changes every time you start VS Code, add a folder to the workspace or open a workspace.

If you don't want to automatically open terminals, set the `workspace-terminals.auto` setting to `never`. You can use the command `> Open Workspace Terminals` to trigger the behavior manually.

If you want to automatically open a terminal even for single-root workspaces, set the `workspace-terminals.auto` setting to `always`.

To automatically switch to the workspace terminal of the file you are editing, set the `workspace-terminals.switchTerminals` setting to either `always` or `from workspace terminals`. `from workspace terminals` prevents switching the terminal if the current terminal wasn't created by **Workspace Terminals**
